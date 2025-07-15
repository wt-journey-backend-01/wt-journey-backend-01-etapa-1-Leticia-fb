const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/sugestao', (req, res) => {
  const { nome, ingredientes } = req.query;

  res.send(`
    <h1>Obrigado pela sugestão, ${nome}!</h1>
    <p>Seu lanche com os ingredientes: ${ingredientes} foi recebido.</p>
    <a href="/">Voltar ao início</a>
  `);
});

app.get('/contato', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

app.post('/contato', (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  const query = new URLSearchParams({ nome, email, assunto, mensagem }).toString();
  res.redirect(`/contato-recebido?${query}`);
});

app.get('/contato-recebido', (req, res) => {
  const { nome, email, assunto, mensagem } = req.query;

  res.send(`
    <h1>Mensagem recebida!</h1>
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Assunto:</strong> ${assunto}</p>
    <p><strong>Mensagem:</strong> ${mensagem}</p>
    <a href="/">Voltar ao início</a>
  `);
});

app.get('/api/lanches', (req, res) => {
  const lanches = require('./public/data/lanches.json');
  res.json(lanches);
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
  console.log(`DevBurger rodando em http://localhost:${PORT}`);
});
