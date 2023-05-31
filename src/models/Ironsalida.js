const { Schema, model } = require('mongoose');

const IronSalidaSchema = Schema({
    fecha_salida: {
        type: Date,
    },
    fecha_devolucion: {
        type: Date,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    destino: {
        type: String,
        required: true,
    },
    ubicacion: {
        type: String,
        required: true,
    },
    tipo_transporte: {
        type: String,
        default: '3774'
    },
    numero_remision: {
        type: Number,
        required: true,
    },
    codigo_medio: {
        type: Number,
        required: true,
    }
});

IronSalidaSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('ironsalida', IronSalidaSchema);