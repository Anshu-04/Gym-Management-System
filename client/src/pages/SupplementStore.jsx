import React from 'react';

const supplements = [
  { name: "Whey Protein", price: 2500, desc: "Supports muscle growth", image: "https://via.placeholder.com/150" },
  { name: "Multivitamin", price: 500, desc: "Daily essential vitamins", image: "https://via.placeholder.com/150" },
  { name: "Creatine", price: 800, desc: "Improves performance", image: "https://via.placeholder.com/150" }
];

const SupplementStore = () => {
  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">Supplement Store</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {supplements.map((s, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="relative">
                <img src={s.image} alt={s.name} className="w-full h-48 object-cover" />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ₹{s.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-800 mb-2">{s.name}</h3>
                <p className="text-gray-600 mb-4">{s.desc}</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplementStore;