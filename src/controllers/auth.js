const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');
const { emailRegistro } = require('../helpers/emails');

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
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
                msg: 'El usuario no existe con ese email'
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

    res.json({
        ok: true,
        msg: 'Cuenta confirmada con exito',
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    confirmarCuenta
}