import { getDayWaterService, getMonthWaterService } from "../services/water.js";

export async function getDayWaterContoller(req, res) {

  const result = await getDayWaterService(req, res);
  res.status(200).send({
    status: 200,
    message: 'Daily water cards',
    data: result,
  });
}

export async function getMonthWaterContoller(req, res) {

  const result = await getMonthWaterService(req, res);
  res.status(200).send({
    status: 200,
    message: 'Total month water cards',
    data: result,
  });
}