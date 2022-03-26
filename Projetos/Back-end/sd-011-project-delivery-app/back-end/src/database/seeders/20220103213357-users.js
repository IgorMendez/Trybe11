module.exports = {
  up: async (queryInterface, _Sequelize) => queryInterface.bulkInsert('users',
  [
    {
      id: 1,
      name: 'Delivery App Admin',
      email: 'adm@deliveryapp.com',
      password: 'a4c86edecc5aee06eff8fdeda69e0d04',
      role: 'administrator',
      createdAt: new Date('2011-08-01T19:58:00.000Z'),
      updatedAt: new Date('2011-08-01T19:58:51.000Z'),
    },
    {
      id: 2,
      name: 'Fulana Pereira',
      email: 'fulana@deliveryapp.com',
      password: '3c28d2b0881bf46457a853e0b07531c6',
      role: 'seller',
      createdAt: new Date('2011-08-01T19:58:00.000Z'),
      updatedAt: new Date('2011-08-01T19:58:51.000Z'),
    },
    {
      id: 3,
      name: 'Cliente Zé Birita',
      email: 'zebirita@email.com',
      password: '1c37466c159755ce1fa181bd247cb925',
      role: 'customer',
      createdAt: new Date('2011-08-01T19:58:00.000Z'),
      updatedAt: new Date('2011-08-01T19:58:51.000Z'),
    },
    {
      id: 4,
      name: 'igor mendesssss',
      email: 'igor@gmail.com',
      password: 'e10adc3949ba59abbe56e057f20f883e',
      role: 'customer',
      createdAt: new Date('2011-08-01T19:58:00.000Z'),
      updatedAt: new Date('2011-08-01T19:58:51.000Z'),
    },
    {
      id: 5,
      name: 'sller',
      email: 'seller@gmail.com',
      password: 'e10adc3949ba59abbe56e057f20f883e',
      role: 'seller',
      createdAt: new Date('2011-08-01T19:58:00.000Z'),
      updatedAt: new Date('2011-08-01T19:58:51.000Z'),
    },
  ], { timestamps: false }
  ),

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {}); 
  }
};
