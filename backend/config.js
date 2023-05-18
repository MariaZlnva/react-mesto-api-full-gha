const {
  // JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET',
  PORT = process.env.PORT || '3000',
  DB_ADDRESS = process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/mestodb',
  // NODE_ENV = process.env.NODE_ENV,
} = process.env;

module.exports = {
  // JWT_SECRET,
  PORT,
  DB_ADDRESS,
  // NODE_ENV,
};
