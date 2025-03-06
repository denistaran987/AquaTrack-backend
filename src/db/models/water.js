import { Schema, model, Types } from 'mongoose';

// const startDate = new Date('01/01/2024');

const waterSchema = new Schema(
  {
    date: {
      type: Date,//time?
      // min: +startDate,
      required: true,
    },
    amount: {
      type: Number,
      min: 50,
      max: 5000,
      required: true,
    },
    owner: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

export const Water = model('Water', waterSchema);