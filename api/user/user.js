const restful = require('node-restful')
const mongoose = restful.mongoose

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, min: 6, max: 12, required: true}
})
//este arquivo faz o mapeamento objeto documento que vai ser armazenado no mongodb, e abaixo estou exportando o modelo
module.exports = restful.model('User', userSchema)