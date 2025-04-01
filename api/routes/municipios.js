import express from 'express'
import { getMunicipiosById, createMunicipio } from '../controllers/municipios.js'
import { validateMunicipio} from '../middleware/validation.js'

const router = express.Router()

//GET Municipio by id
router.get('/:id', getMunicipiosById)
router.post('/', validateMunicipio, createMunicipio)

export default router

