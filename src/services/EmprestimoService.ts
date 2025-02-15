import moment from "moment";
import supabase  from "../api";
import exceptionHandler from "../utils/ExceptionHandler";


const listarEmprestimos = async (filters: any) => {
    try {

        // Filtra os filtros vazios
        const where = Object.fromEntries(
            Object.entries(filters).filter(([, value]) => value !== "")
        );

        // Inicia a consulta
        let query = supabase.from('full_emprestimos').select("*");

        // Aplica os filtros dinamicamente
        for (const [key, value] of Object.entries(where)) {
            if (key === "usuario") {
                query = query.ilike("usuario_nome", `%${value}%`);
            } else if (key === "livro") {
                query = query.ilike("livro_titulo", `%${value}%`);
            } else if (key === "status") {
                if(value == true){
                    query = query.is('data_devolucao', null);
                }
                if(value == false){
                    query = query.not('data_devolucao', 'is',  null);
                }
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

const listarEmprestimosVencendo = async (user: any) => {
    try {

        if(user.tipoUsuario == "master"){
            const { data, error } = await supabase
            .from('emprestimos_vencendo')
            .select("*");
            
            if (error) {
                return error.message;
            }

            return data;
        }
        else{
            const { data, error } = await supabase
            .from('emprestimos_vencendo')
            .select("*")
            .eq('usuario_nome',  user.nome);
            
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
    // console.log(emprestimo)
    try {
        const { error, status } = await supabase
        .from('emprestimo')
        .insert({ 
            usuario_id: emprestimo.usuario_id, 
            livro_id: emprestimo.livro_id,
            previsao_devolucao: moment().add(emprestimo.prazoEmprestimo, 'days').toISOString()
        });

        if (error) {
            return error.message;
        }

        return status;
        
          
    } catch (error) {
        return error;
    }
};

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
};



export default {
    salvarEmprestimo,
    listarEmprestimos,
    finalizarEmprestimo,
    listarEmprestimosVencendo
}