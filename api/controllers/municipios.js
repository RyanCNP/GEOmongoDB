import { ObjectId } from "mongodb";

export const getMunicipiosById = async (req, res) => {
    try {
        const { id } = req.params
        const db = req.app.locals.db
        const municipio = await db.collection('municipios').findOne({ _id: ObjectId.createFromHexString(id) })
        if (!municipio) {
            return res.status(404).json({ error: true, message: 'Munícipio não encontrado' })
        }
        res.status(200).json(municipio)
    } catch (error) {
        res.status(500).json({ error: true, message: 'Falha no servidor ao obter os municipios' })
        console.error(error)
    }
}

export const createMunicipio = async (req, res) => {
    try {
        const { codigo_ibge, nome, capital, codigo_uf, local } = req.body
        const db = req.app.locals.db
        const existeMunicipio = await db.collection('municipios').findOne({ codigo_ibge: codigo_ibge })
        if (existeMunicipio) {
            return res.status(409).json({ error: true, message: 'Munícipo ja cadastrado' })
        }
        const novoMunicipio = { codigo_ibge, nome, capital, codigo_uf, local }
        const result = await db.collection('municipios').findOne({ codigo_ibge: codigo_ibge })
        res.status(201).json({ _id: result.insertId, ...novoMunicipio })
    } catch (error) {
        res.status(500).json({ error: true, message: 'Falha no servidor ao criar o municipio' })
        console.error(error)
    }
}