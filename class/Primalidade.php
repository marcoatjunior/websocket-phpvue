<?php
/**
 * Created by PhpStorm.
 * User: ti
 * Date: 22/03/19
 * Time: 13:28
 */

class Primalidade
{
    /**
     * Verifica se um número é primo, de acordo com os primeiros menores à raiz dele.
     *
     * @param $numero
     * @return bool
     */
    public static function isPrimo($numero)
    {
        // Inicia os divisores em 1 (primeiro número primo)
        $divisores = 1;

        // Inicia o array de números primos com o primeiro
        $numerosPrimos = [1];

        // Verifica o valor inteira aproximado da raiz digitada
        $raizInteira = (int) floor((sqrt($numero)));

        // Inicia no primeiro valor após o primo inicial e percorre até o valor inteiro da raiz
        for ($i = 2; $i <= $raizInteira; $i++) {
            // Percorre o array de números primos enquanto houverem valores
            for ($j = 0; $j < count($numerosPrimos); $j++) {
                // Guarda em n o valor da divisão de i pelo primo na posição atual
                $n = (float) ($i / $numerosPrimos[$j]);

                // Se não possui pontos flutuantes, é divisor
                if ($n % 1 == 0) {
                    $divisores++;
                }
            }

            // Se possui apenas dois divisores (1 e ele mesmo), é primo
            if ($divisores == 2) {
                // Guarda no array de primos o valor de i
                array_push($numerosPrimos, $i);
            }

            // Reinicia a variável de divisores ao valor inicial
            $divisores = 1;
        }

        // Chama função que verifica se o número informado é primo
        return self::verificaPrimalidade($numerosPrimos, $numero);
    }

    /**
     * Verifica se o número informado é divisível por alguns dos primos inferiores à raiz dele.
     *
     * @param $primos
     * @param $numero
     * @return bool
     */
    private static function verificaPrimalidade($primos, $numero)
    {
        // Atribui o array informado a uma variável de controle
        $primosMenoresQueRaiz = $primos;

        // Inicia o booleano de numero primo em true
        $isPrimo = true;

        // Remove o valor 1 do array, para não considerá-lo divisível
        array_shift($primosMenoresQueRaiz);

        // Enquanto houverem elementos no array de primos inferiores à raiz
        for ($i = 0; $i < count($primosMenoresQueRaiz); $i++) {
            // Guarda em n o valor da divisão do número por cada um dos primos
            $n = (float) ($numero / $primosMenoresQueRaiz[$i]);

            // Se for divisível (inteiro), não é primo
            if ((int) ($n) == $n) {
                $isPrimo = false;
            }
        }

        return $isPrimo;
    }
}