import { addWater, updateWater, deleteWater } from '../services/water.js';

export const addWaterController = async (req, res) => {
  const { amount, date } = req.body;

  const formattedDate = new Date(date);

  const owner = 'mock-user-id-123';

  const newWater = await addWater(owner, amount, formattedDate);

  res.status(201).json({
    status: 201,
    message: 'Successfully added water record!',
    data: newWater,
  });
};

export const updateWaterController = async (req, res) => {
  const { id } = req.params;
  const { amount, date } = req.body;

  const owner = 'mock-user-id-123';

  const updatedWater = await updateWater(owner, id, amount, date);

  res.json({
    status: 200,
    message: 'Successfully updated water record!',
    data: updatedWater,
  });
};

export const deleteWaterController = async (req, res) => {
  const { id } = req.params;

  const owner = 'mock-user-id-123';

  await deleteWater(owner, id);

  res.status(204).send();
};
