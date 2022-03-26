module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define( 'Product', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    url_image: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'products',
  });
  return products;
};