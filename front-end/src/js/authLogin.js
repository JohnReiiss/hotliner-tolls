document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.querySelector(".form-container.sign-in form");

  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const matricula = formLogin.querySelector(
      'input[placeholder="matrícula"]'
    ).value;
    const senha = formLogin.querySelector('input[placeholder="Senha"]').value;

    if (!matricula || !senha) {
      Swal.fire({
        icon: "warning",
        title: "Campos obrigatórios",
        text: "Por favor, preencha todos os campos.",
      });
      return;
    }

    try {
      const resposta = await fetch("http://localhost:3000/api/login/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ matricula, senha }),
      });

      if (!resposta.ok) {
        const erro = await resposta.text();
        throw new Error(erro || "Erro ao fazer login.");
      }

      const dados = await resposta.json();
      localStorage.setItem("token", dados.token);
      window.location.href = "index.html";
    } catch (err) {
      console.error("Erro ao fazer login:", err.message);
      Swal.fire({
        icon: "error",
        title: "Erro ao fazer login",
        text: err.message || "Falha desconhecida.",
      });
    }
  });
});
