const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const authRoute = require('./routes/authRoute'); // Importe sua rota de autenticação aqui
const funcionarioRoutes = require('./routes/funcionarioRoute');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// Middleware para parser de requisições com JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração de rota para a autenticação
app.use('/', authRoute);
app.use('/api', funcionarioRoutes);


// Servir arquivos estáticos (se necessário)
app.use(express.static('public'));

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});