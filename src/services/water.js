import expressAsyncHandler from "express-async-handler";
import { Water } from "../db/models/water.js";

export const getDayWaterService = expressAsyncHandler(async (req, res) => {
  const { _id: owner } = req.user;
  const date = new Date(req.query.date);

  const userTimezoneOffset = req.user.timezoneOffset || 0;

// Початок дня у UTC
const startOfDay = new Date(date);
startOfDay.setUTCHours(0, 0, 0, 0); // Встановлюємо час на початок дня (00:00:00)
startOfDay.setMinutes(startOfDay.getMinutes() - userTimezoneOffset); // Коригуємо на часовий пояс користувача

// Кінець дня у UTC
const endOfDay = new Date(date);
endOfDay.setUTCHours(23, 59, 59, 999); // Встановлюємо час на кінець дня (23:59:59.999)
endOfDay.setMinutes(endOfDay.getMinutes() - userTimezoneOffset); // Коригуємо на часовий пояс користувача


  // const foundWaterDayData = await Water.find({
  //   owner,
  //   date: {
  //     $gte: startOfDay,
  //     $lt: endOfDay,
  //   },
  // });

  const foundWaterDayData = [
    {
      _id: "mock123",
      date: new Date().toISOString(),
      amount: 500,
    },
    {
      _id: "mock124",
      date: new Date().toISOString(),
      amount: 300,
    },
  ];

  if (!foundWaterDayData.length) {
    return {
      date,
      totalDayWater: 0,
      consumedWaterData : [],
      owner,
    };
  }

  const totalDayWater = foundWaterDayData.reduce(
    (acc, item) => acc + item.amount,
    0,
  );
  const consumedWaterData = foundWaterDayData.map(item => ({
    _id: item._id,
    date: item.date,
    amount: item.amount
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

  // Початок місяця
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  // Кінець місяця
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  // const foundWaterMonthData = await Water.find({
  //   owner,
  //   date: {
  //     $gte: startOfMonth,
  //     $lt: endOfMonth,
  //   },
  // });

  const foundWaterMonthData = [
    {
      _id: "mock125",
      date: new Date("2024-03-01T10:00:00.000Z"),
      amount: 500,
    },
    {
      _id: "mock126",
      date: new Date("2024-03-02T12:00:00.000Z"),
      amount: 300,
    },
    {
      _id: "mock127",
      date: new Date("2024-03-02T18:00:00.000Z"),
      amount: 700,
    },
  ];

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