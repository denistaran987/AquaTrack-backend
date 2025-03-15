import {
  refreshUserSession,
  countUsers,
  loginUser,
  logoutUser,
  registerUser,
  requestResetToken,
  resetPassword,
} from '../services/auth.js';
import { setupSession } from '../utils/setupSession.js';
import { generateAuthUrl } from '../utils/googleOAuth2.js';
import { loginOrSignupWithGoogle } from '../services/auth.js';

/**
 * Registration user
 * @param {*} req
 * @param {*} res
 */
export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

/**
 * Login user
 * @param {*} req
 * @param {*} res
 */
export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(session, res);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

/**
 * Refresh user session token
 * @param {*} req
 * @param {*} res
 */
export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUserSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(session, res);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

/**
 * Logout user
 * @param {*} req
 * @param {*} res
 */
export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

/**
 * Total number of users
 * @param {*} req
 * @param {*} res
 */
export const countUsersController = async (req, res) => {
  const totalUsers = await countUsers();
  res.json({
    status: 200,
    message: 'Total number of registered users retrieved successfully!',
    data: { totalUsers },
  });
};

/**
 * Reset password by email
 * @param {*} req
 * @param {*} res
 */
export const resetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

/**
 * Reset password
 * @param {*} req
 * @param {*} res
 */
export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};

/**
 * Get Google OAuth URL
 * @param {*} req
 * @param {*} res
 */
export const getGoogleOAuthUrlController = async (req, res) => {
  const url = generateAuthUrl();
  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    },
  });
};

/**
 * Login with Google
 * @param {*} req
 * @param {*} res
 */
export const loginWithGoogleController = async (req, res) => {
  const session = await loginOrSignupWithGoogle(req.body.code);
  setupSession(session, res);

  res.json({
    status: 200,
    message: 'Successfully logged in via Google OAuth!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
