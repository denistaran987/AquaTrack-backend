import { Water } from '../db/models/water.js';
import createError from 'http-errors';

export const addWater = async (userId, amount, date) => {
  if (amount < 50 || amount > 5000) {
    throw createError(400, 'The amount of water should be from 50 to 5000 ml');
  }

  const formattedDate = new Date(date);

  const newWater = await Water.create({
    amount,
    date: formattedDate,
    userId,
  });
  return newWater;
};

export const updateWater = async (userId, id, amount, date) => {
  if (amount < 50 || amount > 5000) {
    throw createError(400, 'The amount of water should be from 50 to 5000 ml');
  }

  const updatedWater = await Water.findOneAndUpdate(
    { _id: id, userId },
    { amount, date: new Date(date) },
    { new: true },
  );

  if (!updatedWater) {
    throw createError(404, 'No record found');
  }

  return updatedWater;
};

export const deleteWater = async (userId, id) => {
  const deletedWater = await Water.findOneAndDelete({
    _id: id,
    userId,
  });

  if (!deletedWater) {
    throw createError(404, 'No record found');
  }

  return;
};
