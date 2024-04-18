import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './style.css'

import { Cliente } from './model/Cliente';
import { ListaCliente } from './model/ListaCliente';
import { Utils } from './model/Utils';
import ListaClienteTemplate from './template/ListaClienteTemplate';


const initApp = ():void=>{

  const formCliente =document.querySelector('#formCliente') as HTMLFormElement;
 // const listaCliente = new ListaCliente(); // foi substituida pelo estatico instance da classe ListaClientes.
 
  const camposForm = formCliente.querySelectorAll('input') as NodeList;

  const inputCPF = document.querySelector('#inputCPF') as HTMLInputElement;
  const inputNome = document.querySelector('#inputNome') as HTMLInputElement;
  const inputEndereco = document.querySelector('#inputEndereco') as HTMLInputElement;
  const inputTelefone = document.querySelector('#inputTelefone') as HTMLInputElement;

  let ehPraAlterar: boolean = false;

  let idRecuperado: number = -1;

  let contador:number = 0;

 const deletar = (id: number) => {
    if ( confirm("Confirma a exclusão do cliente " + id + " ?" )) {
        ListaCliente.instance.excluir(id);
      }
      listar();
  };
  

  const selecionar = function(id : number) {
      let cliente: Cliente = ListaCliente.instance.selecionarUmCliente(id);
      idRecuperado = id;
      inputCPF.value = cliente.cpf;
      inputNome.value = cliente.nome;
      inputEndereco.value = cliente.endereco;
      inputTelefone.value = cliente.telefone;

      ehPraAlterar = true; // será usado como flag na hora de incluir ou alterar
  }



  const alterarCliente = (id: number):void => {
    
        ListaCliente.instance.alterar(id, 
          Utils.mascCPF(inputCPF.value), 
          inputNome.value, 
          inputEndereco.value,
          Utils.mascTelefone(Utils.retiraMascaraTelefone(inputTelefone.value))
          )

  }

  
  
  // CRIAR VALIDAÇÃO ANTES DE INCLUIR/ALTERAR

  formCliente.addEventListener('submit', (event) => {
    event.preventDefault();
   
    Utils.limpaErros();

    let resultValidacao: Array = Utils.validarCampos(camposForm);

    
    if (resultValidacao.length === 0) {
      
      if (!ehPraAlterar){
        const cliente = new Cliente( ++contador, Utils.mascCPF(inputCPF.value), inputNome.value, inputEndereco.value, Utils.mascTelefone(Utils.retiraMascaraTelefone(inputTelefone.value)));
        ListaCliente.instance.adicionar(cliente);
        listar();
      } else {
        alterarCliente(idRecuperado);
        listar();
      }
      
      Utils.limpaCampos(camposForm) ; // manda limpar todos os campos input do form
   
    } else {
      // console.log(resultValidacao);
    
      let divErros = document.createElement('div') as HTMLDivElement;
      
      divErros.classList.add('erros');
      
      for (let erro of resultValidacao) {
          let p = document.createElement('p')
          p.textContent =  erro;
          divErros.appendChild(p);
      }
        formCliente.appendChild(divErros);
    }

    
  })

   // Atualiza a lista de clientes
   document.querySelector("#btnListar")?.addEventListener('click', () => listar());
      

  const listar = () => {
    let listaDeClientes: Cliente[] = ListaCliente.instance.listar();
    ListaClienteTemplate.renderizar(listaDeClientes);
    pegarElementos('bt-excluir');
    pegarElementos('bt-alterar');
   }

               
   
  // adiciona eventos de click nos botões deletar e excluir
   const pegarElementos = (tipo) => {
        let elementosExcluir = document.querySelectorAll(`[${tipo}]`);
        [...elementosExcluir].forEach(elemento => {
            let elementoId = elemento.getAttribute(tipo)
            //console.log(elemento.getAttribute('bt-excluir'));
            elemento.addEventListener('click', function(event) {
                event.preventDefault();
                  if (tipo === 'bt-excluir'){
                    deletar(elementoId);
                  } else {
                    selecionar(elementoId)
                  }
                             
            } )
        })

   };

   


   //const adicionaEventoClick = (elemento, comando) => elemento.addEventListener('click', comando);

}

document.addEventListener('DOMContentLoaded', initApp)