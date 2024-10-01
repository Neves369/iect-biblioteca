interface IEmail {
    id: number,
    usuarioId: number,
    email: string,
    emailPrincipal: boolean,
    motivoInativacaoEmail: string,
    status: boolean,
    dataUltimaAlteracao: string,
}

export default IEmail;