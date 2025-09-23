import { Schema, model, models, Types } from 'mongoose';

export interface IComment {
  post: Types.ObjectId;
  author: Types.ObjectId; 
  content: string;
  parentComment?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  status: 'approved' | 'pending' | 'spam';
}

const commentSchema = new Schema<IComment>(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    },
      author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      trim: true,
      maxlength: [1000, 'Comment cannot be more than 1000 characters']
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null
    },
    status: {
      type: String,
      enum: ['approved', 'pending', 'spam'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

const Comment = models.Comment || model('Comment', commentSchema);
export default Comment;