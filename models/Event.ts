import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
    title: string;
    description: string;
    date: Date;
    time: string;
    location: string;
    type: 'workshop' | 'hackathon' | 'meetup' | 'conference' | 'other';
    capacity: number;
    registeredParticipants: number;
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
    image: string;
    organizer: string;
    tags: string[];
    requirements?: string[];
    agenda?: {
        time: string;
        activity: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

const eventSchema = new Schema<IEvent>({
    title: {
        type: String,
        required: [true, 'Please provide an events title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please provide an events description'],
        maxlength: [2000, 'Description cannot be more than 2000 characters']
    },
    date: {
        type: Date,
        required: [true, 'Please provide an events date']
    },
    time: {
        type: String,
        required: [true, 'Please provide an events time']
    },
    location: {
        type: String,
        required: [true, 'Please provide an events location']
    },
    type: {
        type: String,
        required: [true, 'Please specify events type'],
        enum: ['workshop', 'hackathon', 'meetup', 'conference', 'other']
    },
    capacity: {
        type: Number,
        required: [true, 'Please specify events capacity']
    },
    registeredParticipants: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
        default: 'upcoming'
    },
    image: {
        type: String,
        default: '/api/placeholder/400/300'
    },
    organizer: {
        type: String,
        required: [true, 'Please specify events organizer']
    },
    tags: [{
        type: String,
        trim: true
    }],
    requirements: [{
        type: String,
        trim: true
    }],
    agenda: [{
        time: String,
        activity: String
    }],
}, {
    timestamps: true
});

export default mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);