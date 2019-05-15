const _ = require('lodash')
const jwt = require('jsonwebtoken')
//esse bcrypt servira para criptografar a senha do usuario na hora de salvar no banco de dados
const bcrypt = require('bcrypt')
const User = require('./user')
const env = require('../../.env')

//esse senha precisa ter um digito, letra minuscula, maiuscula, caracter especial e tamano entre 6 e 12
const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,12})/
//metodo generico para resposta de erros, por motivo de segurança não quero revelar detalhes de onde vem o erro para o usuário.
const sendErrorsFromDB = (res, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return res.status(400).json({errors})
}

//obs: muito importante usar o https para não permitir que esse email e a senha não fiquem abertos na comunicação lá do browser ate o servidor. 
const login = (req, res, next) => {
    const email = req.body.email || ''
    const password = req.body.password || ''

    User.findOne({email}, (err, user) => {
        if(err){
            return sendErrorsFromDB(res, err)
        }else if (user && bcrypt.compareSync(password, user.password)){
            const token = jwt.sign(user, env.authSecret, {
                expiresIn: "1 day"
            })
            const {name, email} = user
            res.json({name, email, token})
        }else {
            return res.status(400).send({errors: ['Usuário/Senha inválidos']})
        }
    })
}

const validateToken = (req, res, next) => {
    const token = req.body.token || ''
    jwt.verify(token, env.authSecret, function(err, decoded){
        return res.status(200).send({valid: !err})
    })
}

//cadastrando usuario e senha

const signup = (req, res, next) => {
    const name = req.body.name || ''
    const email = req.body.email || ''
    const password = req.body.password || ''
    const confirmPassword = req.body.confirm_password || ''

    if(!email.match(emailRegex)){
        return res.status(400).send({errors: ['O e-mail informado está inválido']})
    }

    if(!password.match(passwordRegex)){
        return res.status(400).send({errors: [
            "Senha precisa ter: uma letra maiúscula, uma letra minúscula, um número, um caracter especial(@#$%) e tamanho entre 6 a 12."
        ]})
    }

    const salt = bcrypt.genSaltSync()
    const passwordHash = bcrypt.hashSync(password, salt)
    if(!bcrypt.compareSync(confirmPassword, passwordHash)){
        return res.status(400).send({errors: ['Senhas não confere.']})
    }

    //abaixo irei verificar se já existe esse email cadastrado, caso não existe ai sim poderei cadastrar
    User.findOne({email}, (err, user) => {
        if(err){
            return sendErrorsFromDB(res, err)
        }else if(user){
            return res.status(400).send({errors: ['Usuário já cadastrado.']})
        }else{
            //não enviar a senha sem o hash para o banco, pois a senha deve ir com o hash para ser criptografada.
            const newUser = new User({name, email, password: passwordHash})
            newUser.save(err => {
                if(err){
                    return sendErrorsFromDB(res, err)
                }else{
                    //se dé tudo certo o usuario já vai direto para o sistema, se precisar ir pra tela de login novamente.
                    login(req, res, next)
                }
            })
        }
    })
}

module.exports = {login, signup, validateToken}