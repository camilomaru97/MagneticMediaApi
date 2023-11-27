const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/Usuario');
const { emailRegistro } = require('../helpers/emails');

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya tienes una cuenta asociada, habla con el administrador'
            });
        }

        usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);
        usuario.token = token;

        await usuario.save();

        emailRegistro({
            name: usuario.name,
            email: usuario.email,
            token
        })

        res.status(201).json({
            ok: true,
            name: usuario.name,
            token,
            msg: 'Verifica tu cuenta! Acabamos de enviarte un correo'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Upss! parece que tu correo o contraseña no son correctos'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const revalidarToken = async (req, res = response) => {
    const { uid, name } = req;

    // Generar JWT
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token
    })
}

const confirmarCuenta = async (req, res = response) => {

    const { token } = req.params
    const query = { token: token }

    // Verificar el usuario con el uid
    const usuario = await Usuario.findOne(query)

    if (!usuario) {
        return res.render(400).json({
            ok: false,
            msg: 'Confirmacion de cuenta no valida, intenta de nuevo'
        });
    }

    usuario.status = 'activo';
    usuario.token = null;

    await usuario.save();

    const html = `
    <div style="display: flex; align-items: center; justify-content: center; height: 100vh; flex-direction: column;">
        <h1>Bienvenido a MagneticMediaApp</h1>
        <div style="margin-top: -20px; text-align: center;">
            <h2>Tu cuenta ha sido confirmada satisfactoriamente</h2>
            <a href="http://localhost:5174/auth" style="margin-top: 10px; text-decoration: none; padding: 10px 20px; background-color: #007bff; color: #fff; border-radius: 5px; display: inline-block;">Autenticarme</a>
        </div>
    </div>
`;
    res.send(html);
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    confirmarCuenta
}