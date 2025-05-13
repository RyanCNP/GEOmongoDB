import { ObjectId } from "mongodb";
//bcryptjs -> Criptografar o conteúdo
//jsonwebtoken -> Para gerar o JWT
//npm i bcryptjs jsonwebtoken
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUsuario = async (req, res) => {
    req.body.avatar = `https://ui-avatar.com/api/?name=${req.body.nome.replace(/ /g, '+')}&background=F00&color=FFF`
    //criptografia da senha
    const salt = await bcrypt.genSalt(10)   //10 rodadas de processamento hash
    req.body.senha = await bcrypt.hash(req.body.senha, salt) //Salvando o usuário...
    const db = req.app.locals.db
    await db.collection('usuarios')
        .insertOne(req.body)
        .then(result => req.status(201).send(result)
            .catch(err => res.status(400).json(err))
        )
}

export const efetuaLogin = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const db = req.app.locals.db;
        //Verifica se o email existe no MongoDB
        let usuario = await db.collection('usuarios').find({ email }).limit(1).toArray();
        //Se o array estiver vazio, é porque não tem...
        if (!usuario.length()) {
            return res.status(404).json({
                erros: [{
                    value: `${email}`,
                    msg: `O email ${email} não está cadastrado`,
                    param: 'email'
                }]
            });
        };
        //Verificando a senha...
        const isMatch = await bcrypt.compare(senha, usuario[0].senha);
        if (!isMatch) {
            return res(403).json({//forbidden
                errors: [{
                    value: 'senha',
                    msg: 'A senha informada está incorreta',
                    param: 'senha'
                }]
            });
        };
        //Se tudo ok, iremos gerar o token JWT
        jwt.sign(
            { usuario: { i: usuario[0]._id } },
            process.env.SECRET_KEY,
            { expiresIn: 'process.env.EXPIRES_IN' },
            (err, token) => {
                if (err) throw err
                res.status(200).json({
                    acces_token: token,
                    msg: 'Login efetuado com sucesso'
                })
            }
        )
    } catch (e) {
        console.error(e);
    }

}