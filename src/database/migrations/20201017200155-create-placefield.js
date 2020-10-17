module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.addColumn('appointments', 'place', Sequelize.STRING);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};
