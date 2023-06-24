$(document).ready(function () {
  const tela1 = $("#tela1");
  const tela2 = $("#tela2");
  const trocarTelaBtn = $("#trocarTelaBtn");
  const nomeInput = $("#nomeInput");
  const adicionarBtn = $("#adicionarBtn");
  const listaCompras = $("#listaCompras");
  const listaComprasTBody = listaCompras.find("tbody");
  const limparListaBtn = $("<button>")
    .addClass("btn btn-danger mt-3")
    .text("Limpar lista")
    .hide();

  trocarTelaBtn.on("click", function () {
    if (tela1.hasClass("d-none")) {
      tela1.removeClass("d-none");
      tela2.addClass("d-none");
      trocarTelaBtn.text("Calcular");
    } else {
      tela1.addClass("d-none");
      tela2.removeClass("d-none");
      trocarTelaBtn.text("Editar Lista");
    }
  });

  adicionarBtn.on("click", function () {
    const nome = nomeInput.val();
    if (nome !== "") {
      const newRow = $("<tr>");
      const nomeCell = $("<td>");
      const actionsCell = $("<td>");
      const editButton = $("<button>")
        .addClass("btn btn-secondary mr-2 edit-button")
        .html('<i class="fas fa-pencil-alt"></i>');
      const deleteButton = $("<button>")
        .addClass("btn btn-danger")
        .html('<i class="fas fa-trash"></i>');

      nomeCell.text(nome);

      editButton.on("click", function () {
        const inputField = $("<input>")
          .attr("type", "text")
          .addClass("form-control")
          .val(nomeCell.text());
        nomeCell.empty().append(inputField);
        inputField.focus();

        inputField.on("keyup", function (event) {
          if (event.keyCode === 13) {
            // Enter key
            const editedNome = inputField.val();
            nomeCell.empty().text(editedNome);
            inputField.remove();
            editButton.html('<i class="fas fa-pencil-alt"></i>');
          }
        });

        inputField.on("focusout", function () {
          const editedNome = inputField.val();
          nomeCell.empty().text(editedNome);
          inputField.remove();
          editButton.html('<i class="fas fa-pencil-alt"></i>');
        });

        editButton.html('<i class="fas fa-check"></i>');
      });

      deleteButton.on("click", function () {
        const confirmacao = confirm(
          "Tem certeza que deseja excluir este item?"
        );
        if (confirmacao) {
          newRow.remove();
          if (listaComprasTBody.children().length < 1) {
            limparListaBtn.hide();
          }
        }
      });

      newRow.append(nomeCell, actionsCell.append(editButton, deleteButton));
      listaComprasTBody.append(newRow);
      listaCompras.removeClass("d-none");
      nomeInput.val("");

      if (listaComprasTBody.children().length === 1) {
        $("#tela1").append(limparListaBtn);
        limparListaBtn.show();
      }
    }
  });

  limparListaBtn.on("click", function () {
    const confirmacao = confirm("Tem certeza que deseja limpar toda a lista?");
    if (confirmacao) {
      listaComprasTBody.empty();
      limparListaBtn.hide();
      window.location.reload();
    }
  });
});
