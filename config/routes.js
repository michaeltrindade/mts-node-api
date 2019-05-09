const express = require('express')

module.exports = function(server){
	//api routes
	const router = express.Router()
	server.use('/api', router)

	/*router.route('/teste').get(function(req, res, next){
		res.send('funcionou')
	})*/

	const billingCycleService = require('../api/billingCycle/billingCycleService')
	billingCycleService.register(router, '/billingCycles')
	//importando o billingSummaryService abaixo
	const billingSummaryService = require('../api/billingSummary/billingSummaryService')
	/*mapeando as rotas chamando as rotas, depois passar a url que eu quero que ele fique escultando. 
	e associar que metodo eu quero que ele chame quando apartir dessa rota acontça uma requisição do tipo get*/
	router.route('/billingSummary').get(billingSummaryService.getSummary)

}