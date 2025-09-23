const stats = [
  {
    number: "500+",
    label: "Active Farmers",
    description: "Smallholder farmers using our platform"
  },
  {
    number: "150+",
    label: "Verified Buyers",
    description: "Trusted buyers across Cameroon"
  },
  {
    number: "2,000+",
    label: "Tons Traded",
    description: "Agricultural produce successfully traded"
  },
  {
    number: "40%",
    label: "Income Increase",
    description: "Average farmer income improvement"
  },
  {
    number: "25%",
    label: "Waste Reduction",
    description: "Decrease in post-harvest losses"
  },
  {
    number: "95%",
    label: "Satisfaction Rate",
    description: "User satisfaction with our platform"
  }
];

export function Stats() {
  return (
    <section className="py-20 bg-teal-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-4">
            Making a Real Impact
          </h2>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto">
            CropLink is transforming agricultural communities across Cameroon with measurable results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
                <div className="font-heading text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="font-heading text-xl font-semibold text-teal-100 mb-2">
                  {stat.label}
                </div>
                <div className="text-teal-200 text-sm">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm max-w-4xl mx-auto">
            <h3 className="font-heading text-2xl font-bold text-white mb-4">
              "CropLink has revolutionized how we sell our crops. We now get better prices and have direct access to buyers."
            </h3>
            <p className="text-teal-100">
              — Marie Ngozi, Smallholder Farmer from Douala
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
