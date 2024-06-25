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

const getAllFuncionariosActive = async (req, res) => {
    try {
        console.log("Chamando Funcionario.findAll");
        const funcionarios = await Funcionario.findAllActive();
        console.log("Funcionários encontrados:", funcionarios);
        res.status(200).json(funcionarios);
    } catch (error) {
        console.error('Erro ao buscar todos os funcionários:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const getAllFuncionariosInactive = async (req, res) => {
    try {
        console.log("Chamando Funcionario.findAll");
        const funcionarios = await Funcionario.findAllInactive();
        console.log("Funcionários encontrados:", funcionarios);
        res.status(200).json(funcionarios);
    } catch (error) {
        console.error('Erro ao buscar todos os funcionários:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const createFuncionario = async (req, res) => {
    try {
        const { matricula, nome, sobrenome, cpf, rg, data_nascimento, estado_civil, cnh, status, data_cadastro, id_cargo, id_setor, id_filial } = req.body;
        if (!nome || !matricula) {
            return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos: nome, matricula' });
        }
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
            id_filial
        });
        res.status(201).json(newFuncionario);
    } catch (error) {
        console.error('Erro ao criar funcionário:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const updateFuncionario = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedFuncionario = await Funcionario.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedFuncionario) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }

        res.status(200).json(updatedFuncionario);
    } catch (error) {
        console.error('Erro ao atualizar funcionário:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const deleteFuncionario = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedFuncionario = await Funcionario.delete(id);

        if (!deletedFuncionario) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }

        res.status(200).json({ message: 'Funcionário excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar funcionário:', error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createFuncionario,
    getFuncionarioById,
    getAllFuncionariosActive,
    updateFuncionario,
    deleteFuncionario,
    getAllFuncionariosInactive
};