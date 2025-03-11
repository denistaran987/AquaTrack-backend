import { UsersCollection } from '../db/models/users.js';

export const updateUser = async (userId, payload, options = {}) => {
  return await UsersCollection.findOneAndUpdate({ _id: userId }, payload, {
    ...options,
    new: true,
  });
};
