// Alerta de sucesso
export function showSuccessAlert(title = "Sucesso!", text = "") {
  Swal.fire({
    icon: "success",
    title: title,
    text: text,
    confirmButtonColor: "#5218b1",
    timer: 2500,
    showConfirmButton: false,
  });
}

// Alerta de erro
export function showErrorAlert(title = "Erro!", text = "") {
  Swal.fire({
    icon: "error",
    title: title,
    text: text,
    confirmButtonColor: "#d33",
  });
}

// Alerta de informação
export function showInfoAlert(title = "Informação", text = "") {
  Swal.fire({
    icon: "info",
    title: title,
    text: text,
    confirmButtonColor: "#5218b1",
  });
}

// Alerta de confirmação com retorno de Promise
export async function showConfirmAlert(
  title = "Você tem certeza?",
  text = "Essa ação não pode ser desfeita."
) {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sim",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#5218b1",
    cancelButtonColor: "#aaa",
  });
}

// Alerta de carregamento
export function showLoadingAlert(title = "Aguarde...") {
  Swal.fire({
    title: title,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
}

export function showSerialNotFoundAlert(mensagem) {
  return Swal.fire({
    icon: "warning",
    title: "Serial não encontrado",
    html: mensagem,
    confirmButtonText: "Entendi",
    confirmButtonColor: "#5218b1",
  });
}

// Encerrar loading manualmente
export function closeLoadingAlert() {
  Swal.close();
}
