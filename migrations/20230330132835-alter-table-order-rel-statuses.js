'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('order_rel_statuses', {
      fields: ['order_id'],    // Campo(s) da tabela de origem
      type: 'foreign key',
      // nome da chave estrangeira (dever ser único no BD)
      name: 'order_rel_statuses_orders_fk',  
      references: {
        table: 'orders',      // Tabela estrangeira
        field: 'id'           // Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',    // Não deixa apagar uma city em uso no customer
      onUpdate: 'CASCADE'      // Atualiza city_id em customer se id em city mudar
    })
    await queryInterface.addConstraint('order_rel_statuses', {
      fields: ['order_status_id'],    // Campo(s) da tabela de origem
      type: 'foreign key',
      // nome da chave estrangeira (dever ser único no BD)
      name: 'order_rel_statuses_order_statuses_fk',  
      references: {
        table: 'order_statuses',      // Tabela estrangeira
        field: 'id'           // Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',    // Não deixa apagar uma city em uso no customer
      onUpdate: 'CASCADE'      // Atualiza city_id em customer se id em city mudar
    })
    await queryInterface.addConstraint('order_rel_statuses', {
      fields: ['user_id'],    // Campo(s) da tabela de origem
      type: 'foreign key',
      // nome da chave estrangeira (dever ser único no BD)
      name: 'order_rel_statuses_users_fk',  
      references: {
        table: 'users',      // Tabela estrangeira
        field: 'id'           // Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',    // Não deixa apagar uma city em uso no customer
      onUpdate: 'CASCADE'      // Atualiza city_id em customer se id em city mudar
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('order_rel_statuses', 'order_rel_statuses_users_fk')
    await queryInterface.removeConstraint('order_rel_statuses', 'order_rel_statuses_order_statuses_fk')
    await queryInterface.removeConstraint('order_rel_statuses', 'order_rel_statuses_orders_fk')
  }
};
