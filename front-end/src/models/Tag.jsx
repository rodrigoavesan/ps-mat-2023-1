import Joi from 'joi'

const EnumType = { TypeA: 'O', TypeB: 'C' };

const Tag = Joi.object({

    description: Joi.string()
        .min(2)
        .max(30)
        .required()
        .messages({'*': 'A descrição é obirgatoria (entre 2 e 30 caracteres)'}),
    
    color: Joi.string()
        .min(2)
        .max(8)
        .required()
        .messages({'*': 'A cor é obirgatoria (entre 2 e 8 caracteres)'}),

    type: Joi.string()
       .valid(...Object.values(EnumType))
       .required()
       .messages({'*': 'O tipo é obrigatório (entrada deve ser "O" ou "C")'}),

})
//Permite campos não validados, como id, createdAt e updateAt
.options({allowUnknown:true})

export default Tag