const { Schema, model } = require('mongoose');

const ExamSchema = Schema(
  {
    inital_game: {
      type: Date,
      required: true,
    },
    end_game: {
      type: Date,
      required: true,
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    ip_user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// CatalogoSchema.method('toJSON', function () {
//   const { __v, _id, ...object } = this.toObject();
//   object.id = _id;
//   return object;
// });

module.exports = model('Exam', ExamSchema);
