export enum Permissao {
    "CADASTRAR_USUARIO", 
    "PESQUISAR_USUARIO",
    "CADASTRAR_PERFIL_ACESSO",
    "PESQUISAR_PERFIL_ACESSO"

}

export const PermissaoLabel = new Map<string, string>([
    ["CADASTRAR_USUARIO", 'Cadastrar Usuário'], 
    ["PESQUISAR_USUARIO", 'Pesquisar Usuário'],
    ["CADASTRAR_PERFIL_ACESSO", 'Cadastrar Perfil Acesso'],
    ["PESQUISAR_PERFIL_ACESSO", 'Pesquisar Perfil Acesso']
])

interface IPermissao {
    id:	number,
    perfilAcessoId:	number
    permissao:	string
}

export default IPermissao;