const express = require('express')
const auth = require('./auth')

module.exports = function(server){

	/**
	 * Rotas abertas, significa que essas telas ficaram visiveis para qualquer usuario
	 */

	const openApi = express.Router()
	server.use('/oapi', openApi)

	const AuthService = require('../api/user/authService')
	openApi.post('/login', AuthService.login)
	openApi.post('/signup', AuthService.signup)
	openApi.post('/validateToken', AuthService.validateToken)

	/**
	 * rotas protegidas por token JWT
	 */

	 const protectedApi = express.Router()
	 server.use('/api', protectedApi)

	 protectedApi.use(auth)
//abaixo estou usando nodejs
	 const billingCycleService = require('../api/billingCycle/billingCycleService')
	 billingCycleService.register(protectedApi, '/billingCycles')
//abaixo estou usando api do express
	 const billingSummaryService = require('../api/billingSummary/billingSummaryService')
	 protectedApi.route('/billingSummary').get(billingSummaryService.getSummary)

/**
	* //api routes
	*	const router = express.Router()
	*	server.use('/api', router)
	*
	*	/*router.route('/teste').get(function(req, res, next){
	*		res.send('funcionou')
	*	})
	*
	*	const billingCycleService = require('../api/billingCycle/billingCycleService')
	*	billingCycleService.register(router, '/billingCycles')
	*	//importando o billingSummaryService abaixo
	*	
	*	//mapeando as rotas chamando as rotas, depois passar a url que eu quero que ele fique escultando. 
	*	//e associar que metodo eu quero que ele chame quando apartir dessa rota acontça uma requisição do tipo get
	*	
 */
	

}