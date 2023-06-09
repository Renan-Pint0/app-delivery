module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('SalesProducts',
  {
    saleId: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      foreignKey: true,
    },
    productId: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      foreignKey: true,
    },
    quantity: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'sales_products',
    underscored: true,
  });

  SalesProducts.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: SalesProducts,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });

    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: SalesProducts,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };

  return SalesProducts;
};