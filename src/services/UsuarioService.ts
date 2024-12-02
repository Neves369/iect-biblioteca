import moment from "moment";
import supabase  from "../api";
import exceptionHandler from "../utils/ExceptionHandler";


const login = async (usuario: any) => {
    try {
        const { error,  data: { session } } = await supabase.auth.signInWithPassword({
            email: usuario.email,
            password: usuario.senha,
          })
      
          if (error) return error.message;

          
          if (session){
              const { data, error } = await supabase
              .from('usuario')
              .select("*")
              .eq('id',  session.user.id);
              

            if (error) {
                return error.message;
            }

            const newUser: any = {
                id: data[0].id,
                nome: data[0].nome,
                telefone: data[0].telefone,
                dataCadastro: data[0].data_cadastro,            
                email: data[0].email,
                status: data[0].status,
                tipoUsuario: data[0].tipo_usuario,
                token: session.access_token
            }

            return newUser;
        
          }
          

       
    } catch (error) {
        return exceptionHandler(error);
    }
}

const listarUsuarios = async (filtros: any) => {
    try {
        // Filtra os filtros vazios
        const where = Object.fromEntries(
            Object.entries(filtros).filter(([, value]) => value !== "")
        );

        // Inicia a consulta
        let query = supabase.from('usuario_sem_acento').select("*");

        // Aplica os filtros dinamicamente
        for (const [key, value] of Object.entries(where)) {
            if (key === "nome") {
                query = query.ilike("nome_sem_acento", `%${value}%`);
            } else if (key === "email") {
                query = query.ilike("email_sem_acento", `%${value}%`);
            } else if (key === "status") {
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



const salvarUsuario = async (usuario: any) => {

    try {
        const {
            data,
            error,
          } = await supabase.auth.signUp({
            email: usuario.email,
            password: usuario.senha,
            
            })
      
          if (error) return error.message

          if (data.user){
            const { error } = await supabase
            .from('usuario')
            .update([{ 
                nome: usuario.nome, 
                telefone: usuario.telefone,  
                email: usuario.email,
                tipo_usuario: usuario.tipoUsuario,
            }]).eq('id',  data.user.id);

            if (error) {
                return error.message;
            }

            const newUser = {
                id: data.user.id,
                nome: usuario.nome,
                telefone: usuario.telefone,
                dataCadastro: moment.now(),            
                email: usuario.email,
                status: true,
                tipoUsuario: usuario.tipoUsuario,
            }

            return newUser;
        
          }
    } catch (error) {
        return error;
    }
}

const salvarUsuario2 = async (usuario: any) => {

    try {
        const {
            data,
            error,
          } = await supabase.auth.admin.createUser({
            email: usuario.email,
            password: usuario.senha,
            
            })
      
          if (error) return error.message

          if (data){
            const { error } = await supabase
            .from('usuario')
            .update([{ 
                nome: usuario.nome, 
                telefone: usuario.telefone,  
                email: usuario.email,
                tipo_usuario: usuario.tipoUsuario,
            }]).eq('id',  data.user.id);

            if (error) {
                return error.message;
            }

            const newUser = {
                id: data.user.id,
                nome: usuario.nome,
                telefone: usuario.telefone,
                dataCadastro: moment.now(),            
                email: usuario.email,
                status: true,
                tipoUsuario: usuario.tipoUsuario,
            }

            return newUser;
        
          }
    } catch (error) {
        return error;
    }
}

const editarUsuario = async (usuarioId: string, usuario: any) => {
    try {
        const { error, status } = await supabase
        .from('usuario')
        .update({ 
            nome: usuario.nome, 
            telefone: usuario.telefone,  
            documento: usuario.documento, 
        }).eq('id',  usuarioId);

        if (error) {
            return error.message;
        }

        return status;
    
    
    } catch (error) {
        return error;
    }
}


export default {
    login,
    salvarUsuario,
    salvarUsuario2,
    editarUsuario,
    listarUsuarios
}