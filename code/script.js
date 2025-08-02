function gerarRecibo() {
  const valor = document.getElementById("valor").value;
  const cliente = document.getElementById("cliente").value;
  const servico = document.getElementById("servico").value;

  if (!valor || !cliente || !servico) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Corrige entrada formatada (ex: "R$ 1.234,56")
  const valorNumerico = parseFloat(
    valor.replace("R$", "").replace(/\./g, "").replace(",", ".").trim()
  );

  const valorFormatado = valorNumerico.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  document.getElementById("clienteNome").textContent = cliente;
  document.getElementById("servicoDesc").textContent = servico;
  document.getElementById("valorRecibo").textContent = valorFormatado;

  const personalizarDataCheckbox = document.getElementById("personalizarData");
  const dataPersonalizadaInput = document.getElementById("dataPersonalizada");
  let data;

  if (personalizarDataCheckbox.checked) {
    const dataSelecionada = dataPersonalizadaInput.value;
    if (!dataSelecionada) {
      alert("Por favor, selecione uma data personalizada.");
      return;
    }
    const partes = dataSelecionada.split("-");
    data = `${partes[2]}/${partes[1]}/${partes[0]}`;
  } else {
    data = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  document.getElementById("dataAtual").textContent = data;
  document.getElementById("recibo").classList.remove("hidden");
  document.getElementById("recibo").scrollIntoView({ behavior: "smooth" });
}

function imprimirRecibo() {
  window.print();
}

document.getElementById("valor").addEventListener("input", function (e) {
  let value = e.target.value;
  value = value.replace(/\D/g, "");
  value = (value / 100).toFixed(2);
  value = value.replace(".", ",");
  value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  e.target.value = value ? "R$ " + value : "";
});

// Adiciona o evento para mostrar/esconder o campo de data e seu label
document
  .getElementById("personalizarData")
  .addEventListener("change", function () {
    const dataPersonalizadaInput = document.getElementById("dataPersonalizada");
    const labelDataPersonalizada = document.getElementById(
      "labelDataPersonalizada"
    );

    if (this.checked) {
      dataPersonalizadaInput.classList.remove("hidden");
      labelDataPersonalizada.classList.remove("hidden");
    } else {
      dataPersonalizadaInput.classList.add("hidden");
      labelDataPersonalizada.classList.add("hidden");
    }
  });
