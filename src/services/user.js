import { UsersCollection } from '../db/models/user.js';

export const updateUser = async (userId, payload) => {
  return await UsersCollection.updateOne({ _id: userId }, payload);
};
