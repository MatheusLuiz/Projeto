const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

router.get('/funcionarios', (req, res, next) => {
    console.log("Requisição recebida em /funcionarios");
    next();
}, funcionarioController.getAllFuncionariosActive);

router.get('/funcionarios/inativos', (req, res, next) => {
    console.log("Requisição recebida em /funcionarios");
    next();
}, funcionarioController.getAllFuncionariosInactive);

router.get('/funcionarios/:matricula', (req, res, next) => {
    console.log(`Requisição recebida em /funcionarios/${req.params.matricula}`);
    next();
}, funcionarioController.getFuncionarioById);

router.post('/funcionarios', (req, res, next) => {
    console.log("Requisição recebida em /funcionarios com corpo:", req.body);
    next();
}, funcionarioController.createFuncionario);

router.post('/funcionario', (req, res, next) => {
    console.log(`Requisição recebida em /funcionario com corpo:`, req.body);
    next();
}, funcionarioController.updateFuncionario);

router.delete('/funcionarios/:id', (req, res, next) => {
    console.log(`Requisição recebida em /funcionarios/${req.params.id}`);
    next();
}, funcionarioController.deleteFuncionario);

module.exports = router;