document.addEventListener("DOMContentLoaded", () => {
  const formRegister = document.querySelector(".form-container.sign-up form");

  formRegister.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = formRegister.querySelector('input[placeholder="Nome"]').value;
    const matricula = formRegister.querySelector(
      'input[placeholder="matrícula"]'
    ).value;
    const senha = formRegister.querySelector(
      'input[placeholder="Senha"]'
    ).value;

    try {
      const resposta = await fetch("http://localhost:3000/api/login/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, matricula, senha }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Cadastro realizado com sucesso!",
        }).then(() => {
          document.getElementById("login").click();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro ao cadastrar",
          text: dados.mensagem || "Verifique os dados inseridos.",
        });
      }
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      Swal.fire({
        icon: "error",
        title: "Erro de conexão",
        text: "Erro ao tentar cadastrar. Verifique sua conexão.",
      });
    }
  });
});
