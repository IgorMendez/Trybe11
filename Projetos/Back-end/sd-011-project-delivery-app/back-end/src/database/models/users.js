module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('User', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    sequelize,
    tableName: 'users',
  });

  return users;
};
