const knex = require('./database');
const moment = require('moment');

const getAll = () => {
    return knex.select('*').from('conversa_historico');
};

const getAllDay = (usuario) => {
    return knex.select('*').from('conversa_historico').where( "created_at", moment().format('YYYY-MM-DD')).where('usuario', usuario);
};

const saveMessage = (data) => {
    return knex('conversa_historico').insert(data);
};


module.exports = {
    getAll,
    saveMessage,
    getAllDay
};