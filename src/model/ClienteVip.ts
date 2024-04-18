import { Cliente } from './Cliente';

export class ClienteVip extends Cliente {
    
    public endereco: string;

    constructor(id: number, nome: string, endereco: string) {
        super(id, nome);
        this.endereco = endereco
    }

    exibir2(){
        let dadosPais = super.exibir();
        console.log( dadosPais, this.toString())
    }

 

}