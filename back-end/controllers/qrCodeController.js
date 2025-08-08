const db = require("../services/database");

const verificarQRCode = async (req, res) => {
  const { serial } = req.body;

  if (!serial) {
    return res.status(400).json({ mensagem: "Serial não fornecido." });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM REGISTRO_SAP WHERE SAP_00 = ?",
      [serial]
    );

    if (rows.length === 0) {
      return res.json({
        encontrado: false,
        mensagem: `O serial ${serial} não possui registro no banco de dados SAP.`,
      });
    }

    return res.json({
      encontrado: true,
      dados: rows[0],
    });
  } catch (error) {
    console.error("Erro ao verificar QR Code:", error);
    return res.status(500).json({
      mensagem: "Erro interno ao verificar QR Code.",
    });
  }
};

const deletarQRCode = async (req, res) => {
  const { serial } = req.body;

  if (!serial) {
    return res
      .status(400)
      .json({ mensagem: "Serial não fornecido para exclusão." });
  }

  try {
    const [resultado] = await db.query(
      "DELETE FROM REGISTRO_SAP WHERE SAP_00 = ?",
      [serial]
    );

    if (resultado.affectedRows > 0) {
      return res.status(200).json({
        sucesso: true,
        mensagem: "QR Code excluído com sucesso.",
      });
    } else {
      return res.status(404).json({
        sucesso: false,
        mensagem: "QR Code não encontrado para exclusão.",
      });
    }
  } catch (error) {
    console.error("Erro ao excluir QR Code:", error);
    return res.status(500).json({
      mensagem: "Erro interno ao excluir QR Code.",
    });
  }
};

module.exports = { verificarQRCode, deletarQRCode };
