require('dotenv').config();
const express = require('express');
const { create } = require('express-handlebars');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Configuração do Handlebars
const exphbs = create({
  defaultLayout: 'main',
  partialsDir: path.join(__dirname, 'views/partials')
});

app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');

// Conexão com o banco de dados MySQL usando .env
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Teste de conexão com o banco
async function testDB() {
  try {
    const [rows] = await pool.query('SELECT NOW() AS now');
    console.log('✅ Conectado ao banco de dados!', rows);
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco de dados:', error);
  }
}
testDB();

// Configuração de arquivos estáticos e middleware
app.use(express.static(path.join(__dirname, './assets')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public")); 

// Rotas de renderização
app.get('/', (req, res) => res.render('home'));
app.get('/register', (req, res) => res.render('register', { title: 'Registrar', description: 'Crie uma conta para acessar o site.' }));
app.get('/login', (req, res) => res.render('login', { title: 'Login', description: 'Faça login para acessar sua conta.' }));
app.get('/informacoes', (req, res) => res.render('informacoes'));
app.get('/ajudar', (req, res) => res.render('ajudar'));
app.get('/noticias', (req, res) => res.render('noticias'));
app.get('/forum', (req, res) => res.render('forum'));
app.get('/conta', (req, res) => res.render('conta'));
app.get('/configuracoes', (req, res) => res.render('configuracoes'));
app.get('/suporte', (req, res) => res.render('suporte'));
app.get('/loja', (req, res) => res.render('loja'));
app.get('/baixe', (req, res) => res.render('baixe'));
app.get('/topico', (req, res) => res.render('topico'));

// Lógica de login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).send('Por favor, preencha todos os campos.');

  try {
    const [result] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (result.length === 0) return res.status(400).send('Credenciais inválidas');

    const user = result[0];
    const isPasswordValid = await bcrypt.compare(senha, user.password);
    if (!isPasswordValid) return res.status(400).send('Credenciais inválidas');

    res.redirect('/');
  } catch (err) {
    console.error('Erro no banco de dados:', err);
    res.status(500).send('Erro no banco de dados');
  }
});

// Lógica de registro
app.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;
  const username = nome;
  const password = senha;

  if (!username || !email || !password) return res.status(400).send('Preencha todos os campos.');

  try {
    const [result] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (result.length > 0) return res.status(400).send('Usuário já existe');

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

    res.send('Registro bem-sucedido!');
  } catch (err) {
    console.error('Erro ao registrar usuário:', err);
    res.status(500).send('Erro ao registrar usuário');
  }
});

// Criar um tópico no fórum
app.post('/estrategias', async (req, res) => {
  const { categoria, subcategoria, titulo, conteudo } = req.body;

  try {
    await pool.query("INSERT INTO topicos (categoria, subcategoria, titulo, conteudo) VALUES (?, ?, ?, ?)", [categoria, subcategoria, titulo, conteudo]);
    console.log("Tópico criado com sucesso!");
    res.redirect("/forum");
  } catch (err) {
    console.error("Erro ao inserir no banco:", err);
    res.status(500).send("Erro ao criar o tópico.");
  }
});

// Buscar tópicos do fórum
app.get("/estrategias", async (req, res) => {
  try {
    const [resultados] = await pool.query("SELECT * FROM topicos WHERE subcategoria = 'Estratégias para vitória no Guardião'");
    res.render("estrategias", { topicos: resultados });
  } catch (err) {
    console.error("Erro ao buscar tópicos:", err);
    res.status(500).send("Erro ao buscar tópicos.");
  }
});

// Iniciar servidor
app.listen(3000, () => console.log('🚀 Servidor rodando na porta 3000'));
