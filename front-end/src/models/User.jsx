import Joi from 'joi'

const User = Joi.object({
 
    name: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({'*': 'O nome deve ser informado (entre 2 e 100 caracteres)'}),

    email: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({'*': 'O email deve ser informado (entre 2 e 100 caracteres)'}),
    
    verified_email: Joi.boolean()
        .required()
        .messages({'*': 'Deve falar se é  um email verificado ou não (Colocar false (Não) ou true (Sim)'}),

    
    is_admin: Joi.boolean()
        .required()
        .messages({'*': 'Deve falar se é administrador ou não (Colocar false (Não) ou true (Sim)'}),
    
    phone:Joi.string()
        .min(2)
        .max(20)
        .required()
        .messages({'*': 'O telefone deve ser informado (entre 2 e 20 caracteres)'}),

    password:Joi.string()
        .min(2)
        .max(200)
        .required()
        .messages({'*': 'A senha é obrigatoria (entre 2 e 200 caracteres)'}),

})
//Permite campos não validados, como id, createdAt e updateAt
.options({allowUnknown:true})

export default User