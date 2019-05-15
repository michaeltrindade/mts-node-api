module.exports = function( req, res, next) {
    //esses headers irão permitir que meu webserver seja acessado por outra aplicação. Obs: como esse middleware nao 
    //vai jogar uma resposta pro browser, eu tenho que chamar um next(), pois se eu não chamar a requisição fica parada 
    //nesse middleware, para que dai ele possa ir para a proximo middleware do meu request
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'),
    //os headers abaixo estão sendo colocados, precisam ser suportados pela minha api
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization')
    next()
    // para finalizar, vou lá no meu server e adiciono esse trecho de codigo: const allowCors = require('./cors'), para permitir cross origin para minha api
  }