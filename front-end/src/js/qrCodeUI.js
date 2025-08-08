export function showLoadingDots(resultadoMsg) {
  resultadoMsg.innerHTML = `
    <span class="loading-dots-qr-requests">
      <span>.</span><span>.</span><span>.</span>
    </span>
  `;
  resultadoMsg.style.opacity = "0";
  setTimeout(() => {
    resultadoMsg.style.opacity = "1";
  }, 50);
}

export function clearResultadoMsg(resultadoMsg) {
  resultadoMsg.textContent = "";
}

export function showSerialNotFound(valor) {
  Swal.fire({
    icon: "warning",
    title: "Serial não encontrado",
    html: `O serial <strong>${valor}</strong> não possui registro no banco de dados SAP.`,
    confirmButtonText: "Entendi",
    confirmButtonColor: "#5218b1",
  });
}

export function createConfirmCard(valor, excluirQRCode) {
  const confirmCard = document.createElement("div");
  confirmCard.className = "confirm-card";
  confirmCard.innerHTML = `
    <p>Serial <strong>${valor}</strong> possui registro.</p>
    <div class="trash-icon-wrapper" title="Excluir registro">
      <i class="bi bi-trash3-fill trash-icon"></i>
    </div>
  `;

  confirmCard.style.opacity = 0;
  void confirmCard.offsetWidth;
  confirmCard.style.opacity = 1;

  confirmCard.querySelector(".trash-icon").onclick = () => {
    Swal.fire({
      title: `Deseja realmente excluir o serial <strong>${valor}</strong>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      confirmButtonColor: "#5218b1",
      cancelButtonText: "Não",
      reverseButtons: true,
      focusCancel: true,
      customClass: {
        confirmButton: "btn btn-confirm-sim",
        cancelButton: "btn btn-confirm-nao",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const exclusao = await excluirQRCode(valor);
        confirmCard.remove();

        Swal.fire({
          title: "Excluído!",
          text: "O registro foi removido com sucesso.",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    });
  };

  return confirmCard;
}
