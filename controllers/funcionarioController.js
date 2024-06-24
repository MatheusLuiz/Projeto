const Funcionario = require('../models/funcionarioModel');

const getFuncionarioById = async (req, res) => {
    try {
        const funcionario = await Funcionario.findById(req.params.matricula);
        if (!funcionario) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }
        res.status(200).json(funcionario);
    } catch (error) {
        console.error('Erro ao buscar funcionário por matrícula:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const getAllFuncionarios = async (req, res) => {
    try {
        const funcionarios = await Funcionario.findAll();
        res.status(200).json(funcionarios);
    } catch (error) {
        console.error('Erro ao buscar todos os funcionários:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const createFuncionario = async (req, res) => {
    try {
        // Verifica se todos os campos necessários estão presentes em req.body
        const { matricula, nome } = req.body;

        if (!nome || !matricula) {
            return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos: nome, matricula' });
        }

        // Extrai todos os campos do req.body, garantindo que apenas os campos necessários sejam passados
        const {
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
            id_filial // Qualquer outro campo não listado acima será capturado aqui
        } = req.body;

        // Cria um novo funcionário no banco de dados
        const newFuncionario = await Funcionario.create({
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
            id_filial // Inclui outros dados capturados
        });

        // Retorna o novo funcionário criado
        res.status(201).json(newFuncionario);
    } catch (error) {
        console.error('Erro ao criar funcionário:', error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createFuncionario,
    getFuncionarioById,
    getAllFuncionarios
};