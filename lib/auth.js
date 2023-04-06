const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    //É necessário ter o token para continuar
    const beareHeader = req.headers['authorization']

    //token não foi passado ~>s
    if(!beareHeader) return res.status(403).end()

    //Extrai o token de dentro da cabeçalho "authorization"
    const temp = beareHeader.split(' ')
    const token = temp[1]

    //Validando o token
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {

        //Token invalido ou expirado ~~> HTTP 403: Forbidden
        if(error) return res.status(403).end()

        //Se chegamos até aqui, o token está OK e temos as informações do usuário logado na parâmetro "decoded". Vamos guardar isso na request para usar depois
        req.authUser = decoded

        console.log({authUser: req.authUser})

        next()
    })  
}