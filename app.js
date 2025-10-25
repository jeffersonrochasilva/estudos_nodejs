const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const Produtos = require("./models/Produtos.js");

app.use(
  cors({
    origin: "http://localhost:5173", // endereço do seu front Vue
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send("hello world! O projeto do backend está rodando com sucesso");
// });

app.post("/cadastro", (req, res) => {
  Produtos.create({
    nome: req.body.nome,
    preco: req.body.preco,
    descricao: req.body.descricao,
  })
    .then(() => {
      res.send("Parabéns! Sua gravaçoã fi uom sucesso");
    })
    .catch((error) => {
      res.send("Infelismente deu erro, tente outra vez!" + error);
    });
});

app.get("/", (req, res) => {
  Produtos.findAll()
    .then((produtos) => {
      res.send(produtos);
    })
    .catch((error) => {
      console.log("deu erro al ter acesso a todos os produtos", error);
    });
});

app.listen(8081, () => {
  console.log("hello world");
});
