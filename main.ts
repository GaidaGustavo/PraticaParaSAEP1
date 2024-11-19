import express from "express";
import pgp from "pg-promise";

const app = express();
app.use(express.json());

const nomebanco = 'postgres';
const usuario = 'postgres';
const senha = '123';
const host = 'localhost';
const porta = 5432

const conexao = pgp()({
    host: host,
    port: porta,
    database: nomebanco,
    user: usuario,
    password: senha
})

app.all('*', function(req, res, next){
    res.header('Access-Control-Allow-Origin','*');
    next();
});

app.get('/usuarios', async (req, res) => {
    const usuarios = await conexao.query('select * from usuarios');
    res.json(usuarios);
});

app.put('/usuarios', async (req, res) => {
    await conexao.query('update usuarios set nome = $1, status = $2 where id = $3',
        [req.body.nome, req.body.status, req.body.id]
    );
    res.json({mesage: 'atualizou'});
});

app.post('/usuarios', async (req, res) => {
    await conexao.query('insert into usuarios (nome, status) values ($1, $2)'
        [req.body.nome, req.body.status]
    );
    res.json({mesage: 'inseriu'});
});

app.listen(5000, () =>{
    console.log('Iniciou')
})