import supabase  from "../api";
import exceptionHandler from "../utils/ExceptionHandler";


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
}

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
}

const salvarLivro = async (livro: any) => {
    try {
        const { error, status } = await supabase
        .from('livro')
        .insert({ 
            titulo: livro.titulo, 
            autor: livro.autor,  
            ano_publicacao: livro.ano_publicacao,
            descricao: livro.descricao,
            tags: livro.tags,
            capa: livro.capa
        });

        if (error) {
            return error.message;
        }

        return status;
        
          
    } catch (error) {
        return error;
    }
}

const editarLivro = async (livro: any, id: any) => {
    try {
        const { error, status } = await supabase
        .from('livro')
        .update({ 
            titulo: livro.titulo, 
            autor: livro.autor,  
            ano_publicacao: livro.ano_publicacao,
            descricao: livro.descricao,
            tags: livro.tags,
            capa: livro.capa
        }).eq('id',  id);

        if (error) {
            return error.message;
        }

        return status;
        
          
    } catch (error) {
        return error;
    }
}


export default {
    salvarLivro,
    editarLivro,
    listarLivros,
    listarLivrosDisponiveis

}