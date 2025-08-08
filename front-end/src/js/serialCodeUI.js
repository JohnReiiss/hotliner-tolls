import { showSerialNotFoundAlert, showSuccessAlert } from "./dynamicAlerts.js";

export function mostrarDotsComDelay(container) {
  container.innerHTML = `
    <span class="loading-dots-serial-requests">
      <span>.</span><span>.</span><span>.</span>
    </span>
  `;
  container.style.opacity = "0";
  setTimeout(() => {
    container.style.opacity = "1";
  }, 50);

  return new Promise((resolve) => setTimeout(resolve, 3000));
}

export function criarCardSerial(valorSerial, dadosSerial, onReimprimir) {
  const statusIcon =
    dadosSerial.STATUS === "LIVRE"
      ? '<i class="bi bi-exclamation-circle-fill" style="color:green;"></i>'
      : '<i class="bi bi-exclamation-circle-fill" style="color:red;"></i>';

  const html = `
    <div class="serial-card serial-card-animate">
      <div class="serial-card-content serial-card-content-animate">
        <div class="info-line info-group">
          <span class="info-item">
            <i class="bi bi-upc"></i>
            <strong>SERIAL:</strong> ${valorSerial}
          </span>
          <span class="info-item">
            <i class="bi bi-border-width"></i>
            <strong>OS:</strong> ${dadosSerial.OS}
          </span>
          <span class="info-item ${
            dadosSerial.STATUS === "LIVRE" ? "status-livre" : ""
          }">
            ${statusIcon}
            <strong>Status:</strong> ${dadosSerial.STATUS}
          </span>
        </div>
      </div>
      <div class="serial-action-btn" title="Reimprimir serial">
        <i class="bi bi-printer-fill"></i>
      </div>
    </div>
  `;

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const cardElement = tempDiv.firstElementChild;

  const iconReimprimir = cardElement.querySelector(".serial-action-btn");
  iconReimprimir.addEventListener("click", () => {
    criarModalReimpressao(valorSerial, onReimprimir, cardElement);
  });

  return cardElement;
}

export async function criarModalReimpressao(
  valorSerial,
  callback,
  confirmCard
) {
  const { value: formValues, isConfirmed } = await Swal.fire({
    title: "Reimprimir serial",
    html: `
      <p><strong>Serial:</strong> ${valorSerial}</p>
      <input id="nova-os" class="swal2-input" maxlength="7" placeholder="Digite nova OS" />
      <div style="display: flex; justify-content: center; gap: 20px; margin-top: 15px;">
        <label style="display: flex; align-items: center; gap: 5px;">
          <input type="radio" name="novo-status" value="LIVRE" checked /> LIVRE
        </label>
        <label style="display: flex; align-items: center; gap: 5px;">
          <input type="radio" name="novo-status" value="CONSUMIDO" /> CONSUMIDO
        </label>
      </div>
    `,
    focusConfirm: false,
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
    showCancelButton: true,
    confirmButtonColor: "#5218b1",
    cancelButtonColor: "#d33",
    preConfirm: () => {
      const novaOS = document.getElementById("nova-os").value.trim();
      const novoStatus = document.querySelector(
        "input[name='novo-status']:checked"
      )?.value;

      if (!novaOS || novaOS.length !== 7) {
        Swal.showValidationMessage(
          "A nova OS deve conter exatamente 7 dígitos."
        );
        return false;
      }

      return { novaOS, novoStatus };
    },
  });

  if (isConfirmed && formValues) {
    try {
      const resultado = await callback(
        formValues.novaOS,
        formValues.novoStatus
      );

      if (resultado && resultado.sucesso === false) {
        throw new Error(resultado.mensagem || "Erro ao atualizar serial");
      }

      await Swal.fire({
        icon: "success",
        title: "Reimpressão de serial habilitada!",
        html: `
          <p><strong>Nova OS:</strong> ${formValues.novaOS}</p>
          <p><strong>Novo Status:</strong> ${formValues.novoStatus}</p>
        `,
        confirmButtonText: "Fechar",
      });

      confirmCard.remove();
      showSuccessAlert("Atualizado!", "O registro foi alterado com sucesso.");
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Erro",
        text:
          error.message ||
          "Ocorreu um erro ao atualizar o serial. Tente novamente.",
      });
    }
  }
}

export async function showSerialNotFound(mensagemBackend) {
  return await showSerialNotFoundAlert(mensagemBackend);
}
