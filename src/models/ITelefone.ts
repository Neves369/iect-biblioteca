interface ITelefone {
    id: number,
    telefonePrincipal: boolean,
    telefone: number,
    dataUltimaAlteracao: number,     
    motivoInativacaoTelefone: string,
    status: boolean,             
    tipoTelefone: string,
    usuarioId: number,
    whatsApp: boolean,
}

export default ITelefone;


