function exibirListaFuncionariosAtivos() {
  console.log("Chamando exibirListaFuncionarios");
  
  // Ocultar mensagem de sucesso, se estiver visível
  limparMensagem();

  // Exibir a seção de funcionários
  document.getElementById('sectionFuncionarios').style.display = 'block';
  document.getElementById('sectionCadastro').style.display = 'none'; // Garante que o formulário de cadastro seja ocultado

  // Fetch para buscar e exibir lista de funcionários
  fetch('/funcionarios')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao buscar funcionários');
      }
      return response.json();
    })
    .then(funcionarios => {
      const lista = document.getElementById('listaFuncionarios');
      lista.innerHTML = '';

      funcionarios.forEach(funcionario => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
          ${funcionario.nome} - Matrícula: ${funcionario.matricula}
          <div>
            <button class="btn btn-primary btn-sm me-2" onclick="editarFuncionario(${funcionario.id})">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="deletarFuncionario(${funcionario.id})">Deletar</button>
          </div>
        `;
        lista.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Erro ao buscar funcionários:', error);
      document.getElementById('sectionFuncionarios').innerHTML = `
        <div class="alert alert-danger" role="alert">
          Erro ao buscar funcionários. Verifique o console para mais detalhes.
        </div>`;
    });
}

function editarFuncionario(id) {
  // Lógica para editar o funcionário
  console.log(`Editar funcionário com ID: ${id}`);
  // Aqui você pode preencher o formulário de cadastro com os dados do funcionário
  // e exibir o formulário para edição
}

function deletarFuncionario(id) {
  // Lógica para deletar o funcionário
  console.log(`Deletar funcionário com ID: ${id}`);

  // Enviar requisição DELETE para o servidor
  fetch(`/funcionarios/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao deletar funcionário');
    }
    // Atualizar a lista de funcionários após a exclusão
    exibirListaFuncionariosAtivos();
  })
  .catch(error => {
    console.error('Erro ao deletar funcionário:', error);
  });
}

function limparMensagem() {
  const mensagemDiv = document.getElementById("mensagemCadastro");
  if (mensagemDiv) {
    mensagemDiv.innerText = '';
  }
}


async function CadastrarFuncionario() {
  try {
    const matricula = document.getElementById("matricula").value;
    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const cpf = document.getElementById("cpf").value;
    const rg = document.getElementById("rg").value;
    const data_nascimento = document.getElementById("data_nascimento").value;
    const estado_civil = document.getElementById("estado_civil").value;
    const cnh = document.getElementById("cnh").value;
    const status = document.getElementById("status").value;
    const data_cadastro = document.getElementById("data_cadastro").value;
    const id_cargo = document.getElementById("id_cargo").value;
    const id_setor = document.getElementById("id_setor").value;
    const id_filial = document.getElementById("id_filial").value;

    // Verificar se campos obrigatórios estão preenchidos
    if (!nome || !matricula) {
      exibirMensagemErro(
        "Todos os campos obrigatórios devem ser preenchidos: nome, matricula"
      );
      return;
    }

    // Objeto com os dados do funcionário
    const funcionarioData = {
      matricula,
      nome,
      sobrenome,
      cpf,
      rg,
      data_nascimento,
      estado_civil,
      cnh,
      status,
      data_cadastro,
      id_cargo,
      id_setor,
      id_filial,
    };

    // Enviar requisição POST para cadastrar o funcionário
    const response = await fetch("/funcionarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(funcionarioData),
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar funcionário");
    }

    // Limpar formulário após sucesso
    limparFormulario();

    // Exibir mensagem de sucesso
    exibirMensagemSucesso("Funcionário cadastrado com sucesso");

  } catch (error) {
    console.error("Erro ao cadastrar funcionário:", error.message);
    exibirMensagemErro("Erro ao cadastrar funcionário");
  }
}

// Função para limpar o formulário após cadastro bem-sucedido
function limparFormulario() {
  document.getElementById("matricula").value = "";
  document.getElementById("nome").value = "";
  document.getElementById("sobrenome").value = "";
  document.getElementById("cpf").value = "";
  document.getElementById("rg").value = "";
  document.getElementById("data_nascimento").value = "";
  document.getElementById("estado_civil").value = "";
  document.getElementById("cnh").value = "";
  document.getElementById("status").value = "";
  document.getElementById("data_cadastro").value = "";
  document.getElementById("id_cargo").value = "";
  document.getElementById("id_setor").value = "";
  document.getElementById("id_filial").value = "";
}

// Funções auxiliares para exibir mensagens na tela
function exibirMensagemErro(mensagem) {
  const mensagemDiv = document.getElementById("mensagemCadastro");
  if (mensagemDiv) {
    mensagemDiv.innerText = mensagem;
    mensagemDiv.style.display = 'block';
    // Ocultar mensagem após 5 segundos
    setTimeout(() => {
      mensagemDiv.style.display = 'none';
      mensagemDiv.innerText = '';
    }, 5000);
  } else {
    console.error("Elemento mensagemCadastro não encontrado no DOM.");
  }
}

function exibirMensagemSucesso(mensagem) {
  const mensagemDiv = document.getElementById("mensagemCadastro");
  if (mensagemDiv) {
    mensagemDiv.innerText = mensagem;
    mensagemDiv.style.display = 'block';
    // Ocultar mensagem após 5 segundos
    setTimeout(() => {
      mensagemDiv.style.display = 'none';
      mensagemDiv.innerText = '';
    }, 5000);
  } else {
    console.error("Elemento mensagemCadastro não encontrado no DOM.");
  }
}

function exibirFormCadastro() {
  document.getElementById('sectionFuncionarios').style.display = 'none';
  document.getElementById('sectionCadastro').style.display = 'block';
}

// Função para limpar a mensagem manualmente
function limparMensagem() {
  const mensagemDiv = document.getElementById("mensagemCadastro");
  if (mensagemDiv) {
    mensagemDiv.style.display = 'none';
    mensagemDiv.innerText = '';
  }
}

function exibirListaFuncionariosAtivos() {
  console.log("Chamando exibirListaFuncionarios");
  
  // Ocultar mensagem de sucesso, se estiver visível
  limparMensagem();

  // Exibir a seção de funcionários
  document.getElementById('sectionFuncionarios').style.display = 'block';
  document.getElementById('sectionCadastro').style.display = 'none'; // Garante que o formulário de cadastro seja ocultado

  // Fetch para buscar e exibir lista de funcionários
  fetch('/funcionarios')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao buscar funcionários');
      }
      return response.json();
    })
    .then(funcionarios => {
      const lista = document.getElementById('listaFuncionarios');
      lista.innerHTML = '';

      funcionarios.forEach(funcionario => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `${funcionario.nome} - Matrícula: ${funcionario.matricula}`;
        lista.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Erro ao buscar funcionários:', error);
      document.getElementById('sectionFuncionarios').innerHTML = `
        <div class="alert alert-danger" role="alert">
          Erro ao buscar funcionários. Verifique o console para mais detalhes.
        </div>`;
    });
}