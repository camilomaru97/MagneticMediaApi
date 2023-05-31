const { response } = require('express');
const Ironsalida = require('../models/Ironsalida');

const obtenerIronSalida = async (req, res = response) => {
    const ironSalida = await Ironsalida.find()
        .populate('usuario', 'name');

    res.json({
        ok: true,
        ironSalida
    });
}

const obtenerIronSalidaId = async (req, res = response) => {

    const ironSalidaId = req.params.id;
    const uid = req.uid;

    try {

        const ironSalidaById = await Ironsalida.findById(ironSalidaId);

        if (!ironSalidaById) {
            return res.status(404).json({
                ok: false,
                msg: 'IronSalida no existe por ese id'
            });
        }

        if (ironSalidaById.usuario.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este IronSalida'
            });
        }

        res.json({
            ok: true,
            ironSalida: ironSalidaById
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const crearIronSalida = async (req, res = response) => {

    const VALIDACIONES = {
        '0': 'Bogota',
        '1': 'Cali'
    }
    
    const ironSalida = new Ironsalida(req.body);
    const { fecha_salida, fecha_devolucion, destino } = req.body;
    const query = { numero_remision: req.body.numero_remision }
    ironSalida.usuario = req.uid;

    try {

        const findNumero_remision = await Ironsalida.findOne(query);
        if (findNumero_remision) {
            return res.status(404).json({
                ok: false,
                msg: 'Numero de remision ya existe'
            });
        }

        if (!fecha_salida || !fecha_devolucion ) {
            return res.status(404).json({
                ok: false,
                msg: 'La fecha es requerida'
            });
        }

        if(fecha_devolucion < fecha_salida){
            return res.status(404).json({
                ok: false,
                msg: 'La fecha de devolucion no puede ser menor a la de salida'
            });
        }

        if(destino !== VALIDACIONES[0] && destino !== VALIDACIONES[1] ){
            return res.status(404).json({
                ok: false,
                msg: 'El destino no puede ser diferente a Cali o Bogota'
            });
        }

        const ironSalidadaGuardado = await ironSalida.save();
        res.json({
            ok: true,
            ironSalida: ironSalidadaGuardado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarIronSalida = async (req, res = response) => {
    const ironSalidaId = req.params.id;
    const uid = req.uid;

    try {

        const ironSalida = await Ironsalida.findById(ironSalidaId);

        if (!ironSalida) {
            return res.status(404).json({
                ok: false,
                msg: 'IronSalida no existe por ese id'
            });
        }

        if (ironSalida.usuario.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este ironSalida'
            });
        }

        const nuevoIronSalida = {
            ...req.body,
            usuario: uid
        }

        const ironSalidaActualizado = await Ironsalida.findByIdAndUpdate(ironSalidaId, nuevoIronSalida, { new: true });

        res.json({
            ok: true,
            ironSalida: ironSalidaActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const eliminarIronSalida = async (req, res = response) => {
    const ironSalidaId = req.params.id;
    const uid = req.uid;

    try {

        const ironSalida = await Ironsalida.findById(ironSalidaId);

        if (!ironSalida) {
            return res.status(404).json({
                ok: false,
                msg: 'IronSalida no existe por ese id'
            });
        }

        if (ironSalida.usuario.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este ironSalida'
            });
        }

        await Ironsalida.findByIdAndDelete(ironSalidaId);

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
    obtenerIronSalida,
    crearIronSalida,
    actualizarIronSalida,
    eliminarIronSalida,
    obtenerIronSalidaId
}
