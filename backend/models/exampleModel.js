import mongoose from 'mongoose';

const exampleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
  },
  {
    timestamps: true,
  }
);

const Example = mongoose.model('Example', exampleSchema);

export default Example;
