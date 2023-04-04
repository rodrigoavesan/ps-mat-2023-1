//Importar o model correspodente ao controller
const { User } = require('../models')
const bycript = require('bcrypt')
const jwt = require('jsonwebtoken')

const controller = {} //Objeto Vazio

/*
    Métodos CRUD do controller 
    Create: cria um novo registros
    retrive: lista(recupera) todos os registros
    retriveOne: lista(recupera) apenas um registro
    update: atualiza um registro
    delete: deleta um registro
*/

controller.create = async (req, res) => {
    try{
        //Cripitografia de senha
        req.body.password = await bycript.hash(req.body.password, 12)

        await User.create(req.body)
        // HTTP 201: Created
        res.status(201).end()
    }
    catch(error){
        console.error(error)
    }
}

controller.retrive = async (req, res) => {
    try{
        const data = await User.findAll()
        // HTTP 200: OK (implicito)
        res.send(data)
    }
    catch(error){
        console.error(error)
    }
}

controller.retriveOne = async (req, res) => {
    try{
        const data = await User.findByPk(req.params.id)

        // HTTP 200: OK (implicito)
        if(data) res.send(data)

        // HTTP 200: OK (implicito)
        else res.status(404).end()        
    }
    catch(error){
        console.error(error)
    }
}

controller.update = async (req, res) => {
    try{

        //Se houver sido passado o campo "password", criptografa a senha
        if(req.body.password){
            req.body.password = await bycript.hash(req.body.password, 12)
        }

       const response = await User.update(
        req.body,
            { where: { id: req.params.id }}
       )
       
       //response retorna um vetor. O primeiro elemento do vetor indica quantos registros foram afetados pelo update
       if(response [0] > 0){
         //HTTP 204: No content
         res.status(204).end()
       }
       else { //Não encontrou o registro para atualizar 
         //HTTP 404: Not found
         res.status(404).end()
       }
    }
    catch(error){
        console.error(error)
    }
}

controller.delete = async (req, res) => {
    try{
       const response = await User.destroy(
        { where: { id: req.params.id }}
       )
       
       if(response){ // Encontrou e excluiu
         //HTTP 204: No content
         res.status(204).end()
       }
       else {  // Não encontrou e não excluiu
         //HTTP 404: Not found
         res.status(404).end()
       }
    }
    catch(error){
        console.error(error)
    }
}

controller.login = async (req, res) => {    
    try{
        const user = await User.scope('withPassword').findOne({where: {email: req.body.email} })

        //Usuario não encontrado -> HTTP 401: Unauthorized
        if(!user) return res.status(401).end()

        const pwMatches = await bycript.compare(req.body.password, user.password)

        if(pwMatches){
             //A senha confere
            const token = jwt.sign({
                id: user.id,
                name: user.name,
                email: user.email,
                verified_email: user.verified_email,
                phone: user.phone
            },
            process.env.TOKEN_SECRET,   //Chave para criptografar o token
                {expiresIn: '24h'}      //Duração do token
            )
            //Retorna o token -> HTTP 200:OK (implicito)
            res.json({auth: true, token})
        }
        else {
            //Senha errada -> HTTP 401: Unathorized
            res.status(401).end()
        }
       
        
    }
    catch(error){
        console.error(error)
    }
}

module.exports = controller