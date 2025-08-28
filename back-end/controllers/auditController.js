const db = require("../services/database");

// Verificar IMEI de auditoria
const verificarAuditoria = async (req, res) => {
  const { imei } = req.body;

  if (!imei) {
    return res.status(400).json({ mensagem: "IMEI não fornecido." });
  }

  try {
    const [rows] = await db.query(
      `SELECT * 
       FROM sistemabalanca.SISTEMA_AUDITORIA_processos 
       WHERE NS_1_IMEI = ? 
       ORDER BY ID DESC 
       LIMIT 1`,
      [imei]
    );

    if (rows.length === 0) {
      return res.json({
        encontrado: false,
        mensagem: `O IMEI ${imei} não possui registros de auditoria aprovados.`,
      });
    }

    return res.json({
      encontrado: true,
      dados: rows[0],
    });
  } catch (error) {
    console.error("Erro ao verificar auditoria:", error);
    return res.status(500).json({
      mensagem: "Erro interno ao verificar auditoria.",
    });
  }
};

// Excluir registro aprovado do IMEI
const deletarAuditoria = async (req, res) => {
  const { imei } = req.params;

  if (!imei) {
    return res
      .status(400)
      .json({ mensagem: "IMEI não fornecido para exclusão." });
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [resultado] = await connection.query(
      `DELETE FROM sistemabalanca.SISTEMA_AUDITORIA_processos
       WHERE NS_1_IMEI = ? AND STATUS_GERAL = 'APROVADO'
       ORDER BY ID DESC 
       LIMIT 1`,
      [imei]
    );

    if (resultado.affectedRows > 0) {
      await connection.commit();
      return res.status(200).json({
        sucesso: true,
        mensagem: `Registro de auditoria para o IMEI ${imei} excluído com sucesso.`,
      });
    } else {
      await connection.rollback();
      return res.status(404).json({
        sucesso: false,
        mensagem: `Nenhum registro aprovado encontrado para o IMEI ${imei}.`,
      });
    }
  } catch (error) {
    await connection.rollback();
    console.error("Erro ao excluir auditoria:", error);
    return res.status(500).json({
      mensagem: "Erro interno ao excluir auditoria.",
    });
  } finally {
    connection.release();
  }
};

module.exports = { verificarAuditoria, deletarAuditoria };
