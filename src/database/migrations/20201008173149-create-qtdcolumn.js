module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.addColumn(
            'appointments',
            'quantidade',
            Sequelize.INTEGER
        );
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
