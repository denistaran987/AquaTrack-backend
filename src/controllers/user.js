import createHttpError from 'http-errors';
import { updateUser } from '../services/user';

/**
 * Get current user data
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const getCurrentUserController = async (req, res, next) => {
  if (!req.user._id) {
    throw createHttpError(404, 'User not found!');
  }

  res.status(200).json({
    status: 200,
    message: `Current user with id ${req.user._id}!`,
    data: req.user,
  });
};

/**
 * Update current user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const patchUserController = async (req, res, next) => {
  const userId = req.user._id;
  const photo = req.file;
  let result = false;

  if (!photo) {
    result = await updateUser(userId, { ...req.body });
  } else {
    result = await updateUser(userId, { ...req.body, avatarUrl: photo });
  }

  if (!result) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a user!',
    data: result,
  });
};
