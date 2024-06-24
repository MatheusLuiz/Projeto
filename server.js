const express = require('express');
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoute'); // Importe sua rota de autenticação aqui
const app = express();
const port = 3000;

// Middleware para parser de requisições com JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração de rota para a autenticação
app.use('/', authRoute);


// Servir arquivos estáticos (se necessário)
app.use(express.static('public'));

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});