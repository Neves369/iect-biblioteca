import moment from "moment";
import supabase  from "../api";
import exceptionHandler from "../utils/ExceptionHandler";


const listarEmprestimos = async (filters: any) => {
    try {
        let resp: any;
       
        if(filters.status == true){
            resp = await supabase
            .from('full_emprestimos')
            .select('*').is('data_devolucao', null);      

        }
        else{
            resp = await supabase
            .from('full_emprestimos')
            .select("*").not('data_devolucao', 'is', null);      
    
        }

        if (resp.error) {
            return resp.error.message;
        }
        return resp.data;
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

const finalizarEmprestimo = async (id: number) =>{
    
    try {
        const { error, status } = await supabase
        .from('emprestimo')
        .update({ 
            data_devolucao: moment().toISOString()
        }).eq('id',  id);
        if (error) {
            return error.message;
        }
        return status;
       
    } catch (error) {
        return exceptionHandler(error);
    }
}



export default {
    salvarEmprestimo,
    listarEmprestimos,
    finalizarEmprestimo
}