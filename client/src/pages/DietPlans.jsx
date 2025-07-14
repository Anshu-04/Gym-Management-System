import React from 'react';

const meals = {
  Monday: ["Oats + Banana", "Chicken Rice", "Salad"],
  Tuesday: ["Egg Toast", "Paneer Wrap", "Soup"],
  Wednesday: ["Smoothie", "Dal Rice", "Grilled Fish"],
  Thursday: ["Paratha", "Biryani", "Fruit Bowl"],
  Friday: ["Poha", "Kofta", "Sprouts"],
  Saturday: ["Idli", "Veg Thali", "Milk"],
  Sunday: ["Upma", "Pasta", "Protein Shake"]
};

const DietPlans = () => {
  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-green-800 text-center">Weekly Diet Plan</h2>
        
        <div className="space-y-4">
          {Object.entries(meals).map(([day, [breakfast, lunch, dinner]]) => (
            <div key={day} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{day}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-800 mb-2">🌅 Breakfast</h4>
                  <p className="text-gray-700">{breakfast}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h4 className="font-medium text-orange-800 mb-2">☀️ Lunch</h4>
                  <p className="text-gray-700">{lunch}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-800 mb-2">🌙 Dinner</h4>
                  <p className="text-gray-700">{dinner}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DietPlans;