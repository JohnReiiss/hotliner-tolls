const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const qrCodeRoutes = require("./routes/qrCodeRoutes");
const serialRoutes = require("./routes/serialRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const auditRoutes = require("./routes/auditRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/qrcode", qrCodeRoutes);
app.use("/api/serial", serialRoutes);
app.use("/api/login", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/audit", auditRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
