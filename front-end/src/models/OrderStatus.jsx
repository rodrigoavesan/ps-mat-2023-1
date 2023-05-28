import Joi from 'joi'

const OrderStatus = Joi.object({
    sequence: Joi.number()
        .min(1)
        .max(30)
        .required()
        .messages({'*': 'É obirgatoria o ID da encomenda (entre 1 e 30 caracteres)'}),

    description: Joi.string()
        .min(2)
        .max(30)
        .required()
        .messages({'*': 'É obirgatoria a descrição do status do pedido (entre 2 e 30 caracteres)'})
    
})
//Permite campos não validados, como id, createdAt e updateAt
.options({allowUnknown:true})

export default OrderStatus