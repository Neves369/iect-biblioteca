import supabase  from "../api";
import exceptionHandler from "../utils/ExceptionHandler";

// Usado para pesquisar analises de acordo com os filtros
const listarAnalises = async (filtros: any) => {
    try {

        // Filtra os filtros vazios
        const where = Object.fromEntries(
            Object.entries(filtros).filter(([, value]) => value !== "")
        );

        // Inicia a consulta
        let query = supabase.from('full_analises').select("*");


        // Aplica os filtros dinamicamente
        for (const [key, value] of Object.entries(where)) {
            if (key === "titulo") {
                query = query.ilike("titulo_sem_acento", `%${value}%`);
            } else if (key === "autor") {
                query = query.ilike("autor_sem_acento", `%${value}%`);
            } else if (key === "ano_publicacao") {
                // query = query.eq(key, value);
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

const salvarAnalise = async (analise: any) => {
    try {
        const { status , error} = await supabase
            .from('analise')
            .insert({ 
                livro_id: analise.livro_id,
                analise: analise.analise, 
                autor: analise.autor,  
            })

        if (error) {
            return error.message;
        }

        return status; 


    } catch (error: any) {
        return error.message || 'Ocorreu um erro inesperado.';
    }
};

const editarAnalise = async (analise: any, id: any) => {
    try {
        const { status, error } = await supabase
            .from('analise')
            .update({ 
                livro_id: analise.livro_id,
                analise: analise.analise, 
                autor: analise.autor,  
            })
            .eq('id', id);

        if (error) {
            return error.message;
        }
        return status;

    } catch (error: any) {
        return error.message || 'Erro desconhecido ao editar a análise.';
    }
};



export default {
    salvarAnalise,
    editarAnalise,
    listarAnalises,

}