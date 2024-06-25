const express = require('express');
const router = express.Router();
const cargoController = require('../controllers/cargoController');

// Rotas para os cargos
router.get('/', cargoController.listarCargos);
router.post('/', cargoController.criarCargo);
router.put('/:id', cargoController.atualizarCargo);
router.delete('/:id', cargoController.removerCargo);

module.exports = router;