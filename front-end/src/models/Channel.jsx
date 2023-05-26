import Joi from 'joi'

const Channel = Joi.object({

    description: Joi.string()
        .min(2)
        .max(30)
        .required()
        .messages({'*': 'A descrição é obirgatoria (entre 2 e 30 caracteres)'}),
    
    commission_fee: Joi.number()
        .min(0) //Não aceita negativo
        .max(100)
        .required()
        .error(new Error('A taxa de comissão deve ser informada (entre 0 a 100)'))

})
//Permite campos não validados, como id, createdAt e updateAt
.options({allowUnknown:true})

export default Channel