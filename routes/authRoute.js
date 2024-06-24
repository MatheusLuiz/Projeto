const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para apresentar o formulário de login
router.get('/', (req, res) => {
  res.sendFile('login.html', { root: 'views' });
});

// Rota para processar o formulário de login
router.post('/login', authController.login);

// Rota para redirecionar para o dashboard após o login
router.get('/dashboard.html', (req, res) => {
  res.sendFile('dashboard.html', { root: 'views' });
});

router.get('/logout.html', (req, res) => {
    res.sendFile('logout.html', { root: 'views' });
});

module.exports = router;