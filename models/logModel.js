const db = require('../config/banco');

const Log = {
    create: async (log) => {
        const [rows] = await db.execute(
            `INSERT INTO log_usu (tabela_afetada, acao_realizada, id_registro_afetado, id_funcionario_editor, dados_antigos, dados_novos)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [log.tabela_afetada, log.acao_realizada, log.id_registro_afetado, log.id_funcionario_editor, log.dados_antigos, log.dados_novos]
        );
        return rows;
    }
};

module.exports = Log;