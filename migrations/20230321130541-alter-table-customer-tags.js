'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('customer_tags', {
      fields: ['customer_id'],    // Campo(s) da tabela de origem
      type: 'foreign key',
      // nome da chave estrangeira (dever ser único no BD)
      name: 'customer_tags_customers_fk',  
      references: {
        table: 'customers',      // Tabela estrangeira
        field: 'id'           // Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',    // Não deixa apagar uma city em uso no customer
      onUpdate: 'CASCADE'      // Atualiza city_id em customer se id em city mudar
    })
    await queryInterface.addConstraint('customer_tags', {
      fields: ['tag_id'],    // Campo(s) da tabela de origem
      type: 'foreign key',
      // nome da chave estrangeira (dever ser único no BD)
      name: 'customer_tags_tags_fk',  
      references: {
        table: 'tags',      // Tabela estrangeira
        field: 'id'           // Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',    // Não deixa apagar uma city em uso no customer
      onUpdate: 'CASCADE'      // Atualiza city_id em customer se id em city mudar
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('customer_tags', 'customers_tags_tags_fk')
    await queryInterface.removeConstraint('customer_tags', 'customers_tags_customers_fk')
  }
};
