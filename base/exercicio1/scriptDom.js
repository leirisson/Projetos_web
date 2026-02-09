// selecionando o elemento atualizado
const elemento2 = document.querySelector('#hello')
console.log(elemento2)

// manipular conteuúdo de texto
setTimeout(() => {
    elemento2.textContent = "meu novo texto"
}, 1000);

// trabalhando com atributos
const link  = document.querySelector("a")
console.log(link)

// modificando um atributo
link.setAttribute("href", "https://www.facebook.com")

// resgatando atributos
console.log(link.getAttribute("href"))

// verificando se um atributo existe
// se tiver o atributo vai imprimir: tem o atributo target
link.hasAttribute("target") ?  console.log("tem o atributo target") : console.log("foi removido o atributo target")

// removendo atributo
link.removeAttribute("target")

// verificando se um atributo existe
// se não tiver o atributo vai imprimir: foi removido o atributo target
link.hasAttribute("target") ?  console.log("tem o atributo target") : console.log("foi removido o atributo target")

/**
 * MANIPULAÇÃO DO ESTILO DA PAGINA
 * MANIPULÇÃO DO CSS
 */
const elementoTexto = document.querySelector("#texto")

// adicionando classe
elementoTexto.classList.add("minhaClasse")

// removendo classe
elementoTexto.classList.remove("minhaClasse")

// adiciona a aclasse se ela não estiver no elemento e remove a  classe se ela estiver no elemento
elementoTexto.classList.toggle("outraClasse")

// remove a classe
elementoTexto.classList.toggle("outraClasse")

//manipulando o css diretamente
elementoTexto.style.color= "Blue"


/**
 * MANIPULÇÃO DA ESTRUTURA DO DOM
 * CRIAÇÃO DE ELEMENTOS COM JAVASCRIPT
 */

/**
 * criando uma div
 * ao ser criado ele vai ser criado apenas virtualmente
 * tem que ser adicionado ao html
 *  */ 
const novoElemento = document.createElement("div")

// adicionando texto ao novo elemento
novoElemento.textContent = "Minha div feita com javascript"

// adcionando ao html
document.body.appendChild(novoElemento)

// removendo um elemento
document.body.removeChild(elementoTexto)