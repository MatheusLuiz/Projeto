const { findByUsernameAndPassword } = require('../models/authModel');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await findByUsernameAndPassword(username, password);

    if (user) {
      res.redirect('/dashboard.html');
    } else {
      res.status(401).json({ message: 'Credenciais inválidas ou usuário não existe' });
    }
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};


