const express = require("express");
const db = require("./models/ConnectDatabase");
const routes = require("./routes")

const app = express();
const port = 3000;

// Conexão com o banco de dados
db.testConnection().catch((err) => {
  
});

app.use(express.json());

app.use(routes)


// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em: http://localhost:${port}`);
});
