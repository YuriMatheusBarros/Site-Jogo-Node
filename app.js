const express = require('express');
const { create } = require('express-handlebars'); // Mudança na importação
const app = express();
const path = require('path');

// Configuração do motor Handlebars
const exphbs = create({
  defaultLayout: 'main', // Layout padrão
  partialsDir: path.join(__dirname, 'views/partials') // Diretório de partials
});

app.engine('handlebars', exphbs.engine); // Passando a engine corretamente
app.set('view engine', 'handlebars');

// Definição do caminho para arquivos estáticos
app.use(express.static(path.join(__dirname, 'assets')));

// Rota para a home
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Página Inicial',
        promoTitle: 'Jogue com seu personagem favorito',
        promoDescription: 'Seja um campeão e ajude a salvar o mundo com seu herói favorito.',
        promoButton: 'Jogue agora!',
        promoImage: 'https://i.redd.it/ckp5gcuzv7581.gif',
        envTitle: 'Ajude o meio ambiente!',
        envDescription: 'Nosso jogo tem o propósito de engajar e promover ações que trazem mudanças positivas ao meio ambiente.',
        envButton: 'Saiba mais',
        envImage: 'https://static.escolakids.uol.com.br/2021/03/1-preservacao-meio-ambiente.jpg',
        updatesTitle: 'Confira as atualizações',
        updates: [
            {
                image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjDSnq2Mr5uzaFXrIz6Yyk1k_fpZhjYRprJsgxlkaArJ3H5ScreRxOF4PYqGQXjy76Sbt3Gh_WPNF3lmrVev7XWSJSPkC6-Yf0k7vl8IY6lbuUdwziUyv0S_O02QB6YhSFEglzvBe4BESad_xy7j4gyCSMt3vNVoOp3lf_yOf_QTJqrzLY65ulgKVpTLw/s1920/drova.jpg',
                title: 'Lobby da comunidade',
                description: 'Confira o novo lobby para os jogadores interagirem e fazer amigos.'
            },
            {
                image: 'https://t4.ftcdn.net/jpg/07/58/60/15/360_F_758601545_FYJWlmpvIGcPFSZSWBviXVN1LLvO3be9.jpg',
                title: 'Novos Mapas',
                description: 'Mapas atualizados com mais conteúdo.'
            },
            {
                image: 'https://preview.redd.it/fep8jsoojiy81.jpg?auto=webp&s=ed116aec6f8c3029f71c93685e86768045c060ad',
                title: 'Customização melhorada',
                description: 'Experimente seu herói personalizado.'
            }
        ],
        communityTitle: 'Entre para nossa comunidade e ajude a criar a história do nosso jogo!',
        communityDescription: 'Quer participar da construção de novos níveis e melhorar a experiência do nosso jogo?',
        communityButton: 'Saiba mais',
        communityImage: 'https://images.cointelegraph.com/cdn-cgi/image/format=auto,onerror=redirect,quality=90,width=1200/https://s3.cointelegraph.com/storage/uploads/view/4b1417840de8a47fc0b1c816b3f8b369.jpg',
    });
});

// Rota para o fórum
app.get('/forum', (req, res) => {
  res.render('forum');  // Renderiza o template 'forum.handlebars'
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
