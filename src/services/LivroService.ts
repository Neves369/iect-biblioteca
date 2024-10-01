import supabase  from "../api";
import exceptionHandler from "../utils/ExceptionHandler";


const listarLivros = async () => {
    try {
        
        const { data, error } = await supabase
        .from('livro')
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
    listarLivros
}