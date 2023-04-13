'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Order, {
        through: 'order_rel_statuses',   //Tabela intermediária
        foreignKey: 'order_id',  //Chave estrangeira da tabela intermediaria
        otherKey: 'user_id',
        otherKey: 'order_status_id',         //Outra chave da tabela intermediariá 
        as: 'orders'                  //Nome do campo de associação (plural)   
      })
    }
    static associate(models) {
      this.belongsToMany(models.OrderStatus, {
        through: 'order_rel_statuses',   //Tabela intermediária
        foreignKey: 'order_status_id',  //Chave estrangeira da tabela intermediaria
        otherKey: 'user_id',  
        otherKey: 'order_id',         //Outra chave da tabela intermediariá 
        as: 'order_statuses'                  //Nome do campo de associação (plural)   
      })
    }
  }
  User.init({
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name:{
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email:{
      type: DataTypes.STRING(100),
      allowNull: false
    },
    verified_email:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false // Valor padrão do campo
    },
    is_admin:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    },
    phone:{
      type: DataTypes.STRING(20),
      allowNull: false
    },
    password:{
      type: DataTypes.STRING(200),
    allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    //Esconde o campo "password" no retrive e no retriveOne
    defaultScope:{
      attributes:{
        exclude:['password']
      }
    },
    scopes: {
      //Inclui o campo "password" (necessario no login)
      withPassword:{
        attributes:{
          include:['password']
        }
      }
    }
    
    
  });
  return User;
};