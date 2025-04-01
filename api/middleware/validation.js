import { check, param, validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const validateMunicipio = [
    check('codigo_ibge')
        .notEmpty()
        .withMessage('Codigo IBGE obrigatorio')
        .isInt({ min: 1000000, max: 9999999 })
        .withMessage('Codigo IBGE deve ser um inteiro com 7 digitos'),
    check('nome')
        .notEmpty()
        .withMessage('Nome obrigatorio')
        .isLength({ max: 100 })
        .withMessage('Nome deve ter no maximo 100 caracteres'),
    check('capital')
        .notEmpty()
        .withMessage('Capital deve ser um Booleano'),
    check('local')
        .notEmpty()
        .withMessage('Local é obrigatorio')
        .isObject()
        .withMessage('Local deve ser um Objeto'),
    check('local.type')
        .notEmpty()
        .withMessage('Local.type obrigatorio')
        .equals('Point')
        .withMessage('Local.type deve ser Point'),
    check('local.coordinates')
        .notEmpty()
        .withMessage('Local.coordinates obrigatorio')
        .isArray({ min: 2, max: 2 })
        .withMessage('As cordenadas devem ser um array com Latitude e Longitude'),
    check('local.coordinates.0')
        .isFloat({ min: -180, max: 180 })
        .withMessage('Latitude deve estar entre -180 e 180'),
    validateRequest
]