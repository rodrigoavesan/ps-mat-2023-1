'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('products', {
      fields: ['supplier_id'],    // Campo(s) da tabela de origem
      type: 'foreign key',
      // nome da chave estrangeira (dever ser único no BD)
      name: 'products_supplier_fk',  
      references: {
        table: 'supplier',      // Tabela estrangeira
        field: 'id'           // Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',    // Não deixa apagar uma city em uso no customer
      onUpdate: 'CASCADE'      // Atualiza city_id em customer se id em city mudar
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('products', 'products_supplier_fk')
  }
};
