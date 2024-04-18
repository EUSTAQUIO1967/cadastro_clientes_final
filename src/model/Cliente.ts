export class Cliente{
    id: number;
    cpf: string;
    nome: string;
    endereco: string;
    telefone: string;
  

    constructor(id: number, cpf: string, nome:string, endereco: string, telefone: string){
        this.id = parseInt(id);
        this.cpf = cpf;
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
    }

    toString() {
        return `${this.id} ${this.nome}`
    }

    exibir() {
        console.log(this.toString())
    }


}
  

