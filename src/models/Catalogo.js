const { Schema, model } = require('mongoose');

const CatalogoSchema = Schema({
    numero_ip: {
        type: String,
        required: true
    },
    nombre_servidor: {
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    nombre_catalogo: {
        type: String,
        required: true,
    },
    consola: {
        type: String,
        enum: ['Zona Franca', 'Suba', 'Calle 59', 'Tarjde'],
        required: true,
    },
    ciclo: {
        type: String,
        enum: ['Diario', 'Semanal', 'Mensual'],
        required: true,
    },
    programa: {
        type: String,
        enum: ['Dataprotector', 'Commvault'],
        required: true,
    },
    tecnologia: {
        type: String,
        enum: ['LT08', 'LT07', 'LT06', 'LT04'],
        required: true,
    }
});

CatalogoSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Catalogo', CatalogoSchema);
