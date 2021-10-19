const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;
const curr = new Date();
//한국 시간으로 저장되어야함
const DandelionSchema = new Schema({
  name: String,
  _creator: {
<<<<<<< HEAD
    type: String,
    ref: 'User',
  },
  _parent: {
    type: String,
=======
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  _parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dandelion',
  },
  _child: {
    type: mongoose.Schema.Types.ObjectId,
>>>>>>> 9dea053b16cf54ae3f62e0b09b894af0825e6848
    ref: 'Dandelion',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  level: {
    type: Number,
    default: 1,
  },
  address: String,
  description: String,
});
DandelionSchema.index({ location: '2dsphere' });
const Dandelion = mongoose.model('Dandelion', DandelionSchema);

module.exports = Dandelion;
