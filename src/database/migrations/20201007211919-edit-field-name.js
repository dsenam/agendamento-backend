module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.renameColumn(
            'users',
            'password-hash',
            'password_hash'
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
