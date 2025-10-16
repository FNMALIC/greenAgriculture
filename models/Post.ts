import  { Schema, model, models } from 'mongoose';

export interface IPost {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  author: {
    name: string;
    image?: string;
  };
  tags: string[];
  status: 'draft' | 'published' | 'scheduled';
  scheduledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      maxlength: [500, 'Excerpt cannot be more than 500 characters'],
    },
    coverImage: {
      type: String,
    },
    author: {
      name: {
        type: String,
        required: [true, 'Author name is required'],
          default: 'fnmalic',
      },
      image: {
        type: String,
      },
    },
    tags: [{
      type: String,
      trim: true,
    }],
    status: {
      type: String,
      enum: ['draft', 'published', 'scheduled'],
      default: 'draft',
    },
    scheduledAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
// postSchema.index({ slug: 1 });
postSchema.index({ tags: 1 });
postSchema.index({ createdAt: -1 });

// Ensure slug is created from title if not provided
postSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

const Post = models.Post || model('Post', postSchema);

export default Post;