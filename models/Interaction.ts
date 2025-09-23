import { Schema, model, models, Types } from 'mongoose';

export interface IInteraction {
  post: Types.ObjectId;
  user: Types.ObjectId;
  type: 'like' | 'dislike' | 'bookmark' ;
  createdAt: Date;
}

const interactionSchema = new Schema<IInteraction>(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
      type: String,
      enum: ['like', 'dislike','bookmark'],
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Ensure unique interaction per post per user/session
interactionSchema.index({ post: 1, user: 1 }, { unique: true });

const Interaction = models.Interaction || model('Interaction', interactionSchema);
export default Interaction;