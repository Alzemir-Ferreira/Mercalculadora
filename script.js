let lista = [];
let saldoAtual = 0;

function adicionarItem() {
  const produtoInput = document.getElementById("produto");
  const produto = produtoInput.value.trim();
  const quantidade = parseFloat(
    document.getElementById("quantidade").value.replace(",", ".")
  );
  const valor = parseFloat(
    document.getElementById("valor").value.replace(",", ".")
  );

  if (produto === "" || isNaN(quantidade) || isNaN(valor)) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const total = quantidade * valor;

  const item = {
    produto,
    quantidade,
    valor,
    total: total.toFixed(2),
  };

  lista.push(item);
  exibirLista();
  limparCampos();
  salvarListaNoLocalStorage();
  atualizarSaldo();
}

function exibirLista() {
  const tbody = document.querySelector("table#lista tbody");
  tbody.innerHTML = "";

  for (const [index, item] of lista.entries()) {
    const { produto, quantidade, valor, total } = item;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${produto}</td>
      <td>${quantidade.toFixed(2)}</td>
      <td>${valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}</td>
      <td>${parseFloat(total).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}</td>
      <td><button onclick="excluirItem(${index})">Excluir</button></td>
    `;
    tbody.appendChild(row);
  }

  calcularTotal();
}

function calcularTotal() {
  const total = lista.reduce((acc, item) => acc + parseFloat(item.total), 0);
  document.getElementById("total").textContent = `Total: ${total.toLocaleString(
    "pt-BR",
    { style: "currency", currency: "BRL" }
  )}`;
}

function limparCampos() {
  document.getElementById("produto").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("valor").value = "";
}

function salvarListaNoLocalStorage() {
  localStorage.setItem("listaDeCompras", JSON.stringify(lista));
}

function recuperarListaDoLocalStorage() {
  const listaSalva = localStorage.getItem("listaDeCompras");
  if (listaSalva) {
    lista = JSON.parse(listaSalva);
  }
}

function limparLista() {
  if (confirm("Tem certeza de que deseja limpar a lista?")) {
    lista.length = 0;
    exibirLista();
    localStorage.removeItem("listaDeCompras");
    atualizarSaldo();
  }
}

function atualizarSaldo() {
  const total = lista.reduce((acc, item) => acc + parseFloat(item.total), 0);
  const saldoAtualElement = document.getElementById("saldo");
  saldoAtual = parseFloat(
    document.getElementById("valorTotal").value.replace(",", ".")
  );

  if (isNaN(saldoAtual)) {
    saldoAtual = 0;
  }

  saldoAtual -= total;
  saldoAtualElement.textContent = `Saldo Atual: ${saldoAtual.toLocaleString(
    "pt-BR",
    { style: "currency", currency: "BRL" }
  )}`;
  salvarSaldoNoLocalStorage();
}

function salvarSaldoNoLocalStorage() {
  localStorage.setItem("saldoAtual", saldoAtual);
}

function recuperarSaldoDoLocalStorage() {
  const saldoSalvo = localStorage.getItem("saldoAtual");
  if (saldoSalvo) {
    saldoAtual = parseFloat(saldoSalvo);
    document.getElementById(
      "saldo"
    ).textContent = `Saldo Atual: ${saldoAtual.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}`;
  }
}

function atualizarValorTotal() {
  atualizarSaldo();
}

function excluirItem(index) {
  lista.splice(index, 1);
  exibirLista();
  salvarListaNoLocalStorage();
  atualizarSaldo();
}

recuperarListaDoLocalStorage();
exibirLista();
recuperarSaldoDoLocalStorage();
