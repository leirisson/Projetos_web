function numerosAleatorios(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// manipulção de strings
const listaDeCompras = []
listaDeCompras.push("ovos", "pãoo")
console.log(listaDeCompras)
listaDeCompras.shift()
console.log(listaDeCompras)

// usando find
const listaDeNumeros = [3,7,14,29,36,42]
const valorencontrado = listaDeNumeros.find(valor => valor > 10 && valor % 7 === 0 )
console.log(`valor ${valorencontrado} > 10`)

// usando filter
const arrayAleatorio = Array.from({length: 10}, () => numerosAleatorios(1,100))
const filtrados = arrayAleatorio.filter((nums) => nums > 20)
console.log(arrayAleatorio)
console.log(filtrados)