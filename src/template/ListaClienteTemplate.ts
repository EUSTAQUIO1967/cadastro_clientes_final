import { Utils } from "../model/Utils";

export default class ListaClienteTemplate {

    static renderizar(listaDeClientes:ListaClientes) {

            const saidaDaLista = document.querySelector('#listaCliente') as HTMLTableSectionElement;

            saidaDaLista.innerHTML = '';  
            for ( let cliente of listaDeClientes) {
               let tr = document.createElement('tr') as HTMLTableRowElement;
               let btnExcluir = document.createElement('button');
               btnExcluir.textContent = "Excluir";
               btnExcluir.setAttribute('bt-excluir', cliente.id);
               btnExcluir.classList.add('btn','btn-danger');
               let td = Utils.criaTd();
               td.appendChild(btnExcluir);
               tr.innerHTML = `
                              <td>${cliente.id}</td>
                              <td>${cliente.cpf}</td>
                              <td>${cliente.nome}</td>
                              <td>${cliente.endereco}</td>
                              <td>${cliente.telefone}</td><td>
                              `
               tr.appendChild(td)
               td = Utils.criaTd();
              let btnAlterar= document.createElement('button');
              btnAlterar.textContent = 'Alterar'
              btnAlterar.classList.add('btn', 'btn-warning');
              btnAlterar.setAttribute('bt-alterar', cliente.id)
              td.appendChild(btnAlterar)
              tr.appendChild(td)
              saidaDaLista?.appendChild(tr);
            }

           } 

   
}
