const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

router.get('/funcionarios', (req, res, next) => {
    console.log("Requisição recebida em /funcionarios");
    next();
}, funcionarioController.getAllFuncionariosActive);

router.get('/funcionarios/:matricula', (req, res, next) => {
    console.log(`Requisição recebida em /funcionarios/${req.params.matricula}`);
    next();
}, funcionarioController.getFuncionarioById);

router.post('/funcionarios', (req, res, next) => {
    console.log("Requisição recebida em /funcionarios com corpo:", req.body);
    next();
}, funcionarioController.createFuncionario);

module.exports = router;
