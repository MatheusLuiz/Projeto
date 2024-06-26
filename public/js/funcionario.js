function exibirListaFuncionariosAtivos() {
  limparMensagem(); // Limpa mensagens anteriores, se houver

  // Ocultar todas as seções
  document.getElementById("sectionCadastro").style.display = "none";
  document.getElementById("sectionPesquisa").style.display = "none";
  document.getElementById("sectionFuncionariosInativos").style.display = "none";
  document.getElementById("sectionFuncionarios").style.display = "block";
  

  // Fetch para buscar e exibir lista de funcionários
  fetch("/funcionarios")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao buscar funcionários");
      }
      return response.json();
    })
    .then((funcionarios) => {
      const lista = document.getElementById("listaFuncionarios");
      lista.innerHTML = "";

      funcionarios.forEach((funcionario) => {
        const li = document.createElement("li");
        li.className =
          "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
          <span>${funcionario.nome} ${funcionario.sobrenome} - Matrícula: ${funcionario.matricula}</span>
          <div>
            <button class="btn btn-primary btn-sm me-2" onclick="openModal(${funcionario.matricula})">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="deletarFuncionario(${funcionario.matricula})">Deletar</button>
          </div>
        `;
        lista.appendChild(li);
      });

      // Exibir apenas a seção de funcionários
      document.getElementById("sectionFuncionarios").style.display = "block";
    })
    .catch((error) => {
      console.error("Erro ao buscar funcionários:", error);
      const errorDiv = document.getElementById("mensagemCadastro");
      errorDiv.innerHTML = `
        <div class="alert alert-danger" role="alert">
          Erro ao buscar funcionários. Verifique o console para mais detalhes.
        </div>`;
    });
}

function exibirListaFuncionariosInativos() {
  console.log('Chamando exibirListaFuncionariosInativos');

  // Limpar mensagem de sucesso ou erro, se estiver visível
  limparMensagem();

  // Ocultar outras seções
  document.getElementById("sectionCadastro").style.display = "none";
  document.getElementById("sectionPesquisa").style.display = "none";
  document.getElementById("sectionFuncionarios").style.display = "none";
  document.getElementById("sectionFuncionariosInativos").style.display = "block";
  
  // Fetch para buscar e exibir lista de funcionários inativos
  fetch('/funcionarios/inativos')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao buscar funcionários');
      }
      return response.json();
    })
    .then(funcionarios => {
      const lista = document.getElementById('listaFuncionariosInativos');
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
      const errorDiv = document.createElement('div');
      errorDiv.className = 'alert alert-danger';
      errorDiv.role = 'alert';
      errorDiv.textContent = 'Erro ao buscar funcionários. Verifique o console para mais detalhes.';
      lista.appendChild(errorDiv); // Adiciona a mensagem de erro à lista
    });
}


function deletarFuncionario(matricula) {
  console.log(`Deletar funcionário com Matrícula: ${matricula}`);

  fetch(`/funcionarios/${matricula}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao deletar funcionário');
    }
    // Se a deleção for bem-sucedida, você pode atualizar a lista de funcionários ou fazer outra ação necessária
    console.log('Funcionário deletado com sucesso');
    // Exemplo de atualização da lista após a deleção
    exibirListaFuncionariosInativos();
  })
  .catch(error => {
    console.error('Erro ao deletar funcionário:', error.message);
    // Aqui você pode exibir uma mensagem de erro na interface ou fazer outra ação necessária
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
    mensagemDiv.style.display = "block";
    // Ocultar mensagem após 5 segundos
    setTimeout(() => {
      mensagemDiv.style.display = "none";
      mensagemDiv.innerText = "";
    }, 5000);
  } else {
    console.error("Elemento mensagemCadastro não encontrado no DOM.");
  }
}

function exibirMensagemSucesso(mensagem) {
  const mensagemDiv = document.getElementById("mensagemCadastro");
  if (mensagemDiv) {
    mensagemDiv.innerText = mensagem;
    mensagemDiv.style.display = "block";
    // Ocultar mensagem após 5 segundos
    setTimeout(() => {
      mensagemDiv.style.display = "none";
      mensagemDiv.innerText = "";
    }, 5000);
  } else {
    console.error("Elemento mensagemCadastro não encontrado no DOM.");
  }
}

function exibirFormCadastro() {
  document.getElementById("sectionFuncionarios").style.display = "none";
  document.getElementById("sectionCadastro").style.display = "block";
  document.getElementById("sectionFuncionariosInativos").style.display = "none";
  document.getElementById("sectionPesquisa").style.display = "none";
}

// Função para limpar a mensagem manualmente
function limparMensagem() {
  const mensagemDiv = document.getElementById("mensagemCadastro");
  if (mensagemDiv) {
    mensagemDiv.style.display = "none";
    mensagemDiv.innerText = "";
  }
}

// Função para pesquisar um funcionário por matrícula
async function pesquisarFuncionario() {
  const matricula = document.getElementById("inputMatricula").value;

  try {
    const response = await fetch(`/funcionarios/${matricula}`);

    if (!response.ok) {
      throw new Error("Funcionário não encontrado");
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
          <button class="btn btn-primary" onclick="openModal()">Editar</button>
          <button class="btn btn-danger" onclick="deletarFuncionario(${funcionario.matricula})">Deletar</button>
        </div>
      </div>
    `;

    document.getElementById("resultadoPesquisa").innerHTML = resultadoHTML;
  } catch (error) {
    console.error("Erro ao buscar funcionário:", error);
    const mensagemDiv = document.getElementById("resultadoPesquisa");
    mensagemDiv.innerHTML = `
      <div class="alert alert-danger" role="alert">
        Funcionário não encontrado ou erro na busca. Verifique o console para mais detalhes.
      </div>
    `;
  }
}



// Função para deletar um funcionário
function deletarFuncionario(matricula) {
  console.log(`Deletar funcionário com Matrícula: ${matricula}`);

  fetch(`/funcionarios/${matricula}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao deletar funcionário");
      }
      // Atualizar a lista de funcionários após a exclusão
      exibirListaFuncionariosAtivos();
    })
    .catch((error) => {
      console.error("Erro ao deletar funcionário:", error);
      const errorDiv = document.getElementById("sectionFuncionarios");
      errorDiv.innerHTML = `
      <div class="alert alert-danger" role="alert">
        Erro ao deletar funcionário. Verifique o console para mais detalhes.
      </div>`;
    });
}

