const { Schema, model } = require('mongoose');

const IronLlegadaSchema = Schema({
    fecha_ingreso: {
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
        default: 'Calle 59',
        required: true,
    },
    tipo_transporte: {
        type: String,
        enum: ['1149', '3774', '5009'],
        required: true,
    },
    numero_remision: {
        type: Number,
        required: true,
    },
    codigo_medio: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    }
);

IronLlegadaSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Ironllegada', IronLlegadaSchema);