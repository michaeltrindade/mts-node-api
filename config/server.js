const port = 3003
//CONFIGURANDO SERVIDOR
//bodyParser é um midware que fará a interpretação do corpo das requisições vindas do browser (front-end) ou seja, do formulario. e passará para o back-end
const bodyParser = require('body-parser')

//express é baseado no conceito do midware 
const express = require('express')

//criando o servidor iniciando o express
const server = express()
//permiti crossorigin request para minha api, e depois declaro esse midlleware logo abaixo na linha 21
const allowCors = require('./cors')
// o codigo abaixo não foi preciso usar, pois funcionou direto sem usar essa dependencia.
const queryParser = require('express-query-int')

//chamando o servidor, passando o bodyParser. que será responsavel por fazer a interpretação dos dados que venham apartir da submissão de um formulario.
// urlencoded é o formato dos dados quando vc faz a submissão de um formulario lá na aplicação front-end. 
//ao usar extended true, quero dizer que ele será capaz de intepretar mais tipos de informações que venham na submissão do formulario
server.use(bodyParser.urlencoded({ extended: true }))
//após pasar pelo urlencoded ele pergunta é um json? é ! então o bodyParser.json() o transformará o corpo da requisição em um objeto para ser usado dentro da aplicação backend.
server.use(bodyParser.json())
// isso permiti que eu faça uma requisição de um dominio diferente da minha api. 
server.use(allowCors)

server.use(queryParser())

//servidor ficará escutando a porta que eu declarei lá em cima.
server.listen(port, function(){
//se dé tudo certo e ninguem estiver usando a porta ele ira imprimir uma frase BACKEND IS RUNNING ON PORT

console.log(`BACKEND is running on port ${port}.`)
})

module.exports = server