import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/test/impl/*.[jt]s?(x)', '**/test/binding/*.[jt]s?(x)'],
  setupFilesAfterEnv: ['./test/setup.ts'],
};

export default config;
