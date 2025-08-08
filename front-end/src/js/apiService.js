const API_BASE_URL = "http://localhost:3000/api";

export async function verificarQRCode(serial) {
  try {
    const response = await fetch(`${API_BASE_URL}/qrcode/verificar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ serial }),
    });

    if (!response.ok) throw new Error("Erro na verificação do QR Code");
    return await response.json();
  } catch (error) {
    console.error("Erro ao verificar QR Code:", error);
    return { encontrado: false, mensagem: "Erro ao verificar QR Code." };
  }
}

export async function excluirQRCode(serial) {
  try {
    const response = await fetch(`${API_BASE_URL}/qrcode/excluir`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ serial }),
    });

    if (!response.ok) throw new Error("Erro ao excluir QR Code");
    return await response.json();
  } catch (error) {
    console.error("Erro ao excluir QR Code:", error);
    return { sucesso: false, mensagem: "Erro ao excluir QR Code." };
  }
}

export async function buscarSerial(serial) {
  try {
    const response = await fetch(`${API_BASE_URL}/serial/buscar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ serial }),
    });

    if (!response.ok) throw new Error("Erro na verificação do serial");
    return await response.json();
  } catch (error) {
    console.error("Erro ao verificar serial:", error);
    return { encontrado: false, mensagem: "Erro ao verificar serial." };
  }
}

export async function atualizarSerial(serial, novaOS, novoStatus) {
  try {
    const response = await fetch(`${API_BASE_URL}/serial/atualizar`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serial, novaOS, novoStatus }),
    });

    if (!response.ok) {
      const erro = await response.text();
      throw new Error(erro || "Erro ao atualizar serial.");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar serial:", error);
    return { sucesso: false, mensagem: "Erro ao atualizar serial." };
  }
}

export async function buscarUsuarioLogado(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Erro ao buscar dados do usuário");

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar usuário logado:", error);
    return null;
  }
}
