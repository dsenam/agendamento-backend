module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'agendamento',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
