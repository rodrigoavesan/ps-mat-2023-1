import Joi from 'joi'

const Carrier = Joi.object({
    name: Joi.string()

        .min(2)
        .max(30)
        .required()
        .messages({'*': 'A descrição é obirgatoria (entre 2 e 30 caracteres)'}),
    
})
//Permite campos não validados, como id, createdAt e updateAt
.options({allowUnknown:true})

export default Carrier