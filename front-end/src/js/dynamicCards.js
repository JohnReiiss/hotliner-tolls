import { loadingQRListeners } from "./loadingQrListeners.js";
import { loadingSerialListeners } from "./loadingSerialListeners.js";

document.addEventListener("DOMContentLoaded", function () {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";
  mainContent.style.display = "block";

  let dynamicCard = document.querySelector(".card-dinamico");
  if (!dynamicCard) {
    dynamicCard = document.createElement("div");
    dynamicCard.className = "card-dinamico";
    dynamicCard.style.display = "none";
    document.body.appendChild(dynamicCard);
  }

  const updateCardPosition = () => {
    const sidebar = document.querySelector(".sidebar");
    dynamicCard.style.left = sidebar.classList.contains("collapsed")
      ? "100px"
      : "240px";
  };

  new MutationObserver(updateCardPosition).observe(
    document.querySelector(".sidebar"),
    { attributes: true, attributeFilter: ["class"] }
  );

  updateCardPosition();

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

  document.getElementById("btn-audit").addEventListener("click", () => {
    renderCard(
      "AUDITORIA",
      "Sistema para liberar novas auditorias de produtos.",
      "bi-database-fill-gear",
      "audit"
    );
  });

  mainContent.innerHTML = "";
});

export function renderCard(title, description, iconClass, inputType) {
  let dynamicCard = document.querySelector(".card-dinamico");
  if (!dynamicCard) {
    dynamicCard = document.createElement("div");
    dynamicCard.className = "card-dinamico";
    dynamicCard.style.display = "none";
    document.body.appendChild(dynamicCard);
  }

  const mainContent = document.getElementById("main-content");

  dynamicCard.innerHTML = `
    <div class="card-content">
      <div class="card-icon"><i class="bi ${iconClass}"></i></div>
      <div class="card-text-content">
        <h2>${title}</h2>
        <p>${description}</p>
        <input type="text" class="scan-input" placeholder="${
          inputType === "qrcode"
            ? "Digite ou escaneie o serial do QR Code"
            : inputType === "audit"
            ? "Digite ou escaneie o imei do produto para liberar a auditoria"
            : "Digite ou escaneie o número de série"
        }">
        <button class="scan-button">Processar</button>
      </div>
    </div>
  `;

  dynamicCard.style.display = "block";

  setTimeout(() => {
    const input = dynamicCard.querySelector(".scan-input");
    const button = dynamicCard.querySelector(".scan-button");

    if (inputType === "qrcode") {
      loadingQRListeners(button, input, dynamicCard);
    } else if (inputType === "audit") {
      import("./loadingAuditListener.js").then(({ loadingAuditListeners }) => {
        loadingAuditListeners(button, input, dynamicCard);
      });
    } else {
      loadingSerialListeners(button, input, dynamicCard);
    }
  }, 100);

  const sidebar = document.querySelector(".sidebar");
  dynamicCard.style.left = sidebar.classList.contains("collapsed")
    ? "100px"
    : "240px";

  mainContent.innerHTML = "";
}
