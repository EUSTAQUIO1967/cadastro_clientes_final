type ArrayString = {
    valor: string;
}

export class Utils {

    static limpaCampos(nodelist): void {
        [...nodelist].forEach((campo<HTMLInputElement>) => {
            campo.value = "";
            campo.classList.remove('destaque');

        })
    }

    static limpaErros(): void {
        let divErros = document.querySelector('.erros') as HTMLDivElement;
        if (divErros) {
            divErros.remove();
        }
    }

    static validaCPF(strCPF: string | any) {

        let cpfsInvalidos = [
            "00000000000",
            "11111111111",
            "22222222222",
            "33333333333",
            "44444444444",
            "55555555555",
            "66666666666",
            "77777777777",
            "88888888888",
            "99999999999"
        ]


        let cpfSemMasc: string = strCPF.replaceAll(/[- \\. a-zA-Z]/g, '');
        let somaDosDigitos: number = 0;
        let multiplicador: number = 10;


        // se o cpf informado estiver entre os cpfs invalidos encerra rotina
        if ((cpfsInvalidos.indexOf(cpfSemMasc) >= 1)) {
            return false;
        }

        // processa os primeiros 9 numeros para achar o primeiro digito
        for (let i: number = 0; i < 9; i++) {
            somaDosDigitos += parseInt(cpfSemMasc[i]) * multiplicador--;
        }

        let restoDaDivisao: number = (somaDosDigitos * 10) % 11;

        console.log('1', restoDaDivisao)

        let primeiroDigito: number = restoDaDivisao;

        if (restoDaDivisao === 10 || restoDaDivisao === 11) {
            primeiroDigito = 0
        }

        console.log('primeirodirigo', primeiroDigito)
        const cpfComPrimeiroDigitoCalculado: string = cpfSemMasc.slice(0, 9) + primeiroDigito.toString();

        // calculo do segundo digito
        multiplicador = 11;
        somaDosDigitos = 0;

        for (let i: number = 0; i < cpfComPrimeiroDigitoCalculado.length; i++) {
            somaDosDigitos += parseInt(cpfComPrimeiroDigitoCalculado[i]) * multiplicador--
        }

        restoDaDivisao = (somaDosDigitos * 10) % 11

        let segundoDigito: number = restoDaDivisao;

        if (restoDaDivisao === 10 || restoDaDivisao === 11) {
            segundoDigito = 0
        }

        console.log(segundoDigito)
        const cpfCompleto: string = cpfComPrimeiroDigitoCalculado + segundoDigito.toString();
        return (cpfCompleto === cpfSemMasc) ? true : false;

    }

    static retiraMascaraTelefone(telefone): string {
        let telefoneStr = telefone.toString().replace(/[- \\(\\)\\.]/gi, '');
        return telefoneStr;
    }

    static mascTelefone(telefone: string): string {

        let telefoneStr: string = this.retiraMascaraTelefone(telefone)


        if (telefoneStr.length === 11) {
            return `(${telefoneStr.substring(0, 2)}) ${telefoneStr.substring(2, 7)}-${telefoneStr.substring(7, 11)}`; // 31999975708
        } else if (telefoneStr.length === 10) {
            return `(${telefoneStr.substring(0, 2)}) ${telefoneStr.substring(2, 6)}-${telefoneStr.substring(6, 10)}`; // 31999975708
        }

    }

    static mascCPF(cpf: string): string {

        let cpfStr = cpf.toString().replace(/[- \\. a-zA-Z]/g, '');
        return `${cpfStr.substring(0, 3)}.${cpfStr.substring(3, 6)}.${cpfStr.substring(6, 9)}-${cpfStr.substring(9, 11)}`;

    }


    static validarCampos(campos: NodeList): Array<ArrayString>{
        const resultValidacao: Array = [];

        [...campos].forEach(campo => {

            if (campo.name === 'cpf' && !Utils.validaCPF(campo.value)) {
                resultValidacao.push(`O CPF ${campo.value} inválido!`)
                campo.classList.add('destaque')
            }

            if (campo.name === 'nome' && (campo.value === '' || campo.value.length <= 10)) {
                resultValidacao.push(`O nome do cliente é obrigatório e precisa ter mais de 10 caracteres!`)
                campo.classList.add('destaque')
            }

            if (campo.name === 'endereco' && campo.value === '') {
                resultValidacao.push(`O Endereço é obrigatório!`)
                campo.classList.add('destaque')
            }

            if (campo.name === 'telefone') {
                let telefone = this.retiraMascaraTelefone(campo.value)
                if (telefone === '') {
                    resultValidacao.push(`O número de telefone é obrigatório!`)
                    campo.classList.add('destaque')
                } else if (!(telefone.trim().length === 10 || telefone.trim().length === 11)) {
                    resultValidacao.push(`São esperados 10 ou 11 numeros para o telefone com o DDD e sem máscara!!!`)
                    campo.classList.add('destaque')
                }



            }

        });

        return resultValidacao;


    }


    



    static capitularTexto(texto: string): string {
        const arrTexto = texto.split(" ");
        const excludes: ArrayString  = ['de', 'do', 'da', 'dos', 'das'];
        let remonta: string = '';
        arrTexto.forEach(parte => {
           for (let i = 0; i < parte.length; i++) {
                if (i === 0 && excludes.indexOf(parte.toLowerCase()) === -1) {
                     remonta += parte[i].toUpperCase();
                      
                    } else {
                        if(i <(parte.length -1)){
                            remonta += parte[i].toLowerCase()
                        } else {
                            remonta += parte[i].toLowerCase() + " "
                        }
                    
                        
                    }
                

            }


        });
        return remonta;
    }


    static criaTd(): HTMLTableCellElement {
        return document.createElement('td');
    }
        

}