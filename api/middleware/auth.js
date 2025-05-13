import jwt from 'jsonwebtoken';

export default async function auth(req, res, next) {
    const token = req.header('access-token');

    if (!token) return res.status(401).json({
        msg: 'Acesso negado. É obrigatório o envio do token',
    });
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.usuario = decoded.usuario; //Adicionando usuário atual na requisição
        next(); //Direcionamos para o endpoint
    } catch (e) {
        res.status(403).json({ error: 'Token inválido' });
    }
}