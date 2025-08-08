const db = require("../services/database");

const buscarSerial = async (req, res) => {
  const { serial } = req.body;

  if (!serial) {
    return res.status(400).json({ mensagem: "Serial não fornecido." });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM CONSUMO_OS WHERE VALOR_CAMPO = ?",
      [serial]
    );

    if (rows.length === 0) {
      return res.json({
        encontrado: false,
        mensagem: `O serial ${serial} não foi encontrado no banco de dados SAP.`,
      });
    }

    return res.json({
      encontrado: true,
      dados: rows[0],
    });
  } catch (error) {
    console.error("Erro ao buscar serial:", error);
    return res.status(500).json({
      mensagem: "Erro interno ao buscar serial.",
    });
  }
};

const verificarSerial = async (req, res) => {
  const { serial } = req.body;

  if (!serial) {
    return res.status(400).json({ mensagem: "Serial não fornecido." });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM CONSUMO_OS WHERE VALOR_CAMPO = ?",
      [serial]
    );

    if (rows.length === 0) {
      return res.json({
        encontrado: false,
        mensagem: `O serial ${serial} não existe no banco de dados SAP.`,
      });
    }

    return res.json({
      encontrado: true,
      dados: rows[0],
    });
  } catch (error) {
    console.error("Erro ao verificar serial:", error);
    return res.status(500).json({
      mensagem: "Erro interno ao verificar serial.",
    });
  }
};

const atualizarSerial = async (req, res) => {
  const { serial, novaOS, novoStatus } = req.body;

  if (!serial || !novaOS || !novoStatus) {
    return res.status(400).json({
      mensagem: "Serial, nova OS ou novo status não fornecidos.",
    });
  }

  try {
    const [resultado] = await db.query(
      "UPDATE CONSUMO_OS SET OS = ?, STATUS = ? WHERE VALOR_CAMPO = ?",
      [novaOS, novoStatus, serial]
    );

    if (resultado.affectedRows > 0) {
      return res.status(200).json({
        sucesso: true,
        mensagem: "Serial atualizado com sucesso.",
      });
    } else {
      return res.status(404).json({
        sucesso: false,
        mensagem: "Serial não encontrado para atualização.",
      });
    }
  } catch (error) {
    console.error("Erro ao atualizar serial:", error);
    return res.status(500).json({
      mensagem: "Erro interno ao atualizar serial.",
    });
  }
};

module.exports = {
  buscarSerial,
  verificarSerial,
  atualizarSerial,
};
