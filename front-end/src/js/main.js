import { renderCard } from "../js/dynamicCards.js";
import { buscarUsuarioLogado } from "./apiService.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-qrcodes").addEventListener("click", () => {
    renderCard(
      "QR CODES",
      "Sistema para reimpressão de qr codes.",
      "bi-qr-code-scan",
      "qrcode"
    );
  });

  document.getElementById("btn-seriais").addEventListener("click", () => {
    renderCard(
      "SERIAIS",
      "Sistema para reimpressão de seriais de produtos.",
      "bi-upc-scan",
      "serial"
    );
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const perfilCollapse = document.getElementById("perfil-collapse");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const usuario = await buscarUsuarioLogado(token);

  if (usuario) {
    perfilCollapse.innerHTML = `
      <p><i class="bi bi-person-fill"></i> BEM VINDO! ${usuario.NOME}</p>
      <p><i class="bi bi-tags-fill"></i> NÍVEL DE ACESSO: ${usuario.PATENTS}</p>
      <p><i class="bi bi-database-fill"></i> MATRÍCULA: ${usuario.MATRICULA}</p>
    `;
  } else {
    perfilCollapse.innerHTML = `
      <p><i class="bi bi-person-fill"></i> Usuário não encontrado</p>
    `;
  }
});
