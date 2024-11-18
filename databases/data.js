const Sequelizer = require('sequelize');

const connect = new Sequelizer('reservas','root','Marquinhos12@',{
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = connect;