import {
  showLoadingDots,
  clearResultadoMsg,
  showSerialNotFound,
  createConfirmCard,
} from "./qrCodeUI.js";
import { verificarAuditoria, excluirAuditoria } from "./apiService.js";

export function loadingAuditListeners(button, input, dynamicCard) {
  let resultadoMsg = dynamicCard.querySelector(".resultado-msg");
  if (!resultadoMsg) {
    resultadoMsg = document.createElement("p");
    resultadoMsg.classList.add("resultado-msg");
    dynamicCard.querySelector(".card-text-content").appendChild(resultadoMsg);
  }

  button.onclick = async () => {
    const valor = input.value.trim();
    if (!valor) {
      resultadoMsg.textContent =
        "Por favor, escaneie ou digite um IMEI válido.";
      return;
    }

    const oldCard = dynamicCard.querySelector(".confirm-card");
    if (oldCard) oldCard.remove();
    const oldModal = document.querySelector(".confirm-modal");
    if (oldModal) oldModal.remove();

    showLoadingDots(resultadoMsg);

    const resposta = await verificarAuditoria(valor);

    if (!resposta.encontrado) {
      clearResultadoMsg(resultadoMsg);
      showSerialNotFound(valor);
      return;
    }

    clearResultadoMsg(resultadoMsg);

    const confirmCard = createConfirmCard(valor, async (imei) => {
      const excluirResposta = await excluirAuditoria(imei);
      if (excluirResposta.sucesso) {
        input.value = "";
      } else {
        alert(excluirResposta.mensagem || "Erro ao excluir auditoria.");
      }
    });

    dynamicCard.querySelector(".card-text-content").appendChild(confirmCard);
  };
}
