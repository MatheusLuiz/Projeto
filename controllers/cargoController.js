const Cargo = require('../models/cargoModel');


exports.listarCargos = (req, res) => {
    let sql = 'SELECT * FROM cargos';

    req.db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(result);
    });
};

exports.criarCargo = (req, res) => {
    let cargo = new Cargo(req.body.nome);
    let sql = 'INSERT INTO cargos SET ?';

    req.db.query(sql, cargo, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(201).send('Cargo criado com sucesso');
    });
};

exports.atualizarCargo = (req, res) => {
    let id = req.params.id;
    let nome = req.body.nome;
    let sql = 'UPDATE cargos SET nome = ? WHERE id_cargo = ?';

    req.db.query(sql, [nome, id], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.send('Cargo atualizado com sucesso');
    });
};

exports.removerCargo = (req, res) => {
    let id = req.params.id;
    let sql = 'DELETE FROM cargos WHERE id_cargo = ?';

    req.db.query(sql, id, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.send('Cargo removido com sucesso');
    });
};