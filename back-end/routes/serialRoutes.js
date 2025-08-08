const express = require("express");
const router = express.Router();
const {
  buscarSerial,
  verificarSerial,
  atualizarSerial,
} = require("../controllers/serialController");

router.post("/buscar", buscarSerial);
router.post("/verificar", verificarSerial);
router.put("/atualizar", atualizarSerial);

module.exports = router;
