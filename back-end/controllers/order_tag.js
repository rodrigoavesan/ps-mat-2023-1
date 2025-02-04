//Importar o model correspodente ao controller
const { OrderTag, Tag, Order } = require('../models')
const order = require('../models/order')

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
        await OrderTag.create(req.body)
        // HTTP 201: Created
        res.status(201).end()
    }
    catch(error){
        console.error(error)
    }
}

controller.retrive = async (req, res) => {
    try{
        const data = await OrderTag.findAll({
            include: [
                { model: Order, as: 'order' },
                { model: Tag, as: 'tag' }
            ]
        })
        // HTTP 200: OK (implicito)
        res.send(data)
    }
    catch(error){
        console.error(error)
    }
}

controller.retriveOne = async (req, res) => {
    try{
        const data = await OrderTag.findAll()
        //HTTP 200: OK (implícito)
        res.send(data)
    }
    catch(error){
        console.error(error)
    }
}

controller.update = async (req, res) => {
    try{
       const response = await OrderTag.update(
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
       const response = await OrderTag.destroy(
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

module.exports = controller