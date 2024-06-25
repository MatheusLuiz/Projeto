function exibirListaFuncionariosAtivos() {
  console.log("Chamando exibirListaFuncionarios");

  // Limpar mensagem de sucesso ou erro, se estiver visível
  limparMensagem();

  // Exibir a seção de funcionários e ocultar formulário de cadastro
  document.getElementById('sectionFuncionarios').style.display = 'block';
  document.getElementById('sectionCadastro').style.display = 'none';
  document.getElementById('sectionModal').style.display = 'none';

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
          <span>${funcionario.nome} ${funcionario.sobrenome} - Matrícula: ${funcionario.matricula}</span>
          <div>
            <button class="btn btn-primary btn-sm me-2" onclick="openModal()">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="deletarFuncionario(${funcionario.matricula})">Deletar</button>
          </div>
        `;
        lista.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Erro ao buscar funcionários:', error);
      const errorDiv = document.getElementById('sectionFuncionarios');
      errorDiv.innerHTML = `
        <div class="alert alert-danger" role="alert">
          Erro ao buscar funcionários. Verifique o console para mais detalhes.
        </div>`;
    });
}

function openModal(){
  document.getElementById('sectionFuncionarios').style.display = 'none';
  document.getElementById('sectionModal').style.display = 'block';
  const modal = document.getElementById('modal-container')
  modal.classList.add('mostrar')
    modal.addEventListener('click', (e) =>{
      if (e.target.id == 'modal-container' || e.target.id == "fechar"){
          modal.classList.remove('mostrar')
          localStorage.fechaModal = 'modal-container'
      }
    })
}

function editarFuncionario(id) {
  // Lógica para editar o funcionário
  console.log(`Editar funcionário com ID: ${id}`);
  // Aqui você pode preencher o formulário de cadastro com os dados do funcionário
  // e exibir o formulário para edição
}

function deletarFuncionario(matricula) {
  // Lógica para deletar o funcionário
  console.log(`Deletar funcionário com ID: ${matricula}`);

  // Enviar requisição DELETE para o servidor
  fetch(`/funcionarios/${matricula}`, {
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

function exibirPesquisaFuncionario() {
  limparMensagem(); // Limpa mensagens anteriores, se houver
  document.getElementById('sectionFuncionarios').style.display = 'none';
  document.getElementById('sectionCadastro').style.display = 'none';
  document.getElementById('sectionPesquisar').style.display = 'block';
}

// Função para pesquisar um funcionário por matrícula
async function pesquisarFuncionario() {
  const matricula = document.getElementById('inputMatricula').value;

  try {
    const response = await fetch(`/funcionarios/${matricula}`);

    if (!response.ok) {
      throw new Error('Funcionário não encontrado');
    }

    const funcionario = await response.json();

    // Monta o HTML para exibir o resultado da pesquisa
    const resultadoHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${funcionario.nome} ${funcionario.sobrenome}</h5>
          <p class="card-text">Matrícula: ${funcionario.matricula}</p>
          <p class="card-text">CPF: ${funcionario.cpf}</p>
          <p class="card-text">Data de Nascimento: ${funcionario.data_nascimento}</p>
          <p class="card-text">Estado Civil: ${funcionario.estado_civil}</p>
          <p class="card-text">Status: ${funcionario.status}</p>
          <button class="btn btn-primary" onclick="editarFuncionario(${funcionario.id})">Editar</button>
          <button class="btn btn-danger" onclick="deletarFuncionario(${funcionario.matricula})">Deletar</button>
        </div>
      </div>
    `;

    document.getElementById('resultadoPesquisa').innerHTML = resultadoHTML;

  } catch (error) {
    console.error('Erro ao buscar funcionário:', error);
    const mensagemDiv = document.getElementById('resultadoPesquisa');
    mensagemDiv.innerHTML = `
      <div class="alert alert-danger" role="alert">
        Funcionário não encontrado ou erro na busca. Verifique o console para mais detalhes.
      </div>
    `;
  }
}

// Função para editar um funcionário
function editarFuncionario(matricula) {
  console.log(`Editar funcionário com ID: ${matricula}`);
  // Aqui você pode implementar a lógica para editar o funcionário
  // Por exemplo, preencher o formulário de cadastro com os dados do funcionário
  // e exibir o formulário para edição
}

// Função para deletar um funcionário
function deletarFuncionario(matricula) {
  console.log(`Deletar funcionário com Matrícula: ${matricula}`);

  fetch(`/funcionarios/${matricula}`, {
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
    const errorDiv = document.getElementById('sectionFuncionarios');
    errorDiv.innerHTML = `
      <div class="alert alert-danger" role="alert">
        Erro ao deletar funcionário. Verifique o console para mais detalhes.
      </div>`;
  });
}

// Função auxiliar para limpar mensagens
function limparMensagem() {
  const mensagemDiv = document.getElementById('resultadoPesquisa');
  if (mensagemDiv) {
    mensagemDiv.innerHTML = ''; // Limpa o conteúdo
  }
}

    // Captura o formulário de cadastro
    const formCadastroFuncionario = document.getElementById('formCadastroFuncionario');
  
    // Adiciona um event listener para o evento de submit
    formCadastroFuncionario.addEventListener('submit', async function(event) {
      event.preventDefault(); // Previne o comportamento padrão do formulário
  
      // Chama a função para cadastrar o funcionário
      await CadastrarFuncionario();
    });
