require('dotenv').config();
const express = require('express');
const { create } = require('express-handlebars');
const { Pool } = require('pg'); // Troca de mysql2 para pg
const bcrypt = require('bcryptjs');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

app.use(express.static('public'));

// Configuração do motor Handlebars
const exphbs = create({
  defaultLayout: 'main',
  partialsDir: path.join(__dirname, 'views/partials')
});

app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');

// Conexão com o banco de dados PostgreSQL
const db = new Pool({
  connectionString: process.env.DATABASE_URL, // Usar URL completa do PostgreSQL
  ssl: {
    rejectUnauthorized: false // Necessário para Railway
  }
});

// Verifica a conexão
db.connect()
  .then(() => console.log('Conectado ao banco de dados PostgreSQL'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

// Middleware
app.use(express.static(path.join(__dirname, './assets')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rotas
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/register', (req, res) => {
  res.render('register', {
    title: 'Registrar',
    description: 'Crie uma conta para acessar o site.'
  });
});

app.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login',
    description: 'Faça login para acessar sua conta.'
  });
});

app.get('/informacoes', (req, res) => {
  res.render('informacoes');
});

app.get('/ajudar', (req, res) => {
  res.render('ajudar');
});

app.get('/noticias', (req, res) => {
  res.render('noticias');
});

app.get('/forum', (req, res) => {
  res.render('forum');
});

app.get('/conta', (req, res) => {
  res.render('conta');
});

app.get('/configuracoes', (req, res) => {
  res.render('configuracoes');
});

app.get('/suporte', (req, res) => {
  res.render('suporte');
});

app.get('/loja', (req, res) => {
  res.render('loja');
});

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

  db.query('SELECT * FROM users WHERE email = $1', [email])
    .then(async result => {
      if (result.rows.length === 0) {
        return res.status(400).send('Credenciais inválidas');
      }

      const user = result.rows[0];
      const isPasswordValid = await bcrypt.compare(senha, user.password);
      if (!isPasswordValid) {
        return res.status(400).send('Credenciais inválidas');
      }

      res.redirect('/?login=success');
    })
    .catch(err => {
      console.error('Erro ao consultar banco de dados:', err);
      res.status(500).send('Erro no banco de dados');
    });
});

app.post('/register', (req, res) => {
  console.log("Dados recebidos no cadastro:", req.body);
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send('Por favor, preencha todos os campos.');
  }

  db.query('SELECT * FROM users WHERE username = $1', [username])
    .then(async result => {
      if (result.rows.length > 0) {
        return res.status(400).send('Usuário já existe');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', 
        [username, email, hashedPassword])
        .then(() => {
          res.send('Registro bem-sucedido!');
        })
        .catch(err => {
          console.error('Erro ao registrar usuário:', err);
          res.status(500).send('Erro ao registrar usuário');
        });
    })
    .catch(err => {
      console.error('Erro ao consultar banco de dados:', err);
      res.status(500).send('Erro no banco de dados');
    });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

app.use('/uploads', express.static('uploads'));

// Rota POST para estratégias
app.post("/estrategias", upload.single("anexo"), async (req, res) => {
  const { categoria, subcategoria, titulo, conteudo, tipoAnexo } = req.body;
  const anexo = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO topicos (categoria, subcategoria, titulo, conteudo, anexo, tipo_anexo)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;

  try {
    await db.query(sql, [categoria, subcategoria, titulo, conteudo, anexo, tipoAnexo]);
    res.redirect("/forum");
  } catch (err) {
    console.error("Erro ao inserir no banco:", err.message);
    res.status(500).send("Erro ao criar o tópico.");
  }
});

// Rota GET para estratégias
app.get("/estrategias", (req, res) => {
  const sql = "SELECT * FROM topicos WHERE subcategoria = 'Estratégias para vitória no Guardião'";
  db.query(sql)
    .then(result => {
      res.render("estrategias", { topicos: result.rows });
    })
    .catch(err => {
      console.error("Erro ao buscar tópicos:", err);
      res.status(500).send("Erro ao buscar tópicos.");
    });
});

// Inicialização do servidor
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
