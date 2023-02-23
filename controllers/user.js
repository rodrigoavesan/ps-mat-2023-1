//Importar o model correspodente ao controller
const { User } = require('../models')

const controller = {} //Objeto Vazio

/*
    Métodos CRUD do controller 
    Create: cria um novo registro
    retrive: lista(recupera) todos os registros
    retriveOne: lista(recupera) apenas um registro
    update: atualiza um registro
    delete: deleta um registro
*/

controller.create = async (req, res) => {
    try{
        await User.create(req.body)
        // HTTP 201: Created
        res.status(201).end()
    }
    catch(error){
        console.error(error)
    }
}

module.exports = controller