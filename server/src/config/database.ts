require('../bootstrap.ts');

module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: false,
  storage: './__tests__/database.sqlite',
  define: {
    timestamps: true,
    underscored: true,
  },
};
