const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Preencha todos os campos!' });
    }

    try {
        // Verificar se o usuário já existe
        const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Usuário já existe!' });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Salvar usuário no banco de dados
        await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Preencha todos os campos!' });
    }

    try {
        // Verificar se o usuário existe
        const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }

        // Verificar a senha
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Senha inválida!' });
        }

        // Gerar token JWT
        const token = jwt.sign({ id: user[0].id, username: user[0].username }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        res.json({ message: 'Login bem-sucedido!', token });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
};