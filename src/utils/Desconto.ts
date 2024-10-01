export function calcularDesconto(precoAntigo: any, precoNovo: any) {
    // Verificar se os preços são válidos e diferentes de zero
    if (precoAntigo <= 0 || precoNovo <= 0) {
        return "Preços inválidos. Certifique-se de que os valores sejam maiores que zero.";
    }

    // Calcular a diferença entre o preço antigo e o preço novo
    const diferenca = precoAntigo - precoNovo;

    // Calcular a porcentagem de desconto
    let descontoPercentual: any = (diferenca / precoAntigo) * 100;

    // Arredondar o resultado para duas casas decimais
    descontoPercentual = Math.round(descontoPercentual * 100) / 100;

    return descontoPercentual.toFixed(0) + "%";
}

