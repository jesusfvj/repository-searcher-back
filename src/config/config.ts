import dotenv from 'dotenv';
import { Config } from '../interfaces/config';

const ENV: string = process.env.NODE_ENV || 'development';

if (ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config({ path: '.env.development' });
}

const CONFIG: Config = {
  development: {
    app: {
      PORT: process.env.PORT || 4000,
    },
    db: { URI: process.env.MONGODB_URL }
  },
  production: {
    app: {
      PORT: process.env.PORT || 4001,
    },
    db: { URI: process.env.MONGODB_URL }
  }
};

export default CONFIG[ENV];
