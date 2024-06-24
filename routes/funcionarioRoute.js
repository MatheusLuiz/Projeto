const express = require('express');
const router = express.Router();
const {
    createFuncionario,
    getFuncionarioById,
    getAllFuncionarios
} = require('../controllers/funcionarioController');

// Rota para criar um novo funcionário
router.post('/funcionarios', createFuncionario);

// Rota para buscar um funcionário pelo ID (matrícula)
router.get('/funcionarios/:matricula', getFuncionarioById);

// Rota para buscar todos os funcionários
router.get('/funcionarios', getAllFuncionarios);

module.exports = router;