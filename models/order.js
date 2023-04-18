'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Tag, {
        through: 'order_tags',     //Tabela intermediária
        foreignKey: 'tag_id',         //Chave strangeira da tabela iintermediaria
        otherKey: 'order_id',
        as: 'tags'
      })

      this.belongsToMany(models.User, {
        through: 'order_rel_statuses',     //Tabela intermediária
        foreignKey: 'user_id',         //Chave strangeira da tabela iintermediaria
        otherKey: 'order_status_id',
        otherKey: 'order_id',
        as: 'users'
      })

      this.belongsToMany(models.OrderStatus, {
        through: 'order_rel_statuses',     //Tabela intermediária
        foreignKey: 'order_status_id',         //Chave strangeira da tabela iintermediaria
        otherKey: 'order_id',
        otherKey: 'user_id',
        as: 'order_statuses'
      })
    }
  }
  Order.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    external_code: {
      type: DataTypes.STRING(20)
    },
    theme: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    remarks: {
      type: DataTypes.TEXT
    },
    pic_url: {
      type: DataTypes.STRING(200)
    },
    custom_name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    custom_age: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    event_date: {
      type: DataTypes.DATE
    },
    artwork_date: {
      type: DataTypes.DATE
    },
    shipment_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    total_amount: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    channel_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    carrier_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    shipment_priority_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    payment_method: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders'
  });
  return Order;
};