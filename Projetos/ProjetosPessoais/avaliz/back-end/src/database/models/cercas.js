const Cerca = (sequelize, DataTypes) => {
  const Cerca = sequelize.define("Cerca", {
    name: DataTypes.STRING,
    paths: DataTypes.TEXT('long')
  });

  return Cerca;
};

module.exports = Cerca;