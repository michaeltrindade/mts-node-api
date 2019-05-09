const mongoose = require('mongoose')
//esta classe é a responsável pela conexão com o banco e mapeamento dos nossos objetos para os documentos que serão armazenados
//module.exports = mongoose.connect('mongodb://localhost/db_finance', {useMongoClient})
module.exports = mongoose.connect('mongodb://localhost/db_finance', { useNewUrlParser: true })
// essa é a forma padrão para subscrever de forma global as mensagens de validação do mongoose
mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor do que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior do que o limite máximo de '{MAX}'."
mongoose.Error.messages.String.enum = "O '{VALUE}' não é válido para o atributo '{PATH}'."