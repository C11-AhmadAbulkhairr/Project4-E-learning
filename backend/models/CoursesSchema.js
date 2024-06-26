//paid courses
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    price: { type: Number , required:true},
    description:{type: String },
       reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]

  },{ timestamps: true });
  
  module.exports = mongoose.model('Course', courseSchema);
  