require('dotenv').config();
const express = require('express');
const { create } = require('express-handlebars');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// Configuração do motor Handlebars
const exphbs = create({
  defaultLayout: 'main',
  partialsDir: path.join(__dirname, 'views/partials')
});

app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');


// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'novo_usuario', // Substitua com seu usuário
  password: 'nova_senha', // Substitua com sua senha
  database: 'guardian'
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados');
  }
});

// Definição do caminho para arquivos estáticos
app.use(express.static(path.join(__dirname, './assets')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Middleware para processar dados do formulário
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Para arquivos estáticos (HTML e CSS)

app.get('/', (req, res) => {
  res.render('home'); // Apenas renderiza a página
});

// Rota para registro
app.get('/register', (req, res) => {
  res.render('register', {
    title: 'Registrar',
    description: 'Crie uma conta para acessar o site.'
  });
});

// Rota para login
app.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login',
    description: 'Faça login para acessar sua conta.'
  });
});

app.get('/', (req, res) => {
  res.render('main'); // Renderiza a página index.handlebars
});

// Rota para "Informações do Jogo"
app.get('/informacoes', (req, res) => {
  res.render('informacoes');
});

// Rota para "Como Ajudar"
app.get('/ajudar', (req, res) => {
  res.render('ajudar');
});

// Rota para "Notícias"
app.get('/noticias', (req, res) => {
  res.render('noticias');
});

// Rota para "Comunidade"
app.get('/forum', (req, res) => {
  res.render('forum');
});

// Rota para "Login"
app.get('/login', (req, res) => {
  res.render('login');
});

// Rota para "Perfil do GUARDIAN"
app.get('/conta', (req, res) => {
  res.render('conta');
});

// Rota para "Configurações da conta"
app.get('/configuracoes', (req, res) => {
  res.render('configuracoes');
});

// Rota para "Inscreva-se"
app.get('/register', (req, res) => {
  res.render('register');
});

// Rota para "Suporte"
app.get('/suporte', (req, res) => {
  res.render('suporte');
});

// Rota para "Loja"
app.get('/loja', (req, res) => {
  res.render('loja');
});

// Rota para "Baixe o GUARDIAN"
app.get('/baixe', (req, res) => {
  res.render('baixe');
});

app.get('/topico', (req, res) => {
  res.render('topico');
});


// Lógica de login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).send('Por favor, preencha todos os campos.');
  }

  // Verificar se o usuário existe no banco de dados
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err) {
      console.error('Erro ao consultar banco de dados:', err);
      return res.status(500).send('Erro no banco de dados');
    }

    if (result.length === 0) {
      return res.status(400).send('Credenciais inválidas');
    }

    const user = result[0];

    // Verificar se a senha está correta
    const isPasswordValid = await bcrypt.compare(senha, user.password);
    if (!isPasswordValid) {
      return res.status(400).send('Credenciais inválidas');
    }

    res.redirect('/');
  });
});


// Lógica de registro
app.post('/register', (req, res) => {
  const { nome, email, senha } = req.body;

  // Mapeando para os campos corretos da tabela
  const username = nome; 
  const password = senha; 

  console.log('Corpo da requisição:', req.body);

  if (!username || !email || !password) {
    return res.status(400).send('Por favor, preencha todos os campos.');
  }

  // Verificar se o usuário já existe
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, result) => {
    if (err) {
      console.error('Erro ao consultar banco de dados:', err);
      return res.status(500).send('Erro no banco de dados');
    }
    if (result.length > 0) {
      return res.status(400).send('Usuário já existe');
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir o usuário no banco de dados
    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Erro ao registrar usuário:', err);
        return res.status(500).send('Erro ao registrar usuário');
      }
      res.send('Registro bem-sucedido!');
    });
  });
});

app.post("/estrategias", (req, res) => {
  console.log("Rota POST /estrategias chamada"); 
  console.log("Dados recebidos:", req.body); 
  const { categoria, subcategoria, titulo, conteudo } = req.body;

  // Insere o tópico no banco de dados
  const sql = "INSERT INTO topicos (categoria, subcategoria, titulo, conteudo) VALUES (?, ?, ?, ?)";
  db.query(sql, [categoria, subcategoria, titulo, conteudo], (err, result) => {
    if (err) {
      console.error("Erro ao inserir no banco:", err);
      res.status(500).send("Erro ao criar o tópico.");
      return;
    }
    console.log("Tópico criado com sucesso!");
    res.redirect("/forum"); // Redireciona para a aba Comunidade
  });
});

app.get("/estrategias", (req, res) => {
  console.log("Rota /estrategias chamada"); 
  const sql = "SELECT * FROM topicos WHERE subcategoria = 'Estratégias para vitória no Guardião'";
  
  db.query(sql, (err, resultados) => {
    if (err) {
      console.error("Erro ao buscar tópicos:", err);
      res.status(500).send("Erro ao buscar tópicos.");
      return;
    }
    console.log("Resultados da consulta:", resultados); 
    res.render("estrategias", { topicos: resultados });
  });
});



app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
