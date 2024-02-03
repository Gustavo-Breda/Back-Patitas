import {body} from "express-validator"

function validatorUser (method:string)
{
    switch(method)
    {
        case "create":{
            return[
                body("email").exists().withMessage("O campo não pode ser nulo")
                .isLength({min:1})
                .withMessage("O corpo de email deve ser preenchido")
                .isEmail()
                .withMessage('Precisa ser como exemplo@exemplo'),

                body("nome").exists().withMessage("O campo não pode ser nulo")
                .isLength({min:2})
                .withMessage("O nome deve ter no mínimo duas letras")
                .isString()
                .withMessage('Valor deve ser uma string'),
            ]
        }
    }
}

export {validatorUser}