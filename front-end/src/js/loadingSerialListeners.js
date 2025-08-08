import {
  mostrarDotsComDelay as showLoadingDots,
  criarCardSerial,
  showSerialNotFound,
} from "./serialCodeUI.js";

import {
  buscarSerial as verificarSerial,
  atualizarSerial as reimprimirSerial,
} from "./apiService.js";

export function loadingSerialListeners(button, input, dynamicCard) {
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
        "Por favor, escaneie ou digite um número de série válido.";
      return;
    }

    resultadoMsg.textContent = "";
    await showLoadingDots(resultadoMsg);

    try {
      const resposta = await verificarSerial(valor);

      if (!resposta.encontrado) {
        resultadoMsg.textContent = "";
        await showSerialNotFound(resposta.mensagem);
        return;
      }

      resultadoMsg.textContent = "";
      const dados = resposta.dados;

      const card = criarCardSerial(valor, dados, async (novaOS, novoStatus) => {
        try {
          const resultado = await reimprimirSerial(valor, novaOS, novoStatus);

          if (resultado && resultado.sucesso === false) {
            throw new Error(resultado.mensagem);
          }

          return resultado;
        } catch (error) {
          resultadoMsg.textContent = "";
          console.error("Erro ao reimprimir serial:", error);
          throw error;
        }
      });

      const prevCard = dynamicCard.querySelector(".serial-card");
      if (prevCard) prevCard.remove();

      dynamicCard.querySelector(".card-text-content").appendChild(card);
    } catch (error) {
      resultadoMsg.textContent = "";
      console.error("Erro ao buscar serial:", error);
      await showSerialNotFound(
        error.message || "Erro ao buscar serial. Tente novamente."
      );
    }
  };
}
