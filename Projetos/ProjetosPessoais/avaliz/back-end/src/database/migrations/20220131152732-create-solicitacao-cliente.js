'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SolicitacaoClientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      serviceName: {
        type: Sequelize.STRING
      },
      documentSign: {
        type: Sequelize.STRING
      },
      checkout: {
        type: Sequelize.STRING
      },
      Name: {
        type: Sequelize.STRING
      },
      dataCar: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      cpfCnpj: {
        type: Sequelize.STRING
      },
      Phone: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      nameRecived: {
        type: Sequelize.STRING
      },
      phoneRecived: {
        type: Sequelize.STRING
      },
      placa: {
        type: Sequelize.STRING
      },
      valorEstimadoCliente: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      houseNumber: {
        type: Sequelize.STRING
      },
      complementAdress: {
        type: Sequelize.STRING
      },
      district: {
        type: Sequelize.STRING
      },
      City: {
        type: Sequelize.STRING
      },
      State: {
        type: Sequelize.STRING
      },
      cep: {
        type: Sequelize.STRING
      },
      serviceTotalPrice: {
        type: Sequelize.INTEGER
      },
      moreInfos: {
        type: Sequelize.STRING
      },
      ip: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SolicitacaoClientes');
  }
};