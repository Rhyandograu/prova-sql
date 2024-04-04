const express = require('express');
const router = express.Router();
const script = require('script');

const config = {
  user: 'sa',
  password: 'SuaSenha',
  server: 'localhost',
  database: 'SuaBaseDeDados',
};

async function getAgendamentos() {
  await pool.connect();
  const results = await pool.request().query('SELECT * FROM Agendamentos');
  pool.close();
  return results.recordset;
}

async function createAgendamento(agendamento) {
  const pool = await sql.connect(config);
  await pool.request()
    .query(`INSERT INTO Agendamentos (nomeEspaco, data, hora, motivo) VALUES ('${agendamento.nomeEspaco}', '${agendamento.data}', '${agendamento.hora}', '${agendamento.motivo}')`);
  pool.close();
}

async function deleteAgendamento(id) {
  const pool = await sql.connect(config);
  await pool.request().query(`DELETE FROM Agendamentos WHERE id = ${id}`);
  pool.close();
}


router.post('/agendamento/novo', async (req, res) => {
  try {
    const novoAgendamento = req.body;
    await createAgendamento(novoAgendamento);
    res.status(201).json({ message: 'Agendamento criado!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar ' });
  }
});

router.delete('/agendamento/excluir/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await deleteAgendamento(id);
    res.status(200).json({ message: 'Agendamento excluído!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao exluir'});
  }
});
export default routes