import createHttpError from "http-errors";
import { SessionsCollection } from "../db/models/session.js";
import bcrypt from 'bcrypt';
import { UsersCollection } from "../db/models/user.js";
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, ONE_MONTH } from "../constants/times/constants.js";
import jwt from 'jsonwebtoken';
import { getEnvVar } from "../utils/getEnvVar.js";
import path from "node:path";
import fs from 'node:fs/promises';
import { SMTP } from "../constants/SMTP/constants.js";
import { TEMPLATES_DIR } from "../constants/path/constants.js";
import handlebars from 'handlebars';
import { sendResetEmail } from "../utils/sendResetEmail.js";



export const registerUser = async (payload) => {
    const user = await UsersCollection.findOne({ email: payload.email });
    if (user) throw createHttpError(409, 'Email in use');

    const encryptedPassword = await bcrypt.hash(payload.password, 10);


    return await UsersCollection.create({
        ...payload,
        password: encryptedPassword,
    });
};

export const loginUser = async (payload) => {
    const user = await UsersCollection.findOne({ email: payload.email });
    if (!user) {
        throw createHttpError(404, ' User not found');

    };
    const isEqual = await bcrypt.compare(payload.password, user.password);
    if (!isEqual) {
        throw createHttpError(401, 'Unauthorized');

    };
    await SessionsCollection.deleteOne({ userId: user._id });

    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');

    return SessionsCollection.create({
        userId: user._id,
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now() + ONE_MONTH),
    });

};

export const countUsers = async () => {
    return await UsersCollection.countDocuments();
};



export const logoutUser = (sessionId) => SessionsCollection.deleteOne({ _id: sessionId });


export const requestResetToken = async (email) => {
    const user = await UsersCollection.findOne({ email });
    if (!user) {
        throw createHttpError(404, 'User not found');
    }
    const resetToken = jwt.sign(
        {
            sub: user._id,
            email,
        },
        getEnvVar('JWT_SECRET'),
        {
            expiresIn: '5m',
        },
    );

    const resetPasswordTemplatePath = path.join(
        TEMPLATES_DIR,
        'reset-password-email.html',
    );

    const templatesSource = (
        await fs.readFile(resetPasswordTemplatePath)
    ).toString();

    const template = handlebars.compile(templatesSource);
    const html = template({
        name: user.name,
        link: `${getEnvVar('APP_DOMAIN')}/reset-password?token=${resetToken}`,
    });

    await sendResetEmail({
        from: getEnvVar(SMTP.SMTP_FROM),
        to: email,
        subject: 'Reset your password',
        html,
    });
};


export const resetPassword = async (payload) => {
    let entries;

    try {
        entries = jwt.verify(payload.token, getEnvVar('JWT_SECRET'));
    } catch (err) {
        if (err instanceof Error) throw createHttpError(401, err.message);
        throw err;
    }

    const user = await UsersCollection.findOne({
        email: entries.email,
        _id: entries.sub,
    });

    if (!user) {
        throw createHttpError(404, 'User not found');
    };

    const encryptedPassword = await bcrypt.hash(payload.password, 10);

    await UsersCollection.updateOne(
        { _id: user._id },
        { password: encryptedPassword },

    );

};
