// models/Mentee.js
import mongoose from 'mongoose';

const MenteeSchema = new mongoose.Schema({
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

    // Goals and Interests
    goals: {
        type: String,
        required: true,
        maxlength: 1000
    },
    interests: [{
        type: String,
        trim: true
    }],

    // Availability
    availability: {
        type: String,
        enum: ['1-2 hours/week', '3-4 hours/week', '5+ hours/week', 'flexible'],
        required: true
    },

    // Subscription Plan
    planType: {
        type: String,
        enum: ['free', 'premium'],
        required: true,
        default: 'free'
    },
    subscriptionStatus: {
        type: String,
        enum: ['active', 'cancelled', 'expired', 'trial','pending', 'active', 'cancelled'],
        default: 'trial'
    },
    subscriptionStartDate: {
        type: Date
    },
    subscriptionEndDate: {
        type: Date
    },

    paymentDetails: {
        method: {
            type: String,
            enum: ['credit-card', 'paypal', 'mobile-money', 'bank-transfer', 'other'],
            required: false
        },
        transactionId: {
            type: String,
            trim: true
        },
        submittedAt: {
            type: Date
        },
        verified: {
            type: Boolean,
            default: false
        },
        amount: {
            type: Number
        },
        currency: {
            type: String,
            default: 'USD'
        }
    },

    // Mentorship Information
    currentMentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor'
    },
    mentorshipHistory: [{
        mentorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Mentor'
        },
        startDate: Date,
        endDate: Date,
        status: {
            type: String,
            enum: ['active', 'completed', 'cancelled']
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        feedback: String
    }],

    // Matching Preferences
    preferredMentorExperience: {
        type: String,
        enum: ['2-3', '4-5', '6-10', '10+']
    },
    preferredIndustries: [{
        type: String,
        trim: true
    }],
    mentorshipFocus: [{
        type: String,
        enum: [
            'Career Development',
            'Technical Skills',
            'Leadership',
            'Entrepreneurship',
            'Job Search',
            'Work-Life Balance',
            'Networking',
            'Industry Transition'
        ]
    }],

    // Progress Tracking
    progress_goals: [{
        title: String,
        description: String,
        targetDate: Date,
        status: {
            type: String,
            enum: ['not-started', 'in-progress', 'completed'],
            default: 'not-started'
        },
        progress: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        createdDate: {
            type: Date,
            default: Date.now
        }
    }],

    // Status and Application
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'active', 'inactive'],
        default: 'pending'
    },
    applicationDate: {
        type: Date,
        default: Date.now
    },
    approvedDate: {
        type: Date
    },

    // Profile Information
    profileImage: {
        type: String,
        default: '/api/placeholder/150/150'
    },
    bio: {
        type: String,
        maxlength: 300
    },
    location: {
        type: String,
        trim: true
    },

    // Communication Preferences
    communicationMethod: {
        type: String,
        enum: ['video-call', 'phone-call', 'in-person', 'messaging', 'email'],
        default: 'video-call'
    },

    timezone: {
        type: String
    },

    // Session Information
    totalSessions: {
        type: Number,
        default: 0
    },
    completedSessions: {
        type: Number,
        default: 0
    },
    upcomingSessions: [{
        date: Date,
        mentorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Mentor'
        },
        duration: Number, // in minutes
        type: {
            type: String,
            enum: ['one-on-one', 'group', 'workshop']
        },
        status: {
            type: String,
            enum: ['scheduled', 'completed', 'cancelled', 'rescheduled'],
            default: 'scheduled'
        }
    }]
}, {
    timestamps: true
});

// Index for search and filtering
MenteeSchema.index({
    firstName: 'text',
    lastName: 'text',
    goals: 'text',
    interests: 'text'
});

MenteeSchema.index({ status: 1, planType: 1 });
MenteeSchema.index({ subscriptionStatus: 1 });
MenteeSchema.index({ currentMentor: 1 });

// Virtual for full name
MenteeSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Method to check if subscription is active
MenteeSchema.methods.hasActiveSubscription = function() {
    if (this.planType === 'free') return true;
    if (this.subscriptionStatus === 'active' && this.subscriptionEndDate > new Date()) {
        return true;
    }
    return false;
};

// Method to calculate mentorship completion rate
MenteeSchema.methods.getMentorshipCompletionRate = function() {
    const completedMentorships = this.mentorshipHistory.filter(m => m.status === 'completed').length;
    const totalMentorships = this.mentorshipHistory.length;
    return totalMentorships > 0 ? (completedMentorships / totalMentorships * 100).toFixed(1) : 0;
};

// Static method to find mentees by plan type
MenteeSchema.statics.findByPlan = function(planType) {
    return this.find({ planType, status: 'approved' });
};

// Pre-save middleware to set subscription dates for premium users
MenteeSchema.pre('save', function(next) {
    if (this.isModified('planType') && this.planType === 'premium' && !this.subscriptionStartDate) {
        this.subscriptionStartDate = new Date();
        this.subscriptionEndDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
        this.subscriptionStatus = 'active';
    }
    next();
});

const Mentee = mongoose.models.Mentee || mongoose.model('Mentee', MenteeSchema);

export default Mentee;