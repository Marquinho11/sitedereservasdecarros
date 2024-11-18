const Sequelize = require('sequelize');
const connect = require('./data');
const { name } = require('ejs');


const Reservas = connect.define('reservas',{
    name: {type: Sequelize.STRING, allowNull: false},
    email: {type: Sequelize.STRING, allowNull: false},
    selectCarros: {type: Sequelize.STRING, allowNull: false},
    datainicio: {type: Sequelize.STRING, allowNull: false},
    datafim: {type: Sequelize.STRING, allowNull: false}
});

Reservas.sync({force: false}).then(()=>{
    console.log('Tabela criada com sucesso');
});
module.exports = Reservas;