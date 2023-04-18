'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Cria a chave estrangeira da tabela customers para a tabela citiies
    await queryInterface.addConstraint('customers', {
      fields: ['city_id'],    // Campo(s) da tabela de origem
      type: 'foreign key',
      // nome da chave estrangeira (dever ser único no BD)
      name: 'customers_cities_fk',  
      references: {
        table: 'cities',      // Tabela estrangeira
        field: 'id'           // Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',    // Não deixa apagar uma city em uso no customer
      onUpdate: 'CASCADE'      // Atualiza city_id em customer se id em city mudar
    })
  },

  async down (queryInterface, Sequelize) {
    // Reverte as alterações do up()
    await queryInterface.removeConstraint('customers', 'customers_cities_fk')
  }
};
