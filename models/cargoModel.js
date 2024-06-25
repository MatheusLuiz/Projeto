const db = require('../config/banco');

exports.findAll = () => {
    return db.query('SELECT * FROM cargos')
        .then(([rows]) => rows)
        .catch(err => {
            console.error('Erro ao buscar cargos:', err);
            throw err;
        });
};

exports.create = (cargo) => {
    return db.query('INSERT INTO cargos SET ?', cargo)
        .then(([result]) => ({ id: result.insertId, ...cargo }))
        .catch(err => {
            console.error('Erro ao criar cargo:', err);
            throw err;
        });
};

exports.update = (cargo, id) => {
    return db.query('UPDATE cargos SET ? WHERE id_cargo = ?', [cargo, id])
        .then(([result]) => result.affectedRows > 0)
        .catch(err => {
            console.error('Erro ao atualizar cargo:', err);
            throw err;
        });
};

exports.delete = (id) => {
    return db.query('DELETE FROM cargos WHERE id_cargo = ?', id)
        .then(([result]) => result.affectedRows > 0)
        .catch(err => {
            console.error('Erro ao remover cargo:', err);
            throw err;
        });
};