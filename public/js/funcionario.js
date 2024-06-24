const handleSubmit = async (event) => {
    event.preventDefault(); // Evita o comportamento padrão de submit do formulário

    const matricula = document.querySelector('input[name="matricula"]').value;

    try {
        // Faz uma requisição GET para buscar o funcionário pelo ID (matrícula)
        const response = await fetch(`/controllers/funcionarios/${matricula}`);
        const data = await response.json();

        // Limpa a lista atual de funcionários
        const funcionariosList = document.getElementById('funcionario-info');
        funcionariosList.innerHTML = '';

        // Cria elementos para mostrar os dados do funcionário
        const funcionarioInfo = document.createElement('div');
        funcionarioInfo.classList.add('card', 'mt-3');
        funcionarioInfo.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">Funcionário Encontrado</h5>
                <p class="card-text">Matrícula: ${data.matricula}</p>
                <p class="card-text">Nome: ${data.nome}</p>
                <p class="card-text">Cargo: ${data.cargo}</p>
                <p class="card-text">Departamento: ${data.departamento}</p>
            </div>
        `;
        funcionariosList.appendChild(funcionarioInfo);
    } catch (error) {
        console.error('Erro ao buscar funcionário:', error);
        // Lógica para lidar com o erro, se necessário
    }
};

document.querySelector('form').addEventListener('submit', handleSubmit);

