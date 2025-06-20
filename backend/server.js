const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://<teu_user>:<tua_senha>@<cluster>.mongodb.net/api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Aluno = mongoose.model('Aluno', {
  nome: String,
  apelido: String,
  curso: String,
  anoCurricular: Number
});

app.get('/alunos', async (req, res) => {
  const alunos = await Aluno.find();
  res.json(alunos);
});

app.post('/alunos', async (req, res) => {
  const aluno = new Aluno(req.body);
  await aluno.save();
  res.status(201).json(aluno);
});

app.listen(3001, () => {
  console.log('API real a correr em http://localhost:3001');
});