"use client"
import React, { useState } from 'react';
import {
    Users,
    Calendar,
    TrendingUp,
    User,
    AlertCircle,
    CheckCircle2,
    X,
    Loader2
} from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, paymentData }) => {
    const [transactionId, setTransactionId] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);


    const handlePaymentConfirmation = async () => {
        if (!transactionId.trim()) return;

        setLoading(true);
        try {
            console.log(paymentData)
            const response = await fetch('/api/mentee/payment-confirmation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    menteeId: paymentData.mentee.id,
                    paymentMethod: 'mobile_money', // Add this field
                    transactionId: transactionId
                })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    onClose();
                    setSuccess(false);
                    setTransactionId('');
                }, 3000);
            } else {
                alert(data.error || 'Payment confirmation failed. Please try again.');
            }
        } catch (error) {
            alert('Payment confirmation failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto mx-2 sm:mx-0">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Complete Your Payment</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {success ? (
                        <div className="text-center py-8">
                            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                            <h4 className="text-xl font-bold text-green-600 mb-2">Payment Confirmed!</h4>
                            <p className="text-gray-600">Your payment has been submitted for verification. You'll receive a confirmation email once approved.</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-semibold text-blue-900 mb-2">Amount to Pay: 29,500 XAF</h4>
                                <p className="text-sm text-blue-700">Complete payment using any of the methods below</p>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="p-3 sm:p-4 border rounded-lg">
                                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center flex-wrap">
                                        <span className="w-6 h-6 bg-orange-500 rounded mr-2"></span>
                                        Orange Money
                                    </h5>
                                    <div className="space-y-1 text-sm">
                                        <p className="text-gray-600">
                                            <strong>Code:</strong> #150*50#
                                        </p>
                                        <p className="text-gray-600 break-all">
                                            <strong>Number:</strong> 237 6 97 12 24 21
                                        </p>
                                        <p className="text-gray-500 text-xs sm:text-sm">
                                            Dial the code, select "Send Money", enter the number and amount
                                        </p>
                                    </div>
                                </div>

                                <div className="p-3 sm:p-4 border rounded-lg">
                                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center flex-wrap">
                                        <span className="w-6 h-6 bg-yellow-500 rounded mr-2"></span>
                                        MTN Mobile Money
                                    </h5>
                                    <div className="space-y-1 text-sm">
                                        <p className="text-gray-600">
                                            <strong>Code:</strong> *126#
                                        </p>
                                        <p className="text-gray-600 break-all">
                                            <strong>Number:</strong> 237 6XX XXX XXX
                                        </p>
                                        <p className="text-gray-500 text-xs sm:text-sm">
                                            Dial the code, select "Transfer Money", enter the number and amount
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Transaction ID <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                        placeholder="Enter your transaction ID"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Enter the transaction ID you received after making the payment
                                    </p>
                                </div>

                                <button
                                    onClick={handlePaymentConfirmation}
                                    disabled={loading || !transactionId.trim()}
                                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                            Confirming...
                                        </>
                                    ) : (
                                        'Confirm Payment'
                                    )}
                                </button>
                            </div>

                            <p className="text-xs text-gray-500 mt-4">
                                Please ensure you complete the payment before submitting the transaction ID. Verification may take up to 24 hours.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const ApplicationForm = () => {
    const [formType, setFormType] = useState('mentee');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentData, setPaymentData] = useState(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        role: '',
        experience: '',
        goals: '',
        expertise: '',
        availability: '',
        planType: 'free'
    });

    const [formErrors, setFormErrors] = useState({});


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error for this field when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        if (error) setError('');
    };

    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            role: '',
            experience: '',
            goals: '',
            expertise: '',
            availability: '',
            planType: 'free'
        });
        setFormErrors({});
        setError('');
        setSuccess(false);
    };

    const handleFormTypeChange = (type) => {
        setFormType(type);
        resetForm();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const endpoint = formType === 'mentee' ? '/api/mentee/register' : '/api/mentor/register';
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);

                // Handle premium payment flow
                if (data.paymentRequired) {
                    setPaymentData(data);
                    setShowPaymentModal(true);
                } else {
                    // Reset form after successful submission
                    setTimeout(() => {
                        resetForm();
                    }, 3000);
                }
            } else {
                setError(data.error || 'Registration failed. Please try again.');
            }
        } catch (error) {
            setError('Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };
    const handlePaymentModalClose = () => {
        setShowPaymentModal(false);
        setPaymentData(null);
        // Reset form after payment modal closes
        setTimeout(() => {
            resetForm();
        }, 1000);
    };

    return (
        <>
            <section className="py-8 sm:py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Ready to Get Started?</h2>
                        <p className="text-xl text-gray-600">
                            Apply to join our mentorship program today
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8">

                    {/* Success Message */}
                        {success && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center">
                                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                                    <span className="text-green-700 font-medium">
                                        {formType === 'mentee'
                                            ? (paymentData?.paymentRequired
                                                ? 'Registration successful! Please complete payment to activate premium features.'
                                                : 'Registration successful! Your application is pending approval.')
                                            : 'Mentor application submitted successfully! We will review your application and get back to you within 2-3 business days.'
                                        }
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-center">
                                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                                    <span className="text-red-700">{error}</span>
                                </div>
                            </div>
                        )}

                        {/* Form Type Toggle */}
                        <div className="flex justify-center mb-8">
                            <div className="bg-gray-100 p-1 rounded-lg">
                                <button
                                    onClick={() => handleFormTypeChange('mentee')}
                                    className={`px-6 py-2 rounded-md font-medium transition-colors duration-300 ${
                                        formType === 'mentee'
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    Find a Mentor
                                </button>
                                <button
                                    onClick={() => handleFormTypeChange('mentor')}
                                    className={`px-6 py-2 rounded-md font-medium transition-colors duration-300 ${
                                        formType === 'mentor'
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    Become a Mentor
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Plan Selection for Mentees */}
                            {formType === 'mentee' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Plan
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                                            formData.planType === 'free' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                                        }`}>
                                            <input
                                                type="radio"
                                                name="planType"
                                                value="free"
                                                checked={formData.planType === 'free'}
                                                onChange={handleInputChange}
                                                className="mr-3 text-blue-600"
                                            />
                                            <div>
                                                <div className="font-medium text-gray-900">Free Plan</div>
                                                <div className="text-sm text-gray-500">Basic mentorship support</div>
                                            </div>
                                        </label>
                                        <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                                            formData.planType === 'premium' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                                        }`}>
                                            <input
                                                type="radio"
                                                name="planType"
                                                value="premium"
                                                checked={formData.planType === 'premium'}
                                                onChange={handleInputChange}
                                                className="mr-3 text-blue-600"
                                            />
                                            <div>
                                                <div className="font-medium text-gray-900">Premium Plan</div>
                                                <div className="text-sm text-gray-500">29,500 XAF/month - Full access</div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* Personal Information */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {formErrors.firstName && (
                                        <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {formErrors.lastName && (
                                        <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            formErrors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {formErrors.email && (
                                        <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {formType === 'mentor' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Current Company/Organization
                                        </label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Current Role/Position
                                        </label>
                                        <input
                                            type="text"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Years of Experience <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        formErrors.experience ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                >
                                    <option value="">Select experience level</option>
                                    <option value="0-1">0-1 years</option>
                                    <option value="2-3">2-3 years</option>
                                    <option value="4-5">4-5 years</option>
                                    <option value="6-10">6-10 years</option>
                                    <option value="10+">10+ years</option>
                                </select>
                                {formErrors.experience && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.experience}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {formType === 'mentee' ? 'What are your goals?' : 'Areas of expertise'} <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name={formType === 'mentee' ? 'goals' : 'expertise'}
                                    value={formType === 'mentee' ? formData.goals : formData.expertise}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        formErrors.goals || formErrors.expertise ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder={
                                        formType === 'mentee'
                                            ? 'Tell us about your career goals and what you hope to achieve through mentorship...'
                                            : 'Describe your areas of expertise and what you can offer to mentees...'
                                    }
                                />
                                {(formErrors.goals || formErrors.expertise) && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.goals || formErrors.expertise}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Availability <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="availability"
                                    value={formData.availability}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        formErrors.availability ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                >
                                    <option value="">Select availability</option>
                                    <option value="1-2 hours/week">1-2 hours per week</option>
                                    <option value="3-4 hours/week">3-4 hours per week</option>
                                    <option value="5+ hours/week">5+ hours per week</option>
                                    <option value="flexible">Flexible schedule</option>
                                </select>
                                {formErrors.availability && (
                                    <p className="text-red-500 text-sm mt-1">{formErrors.availability}</p>
                                )}
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center mx-auto"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                            {formType === 'mentee' ? 'Submitting Application...' : 'Submitting Application...'}
                                        </>
                                    ) : (
                                        formType === 'mentee' ? 'Apply as Mentee' : 'Apply as Mentor'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <PaymentModal
                isOpen={showPaymentModal}
                onClose={handlePaymentModalClose}
                paymentData={paymentData}
            />
        </>
    );
};

export default ApplicationForm;