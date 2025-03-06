import { Water } from '../db/models/water.js';
import createError from 'http-errors';

export const addWater = async (owner, amount, date) => {
  if (amount < 50 || amount > 5000) {
    throw createError(400, 'Please, enter amount from 50 to 5000 ml');
  }

  const formattedDate = new Date(date);

  const newWater = await Water.create({
    amount,
    date: formattedDate,
    owner,
  });
  return newWater;
};

export const updateWater = async (owner, id, amount, date) => {
  if (amount < 50 || amount > 5000) {
    throw createError(400, 'Please, enter amount from 50 to 5000 ml');
  }

  const updatedWater = await Water.findOneAndUpdate(
    { _id: id, owner },
    { amount, date: new Date(date) },
    { new: true },
  );

  if (!updatedWater) {
    throw createError(404, 'No record water found');
  }

  return updatedWater;
};

export const deleteWater = async (userId, id) => {
  const deletedWater = await Water.findOneAndDelete({
    _id: id,
    userId,
  });

  if (!deletedWater) {
    throw createError(404, 'No record water found');
  }

  return;
};
