import Example from '../models/exampleModel.js';

// @desc    Get example data
// @route   GET /api/example
// @access  Public
const getExample = async (req, res) => {
  res.status(200).json({ message: 'Example route works!' });
};

export { getExample };
