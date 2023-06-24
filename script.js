let lista = [];
let saldoAtual = 0;

$(document).ready(function () {
  recuperarListaDoLocalStorage();
  exibirLista();
  recuperarSaldoDoLocalStorage();
});

function adicionarItem() {
  const produtoInput = $("#produto");
  const produto = produtoInput.val().trim();
  const quantidade = parseFloat($("#quantidade").val().replace(",", "."));
  const valor = parseFloat($("#valor").val().replace(",", "."));

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
  const tbody = $("table#lista tbody");
  tbody.html("");

  for (const item of lista) {
    const { produto, quantidade, valor, total } = item;

    const row = $("<tr></tr>");
    row.html(`
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
    `);
    tbody.append(row);
  }

  calcularTotal();
}

function calcularTotal() {
  const total = lista.reduce((acc, item) => acc + parseFloat(item.total), 0);
  $("#total").text(
    `Total: ${total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}`
  );
}

function limparCampos() {
  $("#produto").val("");
  $("#quantidade").val("");
  $("#valor").val("");
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
  const saldoAtualElement = $("#saldo");
  saldoAtual = parseFloat($("#valorTotal").val().replace(",", "."));

  if (isNaN(saldoAtual)) {
    saldoAtual = 0;
  }

  saldoAtual -= total;
  saldoAtualElement.text(
    `Saldo Atual: ${saldoAtual.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}`
  );
  salvarSaldoNoLocalStorage();
}

function salvarSaldoNoLocalStorage() {
  localStorage.setItem("saldoAtual", saldoAtual);
}

function recuperarSaldoDoLocalStorage() {
  const saldoSalvo = localStorage.getItem("saldoAtual");
  if (saldoSalvo) {
    saldoAtual = parseFloat(saldoSalvo);
    $("#saldo").text(
      `Saldo Atual: ${saldoAtual.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}`
    );
  }
}

function atualizarValorTotal() {
  atualizarSaldo();
}
