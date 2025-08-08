const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const db = require("../services/database");

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.usuario.id;

    const [rows] = await db.query(
      "SELECT NOME, MATRICULA, PATENTS FROM USUARIOS_HOTLINER_TOOLS WHERE ID = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    // console.log("Usuario retornado do banco:", rows[0]);

    return res.json(rows[0]);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    if (!res.headersSent) {
      return res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
  }
});

module.exports = router;
