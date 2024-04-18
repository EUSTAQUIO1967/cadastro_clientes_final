import { Cliente } from './Cliente';

export class ListaCliente{
    private clientes: Cliente[] = [];

    static instance: ListaCliente = new ListaCliente();
    
    adicionar(cliente: Cliente): void {
        this.clientes.push(cliente);
    }

    listar(): Cliente[] {
        return this.clientes;
    }

    retornaIndice(idCliente: number):number {
        let indice: number = this.clientes.indexOf(this.clientes.find(cliente => cliente.id === parseInt(idCliente)))
        return indice;
    }

    excluir(id: number): void {
     
        //let indice = this.clientes.indexOf(this.clientes.find(element => element.id == id))
        let indice:number = this.retornaIndice(id);
        if (indice !== -1) {
            this.clientes.splice(indice,1);
        } else {
            console.log('cliente não está na base de dados')
        }
        
     
        

    }

    alterar(id:number, cpf:string, nome: string, endereco: string, telefone: string): void {
        
        let indiceDoClienteAlterar: number = this.retornaIndice(id);

        this.clientes[indiceDoClienteAlterar].cpf = cpf;
        this.clientes[indiceDoClienteAlterar].nome = nome;
        this.clientes[indiceDoClienteAlterar].endereco = endereco;
        this.clientes[indiceDoClienteAlterar].telefone = telefone;


    }

    selecionarUmCliente(idCliente: number): Cliente{
        return this.clientes.find(cliente => cliente.id === parseInt(idCliente));
    }
}