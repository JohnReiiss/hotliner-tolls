const db = require("../services/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { matricula, senha } = req.body;

  if (!matricula || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Matrícula e senha são obrigatórias." });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM USUARIOS_HOTLINER_TOOLS WHERE MATRICULA = ?",
      [matricula]
    );

    if (rows.length === 0) {
      return res.status(401).json({ mensagem: "Usuário não encontrado." });
    }

    const usuario = rows[0];
    const senhaValida = await bcrypt.compare(senha, usuario.SENHA);

    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Senha incorreta." });
    }

    const token = jwt.sign(
      { id: usuario.ID, matricula: usuario.MATRICULA },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
};

const register = async (req, res) => {
  const { nome, matricula, senha } = req.body;

  if (!nome || !matricula || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Nome, matrícula e senha são obrigatórios." });
  }

  try {
    const [existente] = await db.query(
      "SELECT * FROM USUARIOS_HOTLINER_TOOLS WHERE MATRICULA = ?",
      [matricula]
    );

    if (existente.length > 0) {
      return res.status(409).json({ mensagem: "Matrícula já cadastrada." });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await db.query(
      "INSERT INTO USUARIOS_HOTLINER_TOOLS (NOME, MATRICULA, SENHA) VALUES (?, ?, ?)",
      [nome, matricula, senhaCriptografada]
    );

    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ mensagem: "Erro interno ao cadastrar usuário." });
  }
};

module.exports = { login, register };
