import * as dotenv from 'dotenv';
dotenv.config();
// import { Logger } from '@nestjs/common';

// export type ConfigType = {
//   API_PORT: number;
//   NODE_ENV: string;
//   DB_URL: string;
//   ACCESS_TOKEN_KEY: string;
//   ACCESS_TOKEN_TIME: string;
//   REFRESH_TOKEN_KEY: string;
//   REFRESH_TOKEN_TIME: string;
//   FILE_PATH: string;
// };

// const requiredVariables = [
//   'API_PORT',
//   'NODE_ENV',
//   'DEV_DB_URL',
//   'PROD_DB_URL',
//   'ACCESS_TOKEN_KEY',
//   'ACCESS_TOKEN_TIME',
//   'REFRESH_TOKEN_KEY',
//   'REFRESH_TOKEN_TIME',
//   'FILE_PATH',
// ];

// const missingVariables = requiredVariables.filter((variable) => {
//   const value = process.env[variable];
//   return !value || value.trim() === '';
// });

// if (missingVariables.length > 0) {
//   Logger.error(
//     `Missing or empty required environment variables: ${missingVariables.join(', ')}`,
//   );
//   process.exit(1);
// }

export const config = {
  app: {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
  },
  jwt: {
    public_key: process.env.PUBLIC_KEY,
    access: {
      secret: process.env.ACCESS_SECRET,
      time: process.env.ACCESS_TIME,
    },
    refresh: {
      secret: process.env.REFRESH_SECRET,
      time: process.env.REFRESH_TIME,
    },
  },
};
