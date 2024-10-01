interface IEndereco {
    logradouro: string,
    numero: number,
    complemento: string,
    bairro: string,
    cidade: string,
    uf: string,
    cep: string,
    tipo: string,
    pais: string,
    codigoIBGECidade: number,
    status: boolean,
    enderecoPrincipal: boolean,
    motivoInativacaoEndereco: string,
    usuarioId: number,
    dataUltimaAlteracao: string,
}

export default IEndereco;

