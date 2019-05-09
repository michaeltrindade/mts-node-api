const _ = require('lodash')
const BillingCycle = require('./billingCycle')

//o codigo abaixo integra todas as chamadas ao mongoose com a parte do banco e tambem a integração com as rotas do express
BillingCycle.methods(['get','post','put','delete'])
//na lina abaixo serve para todas as vezes que eu fizer uma atualização no objeto, será retornado o objeto atualizado.
BillingCycle.updateOptions({new: true, runValidators: true})


//melhorando o tratamento de errors e retornando todos em uma mesmo array, o node tem a habilidade de interceptar antes ou depois requisições get, post, put, delete ...
//anexando middleware as requisições antes delas irem ao banco ou depois(after). segue o exemplo abaixo que tratará requisiçoes post e put
BillingCycle.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

function sendErrorsOrNext(req, res, next) {
	//abaixo irei o usar o objeto bandle, ele tem os erros dentro dele, aquilo que foi persistido e retornando os erros padronizados
	const bundle = res.locals.bundle

	if(bundle.errors) {
		var errors = parseErrors(bundle.errors)
		res.status(500).json({errors})
	}else{
		next()
	}
}

function parseErrors(nodeRestFulErrors){
	const errors = []
	_.forIn(nodeRestFulErrors, error => errors.push(error.message))
	return errors
}

//abaixo esta o serviço que vai retornar a quantidade de ciclos de pagamentos que estão persistidos no banco. este serviço
// vai ser necessario quando formos implementar a paginação no fron end 
BillingCycle.route('count', function(req, res, next) {
	BillingCycle.count(function(error, value) {
		if(error){
			res.status(500).json({errors: [error]})
		}else{
			res.json({value})
		}

	})

})

module.exports = BillingCycle