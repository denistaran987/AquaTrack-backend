import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: {
      type: String,
      required: true,
      enum: ['woman', 'man'],
      default: 'woman',
    },
    weight: {
      type: Number,
      required: false,
      default: 0,
    },
    dailySportTime: {
      type: Number,
      required: false,
      default: 0,
    },
    dailyNorm: {
      type: Number,
      required: false,
      default: 1500,
    },
    avatarUrl: {
      type: String,
      required: false,
      default: 'https://www.gravatar.com/avatar/?d=mp',
    },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);
