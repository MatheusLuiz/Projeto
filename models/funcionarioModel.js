const db = require('../config/banco.js');

const Funcionario = {
    create: async (funcionario) => {
        try {
            const {matricula, nome, sobrenome, cpf, rg, data_nascimento, estado_civil, cnh, status, data_cadastro, id_cargo, id_setor, id_filial } = funcionario;

            const [rows] = await db.execute(
                `INSERT INTO funcionarios (matricula, nome, sobrenome, CPF, RG, data_nascimento, estado_civil, cnh, status, data_cadastro, id_cargo, id_setor, id_filial)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [matricula, nome, sobrenome, cpf, rg, data_nascimento, estado_civil, cnh, status, data_cadastro, id_cargo, id_setor, id_filial]
            );
            
            return rows;
        } catch (error) {
            console.error('Erro ao criar funcionário no banco de dados:', error);
            throw error;
        }
    },
    findById: async (matricula) => {
        const [rows] = await db.execute(`SELECT * FROM funcionarios WHERE matricula = ?`, [matricula]);
        return rows[0];
    },
    findAll: async () => {
        const [rows] = await db.execute(`SELECT * FROM funcionarios`);
        return rows;
    },
    update: async (matricula, funcionario) => {
        const { nome, sobrenome, cpf, rg, data_nascimento, estado_civil, cnh, status, data_cadastro, id_cargo, id_setor, id_filial } = funcionario;

        const [rows] = await db.execute(
            `UPDATE funcionarios SET nome = ?, sobrenome = ?, CPF = ?, RG = ?, data_nascimento = ?, estado_civil = ?, cnh = ?, status = ?, data_cadastro = ?, id_cargo = ?, id_setor = ?, id_filial = ? WHERE matricula = ?`,
            [nome, sobrenome || null, cpf || null, rg || null, data_nascimento || null, estado_civil || null, cnh || null, status || null, data_cadastro || null, id_cargo || null, id_setor || null, id_filial || null, matricula]
        );

        return rows;
    },
    delete: async (matricula) => {
        const [rows] = await db.execute(`DELETE FROM funcionarios WHERE matricula = ?`, [matricula]);
        return rows;
    }
};

module.exports = Funcionario;