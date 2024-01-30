'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('User', [
      {
        id: 1,
        email: 'admin@mail.ru',
        passwordHash:
          '$2b$05$TOz6fo2t2qOd3QXpR/mbg.7ejKksn857wt0RHqLUW3.6WHuqkXAfa',
        refreshToken: null,
        firstName: 'ADMIN',
        lastName: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        email: 'engineer@mail.ru',
        passwordHash:
          '$2b$05$TOz6fo2t2qOd3QXpR/mbg.7ejKksn857wt0RHqLUW3.6WHuqkXAfa',
        refreshToken: null,
        firstName: 'ENGINEER',
        lastName: 'ENGINEER',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        email: 'client@mail.ru',
        passwordHash:
          '$2b$05$TOz6fo2t2qOd3QXpR/mbg.7ejKksn857wt0RHqLUW3.6WHuqkXAfa',
        refreshToken: null,
        firstName: 'CLIENT',
        lastName: 'CLIENT',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('User', null, {});
  },
};
