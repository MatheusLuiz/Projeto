const Setor = require('../models/setoresModel');

exports.listarSetores = (req, res) => {
    Setor.findAll()
        .then(setores => {
            res.json(setores);
        })
        .catch(err => {
            console.error('Erro ao buscar setores:', err);
            res.status(500).json({ error: 'Erro ao buscar setores.' });
        });
};

exports.buscarSetorPorId = (req, res) => {
    const id = req.params.id;

    Setor.findById(id)
        .then(setor => {
            if (!setor) {
                res.status(404).json({ error: 'Setor não encontrado.' });
            } else {
                res.json(setor);
            }
        })
        .catch(err => {
            console.error('Erro ao buscar setor por ID:', err);
            res.status(500).json({ error: 'Erro ao buscar setor por ID.' });
        });
};

exports.criarSetor = (req, res) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ error: 'O campo nome é obrigatório.' });
    }

    const novoSetor = {
        nome: nome
    };

    Setor.create(novoSetor)
        .then(setor => {
            res.status(201).json({ message: 'Setor criado com sucesso.', setor });
        })
        .catch(err => {
            console.error('Erro ao criar setor:', err);
            res.status(500).json({ error: 'Erro ao criar setor.' });
        });
};

exports.atualizarSetor = (req, res) => {
    const id = req.params.id;
    const { nome } = req.body;

  
    if (!nome) {
        return res.status(400).json({ error: 'O campo nome é obrigatório.' });
    }

    const setorAtualizado = {
        nome: nome
    };

    Setor.update(setorAtualizado, id)
        .then(updated => {
            if (updated) {
                res.json({ message: 'Setor atualizado com sucesso.' });
            } else {
                res.status(404).json({ error: 'Setor não encontrado ou não foi possível atualizar.' });
            }
        })
        .catch(err => {
            console.error('Erro ao atualizar setor:', err);
            res.status(500).json({ error: 'Erro ao atualizar setor.' });
        });
};

exports.removerSetor = (req, res) => {
    const id = req.params.id;

    Setor.delete(id)
        .then(deleted => {
            if (deleted) {
                res.json({ message: 'Setor removido com sucesso.' });
            } else {
                res.status(404).json({ error: 'Setor não encontrado ou não foi possível remover.' });
            }
        })
        .catch(err => {
            console.error('Erro ao remover setor:', err);
            res.status(500).json({ error: 'Erro ao remover setor.' });
        });
};