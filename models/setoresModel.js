const db = require('../config/banco');

exports.findAll = () => {
    return db.query('SELECT * FROM setores')
        .then(([rows]) => rows)
        .catch(err => {
            console.error('Erro ao buscar setores:', err);
            throw err;
        });
};

exports.findById = (id) => {
    return db.query('SELECT * FROM setores WHERE id_setor = ?', [id])
        .then(([rows]) => rows[0])
        .catch(err => {
            console.error('Erro ao buscar setor por ID:', err);
            throw err;
        });
};

exports.create = (setor) => {
    return db.query('INSERT INTO setores SET ?', setor)
        .then(([result]) => ({ id: result.insertId, ...setor }))
        .catch(err => {
            console.error('Erro ao criar setor:', err);
            throw err;
        });
};

exports.update = (setor, id) => {
    return db.query('UPDATE setores SET ? WHERE id_setor = ?', [setor, id])
        .then(([result]) => result.affectedRows > 0)
        .catch(err => {
            console.error('Erro ao atualizar setor:', err);
            throw err;
        });
};

exports.delete = (id) => {
    return db.query('DELETE FROM setores WHERE id_setor = ?', id)
        .then(([result]) => result.affectedRows > 0)
        .catch(err => {
            console.error('Erro ao remover setor:', err);
            throw err;
        });
};