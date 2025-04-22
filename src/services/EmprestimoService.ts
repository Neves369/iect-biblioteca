import moment from "moment";
import supabase  from "../api";
import exceptionHandler from "../utils/ExceptionHandler";


const listarEmprestimos = async (filters: any) => {
    try {
        // Filtra os filtros vazios
        const where = Object.fromEntries(
            Object.entries(filters).filter(([, value]) => value !== "")
        );

        // Inicia a consulta na view "full_emprestimos"
        let query = supabase.from('full_emprestimos').select("*");

        // Aplica os filtros dinamicamente
        for (const [key, value] of Object.entries(where)) {
            if (key === "usuario") {
                query = query.ilike("usuario_nome", `%${value}%`);  // Filtra pelo nome do usuário
            } else if (key === "livro") {
                query = query.ilike("livro_titulo", `%${value}%`);  // Filtra pelo título do livro
            } else if (key === "status") {
                // Filtra pelo status do empréstimo
                if (value === true) {
                    query = query.is('data_devolucao', null);  // Empréstimos ativos (não devolvidos)
                } else if (value === false) {
                    query = query.not('data_devolucao', 'is', null);  // Empréstimos finalizados (devolvidos)
                }
            } else if (key === "exemplar") {
                // Filtra pelo ID do exemplar
                query = query.ilike("exemplar_id", `%${value}%`);  // Filtra por exemplar específico
            }
        }

        // Executa a consulta
        const { data, error } = await query;

        if (error) {
            return error.message;
        }
        return data;
        
    } catch (error) {
        return exceptionHandler(error);  // Trata exceções
    }
};


const listarEmprestimosVencendo = async (user: any) => {
    try {
        // Se o usuário for do tipo "master", ele pode ver todos os empréstimos vencendo
        if (user.tipoUsuario == "master") {
            const { data, error } = await supabase
                .from('emprestimos_vencendo')
                .select("*");
            
            if (error) {
                return error.message;
            }

            return data;
        }
        else {
            // Se o usuário não for master, filtramos pelo nome do usuário
            const { data, error } = await supabase
                .from('emprestimos_vencendo')
                .select("*")
                .eq('usuario_nome', user.nome);  // Filtrando pelo nome do usuário
            
            if (error) {
                return error.message;
            }

            return data;
        }
    } catch (error) {
        return exceptionHandler(error);
    }
};


const salvarEmprestimo = async (emprestimo: any) => {
    try {
        // Passo 1: Buscar um exemplar disponível para o livro
        const { data: exemplaresDisponiveis, error: erroExemplares } = await supabase
            .from('exemplar')
            .select('id')
            .eq('livro_id', emprestimo.livro_id)  // Associar ao livro
            .eq('status', 'disponível')  // Garantir que o exemplar está disponível
            .limit(1);  // Pega apenas um exemplar disponível

        if (erroExemplares) {
            return erroExemplares.message;
        }

        if (exemplaresDisponiveis.length === 0) {
            return "Não há exemplares disponíveis para empréstimo.";
        }

        // Passo 2: Selecionar o primeiro exemplar disponível
        const exemplarId = exemplaresDisponiveis[0].id;

        // Passo 3: Atualizar o status do exemplar para "emprestado"
        const { error: erroAtualizacaoExemplar } = await supabase
            .from('exemplar')
            .update({ status: 'emprestado' })  // Alterar status para "emprestado"
            .eq('id', exemplarId);

        if (erroAtualizacaoExemplar) {
            return erroAtualizacaoExemplar.message;
        }

        // Passo 4: Registrar o empréstimo na tabela "emprestimo"
        const { error, status } = await supabase
            .from('emprestimo')
            .insert({
                usuario_id: emprestimo.usuario_id,
                exemplar_id: exemplarId,  // Associar ao exemplar específico
                previsao_devolucao: moment().add(emprestimo.prazoEmprestimo, 'days').toISOString()
            });

        if (error) {
            return error.message;
        }

        return status;
        
    } catch (error: any) {
        return error.message || 'Erro desconhecido ao salvar o empréstimo';
    }
};

const finalizarEmprestimo = async (id: number) => {
    try {
        // Primeiro, vamos verificar se o empréstimo está ativo (sem data de devolução)
        const { data: emprestimo, error: checkError } = await supabase
            .from('emprestimo')
            .select('exemplar_id, data_devolucao')
            .eq('id', id)
            .single();  // Para retornar um único resultado

        if (checkError) {
            return checkError.message;
        }

        if (emprestimo?.data_devolucao !== null) {
            // Se já tiver data de devolução, o empréstimo já foi finalizado
            return 'Este empréstimo já foi finalizado.';
        }

        // Caso o empréstimo ainda não tenha sido devolvido, finalizamos
        const { error: updateEmprestimoError, status } = await supabase
            .from('emprestimo')
            .update({ 
                data_devolucao: moment().toISOString()  // Marca a data de devolução com o momento atual
            })
            .eq('id', id);

        if (updateEmprestimoError) {
            return updateEmprestimoError.message;
        }

        // Agora, vamos atualizar o exemplar, marcando-o como disponível
        const { error: updateExemplarError } = await supabase
            .from('exemplar')
            .update({ 
                status: 'disponível'  // Marca o exemplar como disponível
            })
            .eq('id', emprestimo.exemplar_id);

        if (updateExemplarError) {
            return updateExemplarError.message;
        }

        return status;

    } catch (error) {
        return exceptionHandler(error);
    }
};





export default {
    salvarEmprestimo,
    listarEmprestimos,
    finalizarEmprestimo,
    listarEmprestimosVencendo
}