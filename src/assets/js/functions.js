let nome = document.querySelector("#nome");
let peso = document.querySelector("#peso");
let altura = document.querySelector ("#altura");

let tabela = document.querySelector('.table');

function calcularIMC(peso, altura){
return peso / (altura * altura);
}

function limparCampos (){
  nome.value = "";
  peso.value = "";
  altura.value = "";
  nome.focus();
}



//deletar linha
function deletarLinha (indice){
  let pessoas = JSON.parse(localStorage.getItem("listaIMC"));
  pessoas.splice(indice,1);
  localStorage.setItem("listaIMC", JSON.stringify(pessoas));
  carregarLocalStorage();
  mostrarMensagem("IMC deletado!", "delete");
}




function limparTabela(){
let qtdLinhas = tabela.rows.length;

for(let i = qtdLinhas -1; i>0; i--){
  tabela.deleteRow(i);
}
}

function carregarLocalStorage(){
limparTabela();

if (localStorage.getItem("listaIMC")) {
  let listaIMC = JSON.parse(localStorage.getItem("listaIMC"));

  listaIMC.forEach((pessoa, indice) => {
    addTabela(pessoa.nome, pessoa.peso, pessoa.altura, pessoa.imc,indice);

  });
}

}



function addLocalStorage (nome,peso,altura, imc){
  //cria um objeto JSON pessoa
  let pessoa = {
    "nome" : nome,
    "peso" : peso,
    "altura": altura,
    "imc":imc
  }
//testa se existe a chave listaIMC
if (localStorage.getItem("listaIMC")) {
  //cria listaIMC (objeto JSON) que chega como String
  let listaIMC = JSON.parse(localStorage.getItem("listaIMC"));
  //adiciona objeto pessoa
  listaIMC.push(pessoa);
  //adciona no storage o objeto JSON em formato de String
  localStorage.setItem("listaIMC", JSON.stringify(listaIMC));
  mostrarMensagem("IMC cadastrado com sucesso!", "add");
} else {
  //cria um array de objetos
  let listaIMC = [];
  //adiciona um objeto no array
  listaIMC.push(pessoa);
  //adiciona no localstorage como string
  localStorage.setItem("listaIMC", JSON.stringify(listaIMC));
  mostrarMensagem("IMC cadastrado com sucesso!", "add");
}
}


function addTabela (nome,peso,altura, imc,indice ){

  //criar elemento no html
    let colunaNome = document.createElement('td');
    colunaNome.innerHTML = nome;
    let colunaPeso = document.createElement('td');
    colunaPeso.innerHTML = peso;
    let colunaAltura = document.createElement('td');
    colunaAltura.innerHTML = altura;
    let colunaIMC = document.createElement('td');
    //criando um botão

    let colunaDeletar = document.createElement('td');
    let btnDeletar = document.createElement('button');
    //adicionando html dentro do botão 
    btnDeletar.innerHTML = "<img src = 'assets/images/delete.svg'>";
    //informando a class da tag html
    btnDeletar.classList.add ('btn');
    btnDeletar.classList.add ('btn-danger');
    //dizer que botao é filha de coluna
    colunaDeletar.appendChild(btnDeletar);

    //dando valor para o elemento no HTML
    colunaIMC.innerHTML = imc;

    let linha = document.createElement('tr');
    //tr é filha de td
    linha.appendChild(colunaNome);
    linha.appendChild(colunaPeso);
    linha.appendChild(colunaAltura);
    linha.appendChild(colunaIMC);
    linha.appendChild(colunaDeletar);
    //tabela é filha de linha
    tabela.appendChild(linha);
    //Listener para Deletar
btnDeletar.addEventListener("click",(event) => {
  event.preventDefault();
  deletarLinha(indice);

  });

  

}

let mensagem = document.querySelector("#mensagem");
function mostrarMensagem(msg, tipo){
  mensagem.innerHTML = msg;
  mensagem.classList.remove('d-none');

  if (tipo == "add") {
    mensagem.classList.add('alert-success')
  } else if (tipo == "delete") {
    mensagem.classList.add('alert-danger');
  }

setTimeout(()=>{
  mensagem.innerHTML = "";
  mensagem.classList.remove('alert-success');
  mensagem.classList.remove('alert-danger');
  mensagem.classList.add('d-none');
},2000);



}

document.querySelector("#btn-calcular").addEventListener("click",(event) => {
event.preventDefault();

let imc = calcularIMC(peso.value,altura.value);

//Chama a função addTabela
addTabela(nome.value,peso.value,altura.value,imc.toFixed(2));

addLocalStorage(nome.value,peso.value,altura.value,imc.toFixed(2));

carregarLocalStorage();

limparCampos();
//top fixed arredonda
console.log(imc.toFixed(2));
});
