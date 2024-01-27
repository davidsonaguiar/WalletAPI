
export const Config = {
  env: "development",
  PORT: process.env.PORT ?? 3001,
  API_BASE: "/api/",
  DB_HOST: "localhost",
  DB_PORT: process.env.DATABASE_PORT ?? 5432,
  DB_USERNAME: "postgres",
  DB_PASSWORD: "admin",
  DB_DATABASE: "postgres",
  COOKIE_SECURE: false,
  COOKIE_MAX_AGE: 3600000,
  JWT_SECRETE: process.env.SECRET ?? "secret",
  CLIENT_URL: "http://localhost:5173",
}