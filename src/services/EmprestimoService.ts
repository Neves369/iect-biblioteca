import supabase  from "../api";
import exceptionHandler from "../utils/ExceptionHandler";


const listarEmprestimos = async () => {
    try {
        
        const { data, error } = await supabase
        .from('full_emprestimos')
        .select("*");      

        if (error) {
            return error.message;
        }
        return data;
    } catch (error) {
        return exceptionHandler(error);
    }
}

const salvarEmprestimo = async (emprestimo: any) => {
    try {
        const { error, status } = await supabase
        .from('emprestimo')
        .insert({ 
            usuario_id: emprestimo.usuario_id, 
            livro_id: emprestimo.livro_id
        });

        if (error) {
            return error.message;
        }

        return status;
        
          
    } catch (error) {
        return error;
    }
}



export default {
    salvarEmprestimo,
    listarEmprestimos
}