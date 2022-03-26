module.exports = (sequelize, DataTypes) => {
 const SalesProduct = sequelize.define('SalesProduct', {
    sale_id: { type: DataTypes.INTEGER, foreignKey: true  },
    product_id: { type: DataTypes.INTEGER, foreignKey: true  },
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    tableName: 'salesProducts',
  });
  SalesProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: SalesProduct,
      foreignKey: 'product_id',
      otherKey: 'sale_id',
    });
    models.Sale.belongsToMany(models.Product, {
      as: 'product',
      through: SalesProduct,
      foreignKey: 'sale_id',
      otherKey: 'product_id',
    });
  };
  return SalesProduct;
};
