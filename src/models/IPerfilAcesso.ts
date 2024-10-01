import IPermissao from "./IPermissao";

interface IPerfilAcesso {
    dataUltimaAlteracao: string,
    dataCriacao: string,
    descricao: string,
    id:	number,
    permissoes:	[IPermissao],
    status:	boolean,
    usuarioCriacaoId: number,
    usuarioUltimaAlteracaoId: number
}

export default IPerfilAcesso;