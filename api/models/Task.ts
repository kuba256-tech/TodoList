import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  title: String,
  description: String,
  created_at: {
    type: String,
    default: () => new Date(),
  },
  isCompleted: Boolean,
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
