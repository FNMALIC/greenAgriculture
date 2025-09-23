// models/Mentor.js
import mongoose from 'mongoose';

const MentorSchema = new mongoose.Schema({
    // Personal Information
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },

    // Professional Information
    company: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        trim: true
    },
    experience: {
        type: String,
        enum: ['0-1', '2-3', '4-5', '6-10', '10+'],
        required: true
    },

    // Expertise and Skills
    expertise: {
        type: String,
        required: true
    },
    skills: [{
        type: String,
        trim: true
    }],

    // Availability
    availability: {
        type: String,
        enum: ['1-2 hours/week', '3-4 hours/week', '5+ hours/week', 'flexible'],
        required: true
    },

    // Location
    location: {
        type: String,
        trim: true
    },

    // Profile Information
    bio: {
        type: String,
        maxlength: 500
    },
    profileImage: {
        type: String,
        default: '/api/placeholder/150/150'
    },

    // Mentorship Statistics
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    totalMentees: {
        type: Number,
        default: 0
    },
    activeMentees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentee'
    }],
    completedMentorships: {
        type: Number,
        default: 0
    },

    // Status and Verification
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'inactive'],
        default: 'pending'
    },
    isVerified: {
        type: Boolean,
        default: false
    },

    // Application Details
    applicationDate: {
        type: Date,
        default: Date.now
    },
    approvedDate: {
        type: Date
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },

    // Reviews and Feedback
    reviews: [{
        menteeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Mentee'
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        comment: String,
        date: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

// Index for search functionality
MentorSchema.index({
    firstName: 'text',
    lastName: 'text',
    expertise: 'text',
    skills: 'text',
    company: 'text',
    role: 'text'
});

// Index for filtering
MentorSchema.index({ status: 1, isVerified: 1 });
MentorSchema.index({ location: 1 });
MentorSchema.index({ experience: 1 });

// Virtual for full name
MentorSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Method to calculate average rating
MentorSchema.methods.calculateAverageRating = function() {
    if (this.reviews.length === 0) return 0;
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / this.reviews.length).toFixed(1);
};

// Static method to find available mentors
MentorSchema.statics.findAvailable = function() {
    return this.find({
        status: 'approved',
        isVerified: true
    }).sort({ rating: -1 });
};

const Mentor = mongoose.models.Mentor || mongoose.model('Mentor', MentorSchema);

export default Mentor;