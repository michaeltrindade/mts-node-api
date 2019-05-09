const _ = require('lodash')
// estou usando esta dependencia abaixo com um caminho relativo para ter acesso a BillingCycle, por isso usar 
//../billingCycle/billingCycle, significa que estou saindo de billingSummary, indo na pasta billingCyle e depois no arquivo billingCycle.
const BillingCycle = require('../billingCycle/billingCycle')

//criando mais um middleware, mapeamento do proprio mongodb
function getSummary(req, res){
  BillingCycle.aggregate([{
    $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}}
  }, {
    $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
  }, {
    $project: {_id: 0, credit: 1, debt: 1}
  }], function(error, result) {
    if(error) {
      res.status(500).json({errors: [error]})
    }else{
      res.json(_.defaults(result[0], {credit: 0, debt: 0}))//aqui usamos a biblioteca lodash para obter um objeto padrão emcima de uma resposta ou para fazer um forIn lá em billingCycleService na lista de erros
    }
  })
}
//expondo este modulo "classe" para que posso ser instanciada em outro modulo. 
//usando a notação reduzido do ecma script 2015 para expor este metodo.
//proximo passo é mapear esse metodo dentro das minhas rotas routes.js
module.exports = { getSummary }