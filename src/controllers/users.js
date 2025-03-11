import createHttpError from 'http-errors';
import { updateUser } from '../services/users.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

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

  let photoUrl;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateUser(userId, {
    ...req.body,
    avatarUrl: photoUrl,
    upsert: true,
  });

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};
