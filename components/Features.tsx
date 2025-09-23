import { 
  ShoppingCart, 
  Users, 
  Brain, 
  Truck, 
  BarChart3, 
  Shield 
} from "lucide-react";

const features = [
  {
    icon: ShoppingCart,
    title: "Direct Market Access",
    description: "Connect directly with buyers without intermediaries. Access specialized markets and get better prices for your crops."
  },
  {
    icon: Users,
    title: "Collaborative Fulfillment",
    description: "Pool resources with other farmers to fulfill large orders together, increasing your negotiating power and market reach."
  },
  {
    icon: Brain,
    title: "AI-Driven Insights",
    description: "Get real-time market data, pricing forecasts, and demand predictions powered by artificial intelligence."
  },
  {
    icon: Truck,
    title: "Logistics Support",
    description: "Streamlined delivery and supply chain management to reduce post-harvest losses and ensure timely delivery."
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description: "Make informed decisions with seasonal trend analysis, crop demand forecasting, and market intelligence."
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Safe and transparent payment processing with built-in dispute resolution and transaction tracking."
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Transforming Agriculture Through Technology
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            CropLink provides comprehensive tools and services to modernize farming, 
            connect stakeholders, and drive sustainable agricultural growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-teal-primary rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
