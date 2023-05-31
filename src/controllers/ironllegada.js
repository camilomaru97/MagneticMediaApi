const { response } = require('express');
const Ironllegada = require('../models/Ironllegada');

const obtenerIronLlegada = async (req, res = response) => {
    const ironllegada = await Ironllegada.find()
        .populate('usuario', 'name');

    res.json({
        ok: true,
        ironllegada
    });
}

const obtenerIronLlegadaById = async (req, res = response) => {

    const ironLlegadaId = req.params.id;
    const uid = req.uid;

    try {

        const ironLlegadaById = await Ironllegada.findById(ironLlegadaId);

        if (!ironLlegadaById) {
            return res.status(404).json({
                ok: false,
                msg: 'Iron Llegada no existe por ese id'
            });
        }

        if (ironLlegadaById.usuario.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este Iron Llegada'
            });
        }

        res.json({
            ok: true,
            ironLlegada: ironLlegadaById
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const crearIronLlegada = async (req, res = response) => {

    const TRANSPORTES = {
        '0': '1149',
        '1': '3774',
        '2': '5009'
    }

    const ironllegada = new Ironllegada(req.body);
    const { ubicacion, tipo_transporte } = req.body;
    const query = { numero_remision: req.body.numero_remision }
    ironllegada.usuario = req.uid;

    console.log(req.uid)

    try {

        const findNumero_remision = await Ironllegada.findOne(query);
        if (findNumero_remision) {
            return res.status(404).json({
                ok: false,
                msg: 'Numero de remision ya existe'
            });
        }

        if (ubicacion !== 'Calle 59') {
            return res.status(404).json({
                ok: false,
                msg: 'Numero por default debe ser Calle 59'
            });
        }

        if (tipo_transporte !== TRANSPORTES[0] &&
            tipo_transporte !== TRANSPORTES[1] && 
            tipo_transporte !== TRANSPORTES[2] 
            ) {
            return res.status(404).json({
                ok: false,
                msg: 'El tipo de transporte debe ser 1149, 3774 o 5009'
            });
        }

        const ironllegadaGuardado = await ironllegada.save();
        res.json({
            ok: true,
            ironllegada: ironllegadaGuardado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarIronLlegada = async (req, res = response) => {
    const ironLlegadaId = req.params.id;
    const uid = req.uid;

    try {

        const ironLlegada = await Ironllegada.findById(ironLlegadaId);

        if (!ironLlegada) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if (ironLlegada.usuario.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoIronLlegada = {
            ...req.body,
            usuario: uid
        }

        const ironLlegadaActualizado = await Ironllegada.findByIdAndUpdate(ironLlegadaId, nuevoIronLlegada, { new: true });

        res.json({
            ok: true,
            ironLlegada: ironLlegadaActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const eliminarIronLlegada = async (req, res = response) => {
    const ironLlegadaId = req.params.id;
    const uid = req.uid;

    try {

        const ironLlegada = await Ironllegada.findById(ironLlegadaId);

        if (!ironLlegada) {
            return res.status(404).json({
                ok: false,
                msg: 'IronLlegada no existe por ese id'
            });
        }

        if (ironLlegada.usuario.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este IronLlegada'
            });
        }

        await Ironllegada.findByIdAndDelete(ironLlegadaId);

        res.json({ ok: true });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    obtenerIronLlegada,
    crearIronLlegada,
    actualizarIronLlegada,
    eliminarIronLlegada,
    obtenerIronLlegadaById
}
