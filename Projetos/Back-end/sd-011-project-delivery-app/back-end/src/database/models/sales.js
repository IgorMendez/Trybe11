module.exports = (sequelize, DataTypes) => {
  const sales = sequelize.define('Sale', {
    user_id: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER,
    total_price: DataTypes.DECIMAL(10, 2),
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'sales',
  });
  sales.associate = (models) => {
    sales.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'users'
    });
  }
  sales.associate = (models) => {
    sales.belongsTo(models.User, {
      foreignKey: 'seller_id',
      as: 'users'
    });
  }
  return sales;
};