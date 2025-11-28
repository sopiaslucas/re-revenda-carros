const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('public'));
 
let veiculos = [];
 
// rota para salvar veículo
app.post('/salvar', (req, res) => {
    const veiculoData = req.body;
    veiculos.push(veiculoData);
    console.log('Veículo cadastrado com sucesso!', veiculoData);
    res.send('Veículo salvo com sucesso!');
});
 
// rota para listar todos os veículos
app.get('/veiculos', (req, res) => {
    res.json(veiculos);
});
 
// inicia o servidor na porta 5000
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://0.0.0.0:${port}`);
});
 
