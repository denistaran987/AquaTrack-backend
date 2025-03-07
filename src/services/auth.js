import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';
import { FIFTEEN_MINUTES, ONE_MONTH } from '../constants/times/constants.js';
import { SessionsCollection } from '../db/models/session.js';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_MONTH),
  };
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });
  // Checking session existence
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired = new Date() > new Date(session.refreshTokenValidUntil);
  // Checking token expired
  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

  const newSession = createSession();

  return await SessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });
};
