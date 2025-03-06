import { addWater, updateWater, deleteWater } from '../services/water.js';

export const addWaterController = async (req, res, next) => {
  const { amount, date } = req.body;

  const formattedDate = new Date(date);

  const userId = '67a1f599b7ed372da1c632e0';

  const newWater = await addWater(userId, amount, formattedDate);

  res.status(201).json({
    status: 201,
    message: 'Successfully added water record!',
    data: newWater,
  });
};

export const updateWaterController = async (req, res, next) => {
  const { id } = req.params;
  const { amount, date } = req.body;

  const userId = '67a1f599b7ed372da1c632e0';

  const updatedWater = await updateWater(userId, id, amount, date);

  res.json({
    status: 200,
    message: 'Successfully updated water record!',
    data: updatedWater,
  });
};

export const deleteWaterController = async (req, res, next) => {
  const { id } = req.params;

  const userId = '67a1f599b7ed372da1c632e0';

  await deleteWater(userId, id);

  res.status(204).send();
};
