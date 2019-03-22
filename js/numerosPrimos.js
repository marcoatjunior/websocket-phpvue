// Inicia os divisores em 1 (primeiro número primo)
var divisores = 1;
// Inicia o array de números primos com o primeiro
var numerosPrimos = [1];
// Verifica o valor inteira aproximado da raiz digitada
var raizInteira = parseInt(Math.sqrt(process.argv[2]));

// Inicia no primeiro valor após o primo inicial e percorre até o valor inteiro da raiz 
for (var i = 2; i <= raizInteira; i++){
	// Percorre o array de números primos enquanto houverem valores
	for (var j = 0; j < numerosPrimos.length; j++){
		// Guarda em n o valor da divisão de i pelo primo na posição atual
		var n = (i / numerosPrimos[j]);
		// Se for um número e o resto da divisão for 0, não possui pontos flutuantes
		if (Number(n) === n && n % 1 === 0){
			// Com isso, é um divisor
			divisores++;
		}
	}
	// Se possui apenas dois divisores (1 e ele mesmo), é primo
	if (divisores == 2) {
		// Guarda no array de primos o valor de i
		numerosPrimos.push(i);
		console.log(i + "\n");
	}
	// Reinicia a variável de divisores ao valor inicial
	divisores = 1;
}

// Lista os números primos até o valor informado
console.log(numerosPrimos);

// Chama função que verifica se o número informado é primo
verificaPrimalidade(numerosPrimos, process.argv[2]);

function verificaPrimalidade(primos, numero)
{
	// Atribui o array informado a uma variável de controle
    var primosMenoresQueRaiz = primos;
    // Inicia o booleano de numero primo em true
	var isPrimo = true;

	// Remove o valor 1 do array, para não considerá-lo divisível
	primosMenoresQueRaiz.shift();

	// Enquanto houverem elementos no array de primos inferiores à raiz
	for (var i = 0; i < primosMenoresQueRaiz.length; i++){
		// Guarda em n o valor da divisão do número por cada um dos primos
        var n = (numero / primosMenoresQueRaiz[i]);
        // Se for um número e o resto da divisão é zero, possui divisor e não é primo
        if (Number(n) === n && n % 1 === 0){
			// Nega o booleano
            isPrimo = false;    
        }
    }

	// Se for primo, imprime o valor e afirma. Caso contrário, nega.
	if (isPrimo){
		console.log(numero + ' é primo');
    } else {
		console.log(numero + ' não é primo');
    }
}
