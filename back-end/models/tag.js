'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.hasMany(models.CustomerTag, {
      //   foreignKey: 'tag_id',
      //   sourceKey: 'id',
      //   as:'customers'
      // })
      this.belongsToMany(models.Customer, {
        through: 'customer_tags',   //Tabela intermediária
        foreignKey: 'tag_id',       //Chave estrangeira da tabela intermediaria
        otherKey: 'customer_id',    //Outra chave da tabela intermediariá 
        as: 'customers'             //Nome do campo de associação (plural)   
      })
      this.belongsToMany(models.Order, {
        through: 'order_tags',        //Tabela intermediária
        foreignKey: 'tag_id',         //Chave estrangeira da tabela intermediaria
        otherKey: 'order_id',         //Outra chave da tabela intermediariá 
        as: 'orders'                  //Nome do campo de associação (plural)   
      })
    }
  }
  Tag.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING(30)
    },
    color: {
      type: DataTypes.STRING
    },
    type: {
      allowNull: false,
      type: DataTypes.ENUM('C','O')
    },
  }, {
    sequelize,
    modelName: 'Tag',
    tableName: 'tags'
  });
  return Tag;
};