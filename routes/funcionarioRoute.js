const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

router.get('/:matricula', funcionarioController.getFuncionarioById);
router.get('/', funcionarioController.getAllFuncionarios);
router.post('/', funcionarioController.createFuncionario);

module.exports = router;