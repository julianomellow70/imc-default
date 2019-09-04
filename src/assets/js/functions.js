let nome = document.querySelector("#nome");
let peso = document.querySelector("#peso");
let altura = document.querySelector ("#altura");

function calcularIMC(peso, altura){
return peso / (altura * altura);
}

document.querySelector("#btn-calcular").addEventListener("click",(event) => {
event.preventDefault();

let imc = calcularIMC(peso.value,altura.value);
//top fixed arredonda
console.log(imc.toFixed(2));
});
