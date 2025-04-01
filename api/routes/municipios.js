import express from 'express'
import { getMunicipiosById } from '../controllers/municipios.js'
import { validateMunicipio, createMunicipio} from '../middleware/validation.js'

const router = express.Router()

//GET Municipio by id
router.get('/:id', getMunicipiosById)
router.post('/', validateMunicipio, createMunicipio)

export default router

