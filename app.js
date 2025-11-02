const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const PORT = process.env.PORT || 8081;

const Produtos = require("./models/Produtos.js");
const User = require("./models/Users.js");
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.patch("/atualizar", (req, res) => {
  Produtos.update(
    {
      nome: req.body.nome,
      preco: req.body.preco,
      descricao: req.body.descricao,
    },
    { where: { id: req.body.id } }
  )
    .then(() => {
      res.send("Produto atualizado com sucesso");
    })
    .catch((error) => {
      res.send("Deu algo de errado" + error);
    });
});

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

app.post("/cadastrouaser", async (req, res) => {
  const email = req.body.email;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("error no user regsiter", error);
    res.status(500).json({ error: "Error ao registrar usuário" });
  }
});

app.delete("/delete/:id", (req, res) => {
  Produtos.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.send("Produto deletado com sucesso!");
    })
    .catch((error) => res.send("Deu algo errado"));
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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "senha está incorreta" });
    }

    res.json({
      message: "Login realizado com sucesso!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});

app.listen(PORT, () => {
  console.log("o servidor está rodando na porta" + PORT);
});
