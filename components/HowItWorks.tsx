import { UserPlus, Search, Handshake, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Join the Platform",
    description: "Sign up as a farmer or buyer and create your profile with crop details and requirements."
  },
  {
    icon: Search,
    title: "Discover Opportunities",
    description: "Browse available crops or find buyers. Use AI insights to identify the best market opportunities."
  },
  {
    icon: Handshake,
    title: "Connect & Collaborate",
    description: "Connect directly with buyers or join other farmers for collaborative fulfillment of large orders."
  },
  {
    icon: TrendingUp,
    title: "Grow Together",
    description: "Complete transactions securely, track your progress, and use analytics to optimize future harvests."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How CropLink Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple steps to transform your agricultural business and connect with the right partners.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-8">
                <div className="w-16 h-16 bg-teal-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-teal-200 -translate-x-8"></div>
                )}
              </div>
              <h3 className="font-heading font-semibold text-xl text-gray-900 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Agricultural Business?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of farmers and buyers who are already benefiting from CropLink's innovative platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-teal-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-secondary transition-colors">
                Start as Farmer
              </button>
              <button className="border-2 border-teal-primary text-teal-primary px-8 py-3 rounded-lg font-medium hover:bg-teal-primary hover:text-white transition-colors">
                Join as Buyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
