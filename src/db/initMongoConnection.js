import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';
import { ENV_VAR } from '../constants/env/constants.js';

export const initMongoConnection = async () => {
  try {
    const user = getEnvVar(ENV_VAR.MONGODB_USER);
    const pwd = getEnvVar(ENV_VAR.MONGODB_PASSWORD);
    const uri = getEnvVar(ENV_VAR.MONGODB_URI);
    const db = getEnvVar(ENV_VAR.MONGODB_DB);

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${uri}/${db}?retryWrites=true&w=majority&appName=DataNest`
    );
    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};
