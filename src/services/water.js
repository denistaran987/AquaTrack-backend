import expressAsyncHandler from 'express-async-handler';
import { Water } from '../db/models/water.js';

export const getDayWaterService = expressAsyncHandler(async (req, res) => {
  const { _id: owner } = req.user;
  const date = new Date(req.query.date);

  const userTimezoneOffset = req.user.timezoneOffset || 0;

  // Початок дня у UTC
  // Встановлюємо час на початок дня (00:00:00)
  // Коригуємо на часовий пояс користувача
  const startOfDay = new Date(date);
  startOfDay.setUTCHours(0, 0, 0, 0);
  startOfDay.setMinutes(startOfDay.getMinutes() - userTimezoneOffset);

  // Кінець дня у UTC
  // Встановлюємо час на кінець дня (23:59:59.999)
  // Коригуємо на часовий пояс користувача
  const endOfDay = new Date(date);
  endOfDay.setUTCHours(23, 59, 59, 999);
  endOfDay.setMinutes(endOfDay.getMinutes() - userTimezoneOffset);

  const foundWaterDayData = await Water.find({
    owner,
    date: {
      $gte: startOfDay, // Включає всі записи, починаючи з 00:00
      $lt: endOfDay, // Включає всі записи ДО 23:59:59.999
    },
  });

  // Обчислення обʼєму води випитої за день
  // Створення масиву даних про спожиту воду
  const totalDayWater = foundWaterDayData.reduce((acc, item) => acc + item.amount, 0);
  const consumedWaterData = foundWaterDayData.map((item) => ({
    _id: item._id,
    date: item.date,
    amount: item.amount,
  }));

  return {
    date,
    totalDayWater,
    consumedWaterData,
    owner,
  };
});

export const getMonthWaterService = expressAsyncHandler(async (req, res) => {
  const { _id: owner } = req.user;
  const date = new Date(req.query.date);

  // Визначаємо початок місяця
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  // Визначаємо кінець місяця
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const foundWaterMonthData = await Water.find({
    owner,
    date: {
      $gte: startOfMonth,
      $lt: endOfMonth,
    },
  });

  const summarizedData = foundWaterMonthData.reduce((acc, item) => {
    const date = new Date(item.date);
    const day = date.getDate();

    if (!acc[day]) {
      acc[day] = {
        date: new Date(date.setHours(0, 0, 0, 0)).toISOString(),
        totalDayWater: 0,
      };
    }
    acc[day].totalDayWater += item.amount;

    return acc;
  }, {});

  const result = Object.values(summarizedData);
  return result;
});
