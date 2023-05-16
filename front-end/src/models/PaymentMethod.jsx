import Joi from 'joi'

const PaymentMethod = Joi.object({

    description: Joi.string()
        .min(2)
        .max(30)
        .required()
        .messages({'*': 'A descrição é obirgatoria (entre 2 e 30 caracteres)'}),
    
    operator_fee: Joi.number()
        .min(0) //Não aceita negativo
        .max(100)
        .required()
        .error(new Error('A taxa de operação deve ser informada (entre 0 a 100)'))

})

export default PaymentMethod