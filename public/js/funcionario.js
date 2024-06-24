function exibirListaFuncionarios() {
  console.log("Chamando exibirListaFuncionarios");
  document.getElementById('sectionFuncionarios').style.display = 'block';

  fetch('/funcionarios')
      .then(response => {
          console.log("Resposta da API recebida:", response);
          if (!response.ok) {
              throw new Error('Erro ao buscar funcionários');
          }
          return response.json();
      })
      .then(funcionarios => {
          console.log("Funcionários recebidos:", funcionarios);
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