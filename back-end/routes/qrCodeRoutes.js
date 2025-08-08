const express = require("express");
const router = express.Router();
const {
  verificarQRCode,
  deletarQRCode,
} = require("../controllers/qrCodeController");

router.post("/verificar", verificarQRCode);
router.delete("/excluir", deletarQRCode);

module.exports = router;