// Função auxiliar para limpar mensagens
function limparMensagem() {
  const mensagemDiv = document.getElementById("resultadoPesquisa");
  if (mensagemDiv) {
    mensagemDiv.innerHTML = ""; // Limpa o conteúdo
  }
}

// Função para editar um funcionário
async function editarFuncionario() {
  try {
    const matricula = document.getElementById("matricula2").value;
    const nome = document.getElementById("nome2").value;
    const sobrenome = document.getElementById("sobrenome2").value;
    const cpf = document.getElementById("cpf2").value;
    const rg = document.getElementById("rg2").value;
    const data_nascimento = document.getElementById("data_nascimento2").value;
    const estado_civil = document.getElementById("estado_civil2").value;
    const cnh = document.getElementById("cnh2").value;
    const status = document.getElementById("status2").value;
    const data_cadastro = document.getElementById("data_cadastro2").value;
    const id_cargo = document.getElementById("id_cargo2").value;
    const id_setor = document.getElementById("id_setor2").value;
    const id_filial = document.getElementById("id_filial2").value;

    // Verificar se campos obrigatórios estão preenchidos
    if (!nome || !matricula) {
      exibirMensagemErro(
        "teste3",
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
    const response = await fetch("/funcionario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(funcionarioData),
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar funcionário 32");
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

// Adiciona um event listener para o evento de submit
formCadastroFuncionario.addEventListener("submit", async function (event) {
  event.preventDefault(); // Previne o comportamento padrão do formulário

  // Chama a função para cadastrar o funcionário
  await CadastrarFuncionario();
});

formEditarFuncionario.addEventListener("submit", async function (event) {
  event.preventDefault(); // Previne o comportamento padrão do formulário

  // Chama a função para cadastrar o funcionário
  await editarFuncionario();
});


function exibirPesquisaFuncionarios() {
  limparMensagem(); // Limpa mensagens anteriores, se houver

  // Ocultar todas as seções
  document.getElementById("sectionCadastro").style.display = "none";
  document.getElementById("sectionFuncionarios").style.display = "none";
  document.getElementById("sectionFuncionariosInativos").style.display = "none";

  // Exibir apenas a seção de pesquisa
  document.getElementById("sectionPesquisa").style.display = "block";
}

// Função para pesquisar um funcionário por matrícula
async function pesquisarFuncionario(event) {
  event.preventDefault();
  const matricula = document.getElementById("matriculaPesquisa").value;

  try {
    const response = await fetch(`/funcionarios/${matricula}`);

    if (!response.ok) {
      throw new Error("Funcionário não encontrado");
    }

    const funcionario = await response.json();

    // Monta o HTML para exibir o resultado da pesquisa
    const resultadoHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${funcionario.nome} ${funcionario.sobrenome}</h5>
          <p class="card-text">Matrícula: ${funcionario.matricula}</p>
          <p class="card-text">CPF: ${funcionario.CPF}</p>
          <p class="card-text">Data de Nascimento: ${funcionario.data_nascimento}</p>
          <p class="card-text">Estado Civil: ${funcionario.estado_civil}</p>
          <p class="card-text">Status: ${funcionario.status}</p>
          <button class="btn btn-primary" onclick="openModal()">Editar</button>
          <button class="btn btn-danger" onclick="deletarFuncionario(${funcionario.matricula})">Deletar</button>
        </div>
      </div>
    `;

    document.getElementById("resultadosPesquisa").innerHTML = resultadoHTML;
  } catch (error) {
    console.error("Erro ao buscar funcionário:", error);
    const mensagemDiv = document.getElementById("resultadosPesquisa");
    mensagemDiv.innerHTML = `
      <div class="alert alert-danger" role="alert">
        Funcionário não encontrado ou erro na busca. Verifique o console para mais detalhes.
      </div>
    `;
  }
}

// Event listener para o formulário de pesquisa
document
  .getElementById("formPesquisaFuncionario")
  .addEventListener("submit", pesquisarFuncionario);

function openModal(matricula){
    document.getElementById('sectionFuncionarios').style.display = 'none';
    document.getElementById("sectionPesquisa").style.display = "none";
    document.getElementById('sectionModal').style.display = 'block';
    const modal = document.getElementById('modal-container')
    modal.classList.add('mostrar')

    fetch(`/funcionarios/${matricula}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao buscar dados do funcionário');
      }
      return response.json();
    })
    .then(funcionario => {
      // Preencher os campos do formulário com os dados do funcionário
      document.getElementById('matricula2').value = funcionario.matricula;
      document.getElementById('nome2').value = funcionario.nome;
      document.getElementById('sobrenome2').value = funcionario.sobrenome;
      document.getElementById('cpf2').value = funcionario.CPF;
      document.getElementById('rg2').value = funcionario.RG;
      document.getElementById('data_nascimento2').value = funcionario.data_nascimento;
      document.getElementById('estado_civil2').value = funcionario.estado_civil;
      document.getElementById('cnh2').value = funcionario.cnh;
      document.getElementById('status2').value = funcionario.status;
      document.getElementById('data_cadastro2').value = funcionario.data_cadastro;
      document.getElementById('id_cargo2').value = funcionario.id_cargo;
      document.getElementById('id_setor2').value = funcionario.id_setor;
      document.getElementById('id_filial2').value = funcionario.id_filial;
    })
    .catch(error => {
      console.error('Erro ao buscar dados do funcionário:', error);
    });

    modal.addEventListener('click', (e) =>{
        if (e.target.id == 'modal-container' || e.target.id == "fechar"){
            modal.classList.remove('mostrar')
            localStorage.fechaModal = 'modal-container'
        }
    })
}

