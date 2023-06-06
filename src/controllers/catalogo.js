const { response } = require('express');
const Catalogo = require('../models/Catalogo');

const obtenerCatalogo = async (req, res = response) => {
    const catalogos = await Catalogo.find()
        .populate('usuario', 'name');

    res.json({
        ok: true,
        catalogos
    });
}

const obtenerCatalogolidaId = async (req, res = response) => {

    const CatalogoId = req.params.id;
    const uid = req.uid;

    try {

        const catalogoById = await Catalogo.findById(CatalogoId);

        if (!catalogoById) {
            return res.status(404).json({
                ok: false,
                msg: 'catalogo no existe por ese id'
            });
        }

        if (catalogoById.usuario.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este catalogo'
            });
        }

        res.json({
            ok: true,
            catalogo: catalogoById
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const crearCatalogo = async (req, res = response) => {

    const CONSOLAS = {
        '0': 'Zona Franca',
        '1': 'Suba',
        '2': 'Calle 59',
        '3': 'Tarjde'
    }
    const CICLOS = {
        '0': 'Diario',
        '1': 'Semanal',
        '2': 'Mensual',
    }
    const PROGRAMAS = {
        '0': 'Dataprotector',
        '1': 'Commvault',
    }
    const TECNOLOGIAS = {
        '0': 'LT08',
        '1': 'LT07',
        '2': 'LT06',
        '3': 'LT04'
    }

    const catalogo = new Catalogo(req.body);
    const query = { nombre_servidor: req.body.nombre_servidor };
    const { consola, ciclo, programa, tecnologia } = req.body;
    catalogo.usuario = req.uid;

    try {

        const findNombre_servidor = await Catalogo.findOne(query);
        if (findNombre_servidor) {
            return res.status(404).json({
                ok: false,
                msg: 'El nombre del servidor ya existe'
            });
        }

        if (consola !== CONSOLAS[0] && consola !== CONSOLAS[1] && 
            consola !== CONSOLAS[2] && consola !== CONSOLAS[3]) {
            return res.status(404).json({
                ok: false,
                msg: 'El tipo de consola debe ser Zona Franca, Suba, Calle 59 o Tarjde'
            });
        }

        if (ciclo !== CICLOS[0] && ciclo !== CICLOS[1] && 
            ciclo !== CICLOS[2] ) {
            return res.status(404).json({
                ok: false,
                msg: 'El tipo de ciclo debe ser Diario, Semanal o Mensual'
            });
        }

        if (programa !== PROGRAMAS[0] && programa !== PROGRAMAS[1]) {
            return res.status(404).json({
                ok: false,
                msg: 'El tipo de ciclo debe ser Dataprotector o Commvault'
            });
        }

        if (tecnologia !== TECNOLOGIAS[0] && tecnologia !== TECNOLOGIAS[1] && 
            tecnologia !== TECNOLOGIAS[2] && tecnologia !== TECNOLOGIAS[3]) {
            return res.status(404).json({
                ok: false,
                msg: 'El tipo de tecnologia debe ser LT08, LT07, LT06 o LT04'
            });
        }

        const catalogoGuardado = await catalogo.save();

        res.json({
            ok: true,
            catalogo: catalogoGuardado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const actualizarCatalogo = async (req, res = response) => {
    const catalogoId = req.params.id;
    const uid = req.uid;

    try {

        const catalogo = await Catalogo.findById(catalogoId);

        if (!catalogo) {
            return res.status(404).json({
                ok: false,
                msg: 'Catalogo no existe por ese id'
            });
        }

        if (catalogo.usuario.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este catalogo'
            });
        }

        const nuevoCatalogo = {
            ...req.body,
            usuario: uid
        }

        const catalogoActualizado = await Catalogo.findByIdAndUpdate(catalogoId, nuevoCatalogo, { new: true });

        res.json({
            ok: true,
            catalogo: catalogoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const eliminarCatalogo = async (req, res = response) => {

    const catalogoId = req.params.id;
    const uid = req.uid;

    try {

        const catalogo = await Catalogo.findById(catalogoId);

        if (!catalogo) {
            return res.status(404).json({
                ok: false,
                msg: 'Catalogo no existe por ese id'
            });
        }

        if (catalogo.usuario.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este catalogo'
            });
        }

        await Catalogo.findByIdAndDelete(catalogoId);

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
    obtenerCatalogo,
    crearCatalogo,
    actualizarCatalogo,
    eliminarCatalogo,
    obtenerCatalogolidaId
}
