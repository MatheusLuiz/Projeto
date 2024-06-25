const Filial = require('../models/filiaisModel');

exports.listarFiliais = (req, res) => {
    Filial.findAll()
        .then(filiais => {
            res.json(filiais);
        })
        .catch(err => {
            console.error('Erro ao buscar filiais:', err);
            res.status(500).json({ error: 'Erro ao buscar filiais.' });
        });
};

exports.buscarFilialPorId = (req, res) => {
    const id = req.params.id;

    Filial.findById(id)
        .then(filial => {
            if (!filial) {
                res.status(404).json({ error: 'Filial não encontrada.' });
            } else {
                res.json(filial);
            }
        })
        .catch(err => {
            console.error('Erro ao buscar filial por ID:', err);
            res.status(500).json({ error: 'Erro ao buscar filial por ID.' });
        });
};

exports.criarFilial = (req, res) => {
    const { nome } = req.body;


    if (!nome) {
        return res.status(400).json({ error: 'O campo nome é obrigatório.' });
    }

    const novaFilial = {
        nome: nome
    };

    Filial.create(novaFilial)
        .then(filial => {
            res.status(201).json({ message: 'Filial criada com sucesso.', filial });
        })
        .catch(err => {
            console.error('Erro ao criar filial:', err);
            res.status(500).json({ error: 'Erro ao criar filial.' });
        });
};

exports.atualizarFilial = (req, res) => {
    const id = req.params.id;
    const { nome } = req.body;


    if (!nome) {
        return res.status(400).json({ error: 'O campo nome é obrigatório.' });
    }

    const filialAtualizada = {
        nome: nome
    };

    Filial.update(filialAtualizada, id)
        .then(updated => {
            if (updated) {
                res.json({ message: 'Filial atualizada com sucesso.' });
            } else {
                res.status(404).json({ error: 'Filial não encontrada ou não foi possível atualizar.' });
            }
        })
        .catch(err => {
            console.error('Erro ao atualizar filial:', err);
            res.status(500).json({ error: 'Erro ao atualizar filial.' });
        });
};

exports.removerFilial = (req, res) => {
    const id = req.params.id;

    Filial.delete(id)
        .then(deleted => {
            if (deleted) {
                res.json({ message: 'Filial removida com sucesso.' });
            } else {
                res.status(404).json({ error: 'Filial não encontrada ou não foi possível remover.' });
            }
        })
        .catch(err => {
            console.error('Erro ao remover filial:', err);
            res.status(500).json({ error: 'Erro ao remover filial.' });
        });
};