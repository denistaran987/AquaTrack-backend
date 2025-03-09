import { getDayWaterService, getMonthWaterService } from '../services/water.js';
import { addWater, updateWater, deleteWater } from '../services/water.js';

export const addWaterController = async (req, res) => {
  const { amount, date } = req.body;

  const formattedDate = new Date(date);

  const owner = req.user._id;

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

  const owner = req.user._id;

  const updatedWater = await updateWater(owner, id, amount, date);

  res.json({
    status: 200,
    message: 'Successfully updated water record!',
    data: updatedWater,
  });
};

export const deleteWaterController = async (req, res) => {
  const { id } = req.params;

  const owner = req.user._id;

  await deleteWater(owner, id);

  res.status(204).send();
};

export async function getDayWaterController(req, res) {
  const result = await getDayWaterService(req, res);
  res.status(200).send({
    status: 200,
    message: 'Daily water cards',
    data: result,
  });
}

export async function getMonthWaterController(req, res) {
  const result = await getMonthWaterService(req, res);
  res.status(200).send({
    status: 200,
    message: 'Total month water cards',
    data: result,
  });
}
