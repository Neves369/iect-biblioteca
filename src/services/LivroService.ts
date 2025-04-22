import supabase  from "../api";
import exceptionHandler from "../utils/ExceptionHandler";

// Usado para pesquisar livros de acordo com os filtros
const listarLivros = async (filtros: any) => {
    try {

        // Filtra os filtros vazios
        const where = Object.fromEntries(
            Object.entries(filtros).filter(([, value]) => value !== "")
        );

        // Inicia a consulta
        let query = supabase.from('livro_sem_acento').select("*");


        // Aplica os filtros dinamicamente
        for (const [key, value] of Object.entries(where)) {
            if (key === "titulo") {
                query = query.ilike("titulo_sem_acento", `%${value}%`);
            } else if (key === "autor") {
                query = query.ilike("autor_sem_acento", `%${value}%`);
            } else if (key === "ano_publicacao") {
                query = query.eq(key, value);
            }
        }

        const { data, error } = await query; // Executa a consulta

        if (error) {
            return error.message;
        }
        return data;

    } catch (error) {
        return exceptionHandler(error);
    }
};

// Retorna os livros que não estão emprestados
const listarLivrosDisponiveis = async () => {
    try {
        
        const { data, error } = await supabase
        .from('livros_disponiveis')
        .select("*");      

        if (error) {
            return error.message;
        }
        return data;
    } catch (error) {
        return exceptionHandler(error);
    }
};

const salvarLivro = async (livro: any, quantidade: number) => {
    try {
        const { data , error: livroError } = await supabase
            .from('livro')
            .insert({ 
                titulo: livro.titulo, 
                autor: livro.autor,  
                ano_publicacao: livro.ano_publicacao,
                descricao: livro.descricao,
                tags: livro.tags,
                capa: livro.capa,
                quantidade: quantidade 
            }).select('id') 

        if (livroError) {
            return livroError.message;
        }


        // Inserir os exemplares na tabela exemplar
        const exemplares = Array.from({ length: quantidade }, () => ({
            livro_id: data[0].id,  // Associa os exemplares ao livro recém-criado
            status: 'disponível',     // Todos os exemplares começam como disponíveis
        }));

        const { status, error: exemplaresError } = await supabase
            .from('exemplar')
            .insert(exemplares);

        if (exemplaresError) {
            return exemplaresError.message;
        }

        // Se tudo correr bem, retornamos o status de sucesso
        return status;

    } catch (error: any) {
        return error.message || 'Ocorreu um erro inesperado.';
    }
};

const editarLivro = async (livro: any, id: any, novaQuantidade: number) => {
    try {
        // Atualiza o livro na tabela livro
        const { error: livroError } = await supabase
            .from('livro')
            .update({ 
                titulo: livro.titulo, 
                autor: livro.autor,  
                ano_publicacao: livro.ano_publicacao,
                descricao: livro.descricao,
                tags: livro.tags,
                capa: livro.capa,
                quantidade: novaQuantidade
            })
            .eq('id', id);

        if (livroError) {
            return livroError.message;
        }

        // Pega a quantidade atual de exemplares do livro
        const { data: exemplaresAtuais, error: exemplaresError } = await supabase
            .from('exemplar')
            .select('*')
            .eq('livro_id', id);

        if (exemplaresError) {
            return exemplaresError.message;
        }

        const quantidadeAtual = exemplaresAtuais.length;

        // Se a nova quantidade for maior que a quantidade atual, criamos novos exemplares
        if (novaQuantidade > quantidadeAtual) {
            const exemplaresParaAdicionar = Array.from({ length: novaQuantidade - quantidadeAtual }, () => ({
                livro_id: id,
                status: 'disponível'
            }));

            const { error: erroCriacaoExemplares } = await supabase
                .from('exemplar')
                .insert(exemplaresParaAdicionar);

            if (erroCriacaoExemplares) {
                return erroCriacaoExemplares.message;
            }
        }

        // Se a nova quantidade for menor que a quantidade atual, removemos exemplares
        if (novaQuantidade < quantidadeAtual) {

            // Filtramos apenas os exemplares disponíveis
            const exemplaresDisponiveis = exemplaresAtuais.filter(exemplar => exemplar.status === 'disponível');

            // Selecionamos os exemplares a serem removidos (somente os disponíveis)
            const exemplaresParaRemover = exemplaresDisponiveis.slice(novaQuantidade);

            const { error: erroRemocaoExemplares } = await supabase
                .from('exemplar')
                .delete()
                .in('id', exemplaresParaRemover.map(exemplar => exemplar.id));

            if (erroRemocaoExemplares) {
                return erroRemocaoExemplares.message;
            }
        }

        return `204`; // Retorna o status de sucesso

    } catch (error: any) {
        return error.message || 'Erro desconhecido ao editar o livro';
    }
};



export default {
    salvarLivro,
    editarLivro,
    listarLivros,
    listarLivrosDisponiveis

}