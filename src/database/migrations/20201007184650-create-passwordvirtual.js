module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.renameColumn(
            'users',
            'password',
            'password-hash'
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
