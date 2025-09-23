import React from 'react';

// Post Card Component
const MentorshipHero = () => {
    return (
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 border-2 border-blue-300 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-bounce" style={{animationDuration: '3s'}}></div>
                <div className="absolute bottom-32 left-32 w-16 h-16 border border-white rounded-full opacity-40 animate-ping" style={{animationDuration: '4s'}}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
                <div className="text-center">
                    <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                        <span className="block">Mentorship Program</span>
                        <span className="block text-blue-200 mt-2">Grow Together, Succeed Together</span>
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-xl text-blue-100">
                        Connect with experienced professionals and emerging talents in Cameroon's tech ecosystem.
                        Whether you're seeking guidance or ready to share your expertise, our mentorship program
                        creates meaningful connections that drive career growth and innovation.
                    </p>


                </div>
            </div>
        </section>
    );
};


export default MentorshipHero;