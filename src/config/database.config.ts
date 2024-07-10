export type DatabaseConfig = {
  host: string;
  port: number;
  user: string;
  password?: string;
  database: string;
};

export default (): DatabaseConfig => ({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});
