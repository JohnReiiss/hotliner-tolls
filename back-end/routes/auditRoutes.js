const express = require("express");
const router = express.Router();
const {
  verificarAuditoria,
  deletarAuditoria,
} = require("../controllers/auditController");

router.post("/verificar", verificarAuditoria);
router.delete("/excluir/:imei", deletarAuditoria);

module.exports = router;
