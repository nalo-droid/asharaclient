import { useState } from 'react';
import { FaCalculator } from 'react-icons/fa';

const CostCalculator = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    plotArea: '',
    floors: '1',
    buildingType: 'residential',
    constructionQuality: 'standard',
    location: 'addisAbaba',
    buildingStyle: 'modern',
    features: {
      basement: false,
      garden: false,
      terrace: false,
      parking: false,
      securityRoom: false
    }
  });

  const [result, setResult] = useState(null);

  // Base rates per square meter in ETB
  const baseRates = {
    residential: {
      basic: 12000,
      standard: 15000,
      premium: 18000
    },
    commercial: {
      basic: 14000,
      standard: 17000,
      premium: 20000
    }
  };

  // Location multipliers
  const locationMultipliers = {
    addisAbaba: 1.2,
    adama: 1.0,
    hawassa: 1.0,
    bahirDar: 1.1,
    mekelle: 1.0
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        features: {
          ...prev.features,
          [name.replace('feature-', '')]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const calculateCost = (e) => {
    e.preventDefault();
    
    const area = parseFloat(formData.plotArea);
    const floors = parseInt(formData.floors);
    
    // Base cost calculation
    const baseRate = baseRates[formData.buildingType][formData.constructionQuality];
    let totalCost = area * baseRate * floors;

    // Apply location multiplier
    totalCost *= locationMultipliers[formData.location];

    // Add feature costs
    const featureCosts = {
      basement: area * 5000,
      garden: area * 2000,
      terrace: area * 3000,
      parking: area * 2500,
      securityRoom: 300000
    };

    const featuresCost = Object.entries(formData.features)
      .filter(([_, isSelected]) => isSelected)
      .reduce((acc, [feature]) => acc + featureCosts[feature], 0);

    totalCost += featuresCost;

    // Calculate breakdowns
    const breakdown = {
      baseCost: area * baseRate * floors,
      features: featuresCost,
      locationAdjustment: (totalCost * (locationMultipliers[formData.location] - 1))
    };

    setResult({
      totalCost,
      breakdown,
      perSquareMeter: totalCost / (area * floors)
    });
  };

  const tabs = [
    { id: 'basic', name: 'Basic Info' },
    { id: 'features', name: 'Features' },
    { id: 'location', name: 'Location' }
  ];

  return (
    <main className="flex-1">
      <div className="py-8">
        <div className="container mx-auto px-4 sm:px-6 md:px-8" style={{ maxWidth: '1280px' }}>
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                Construction Cost Calculator
              </h2>
              <p className="mt-1 text-gray-600">
                Estimate your construction costs based on your requirements
              </p>
            </div>

            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            <form onSubmit={calculateCost} className="p-6">
              <div className={activeTab === 'basic' ? 'block' : 'hidden'}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Plot Area (m²)
                    </label>
                    <input
                      type="number"
                      name="plotArea"
                      required
                      value={formData.plotArea}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Floors
                    </label>
                    <input
                      type="number"
                      name="floors"
                      min="1"
                      required
                      value={formData.floors}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Building Type
                    </label>
                    <select
                      name="buildingType"
                      value={formData.buildingType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Construction Quality
                    </label>
                    <select
                      name="constructionQuality"
                      value={formData.constructionQuality}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="basic">Basic</option>
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={activeTab === 'features' ? 'block' : 'hidden'}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.keys(formData.features).map((feature) => (
                    <label key={feature} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                      <input
                        type="checkbox"
                        id={`feature-${feature}`}
                        name={`feature-${feature}`}
                        checked={formData.features[feature]}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-900 capitalize">
                        {feature.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={activeTab === 'location' ? 'block' : 'hidden'}>
                <div className="max-w-md mx-auto">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Location
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="addisAbaba">Addis Ababa</option>
                    <option value="adama">Adama</option>
                    <option value="hawassa">Hawassa</option>
                    <option value="bahirDar">Bahir Dar</option>
                    <option value="mekelle">Mekelle</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 border-t pt-6">
                <button
                  type="submit"
                  className="mx-auto w-auto px-8 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 flex items-center justify-center"
                >
                  <FaCalculator className="mr-2" />
                  Calculate Cost
                </button>
              </div>
            </form>

            {result && (
              <div className="border-t p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Cost Breakdown
                </h3>
                
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-xl font-bold text-blue-900">
                    Total Estimated Cost: ETB {result.totalCost.toLocaleString()}
                  </p>
                  <p className="mt-1 text-sm text-blue-700">
                    Cost per m²: ETB {Math.round(result.perSquareMeter).toLocaleString()}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Base Construction Cost</p>
                    <p className="text-lg font-medium text-gray-900">
                      ETB {result.breakdown.baseCost.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Additional Features</p>
                    <p className="text-lg font-medium text-gray-900">
                      ETB {result.breakdown.features.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Location Adjustment</p>
                    <p className="text-lg font-medium text-gray-900">
                      ETB {result.breakdown.locationAdjustment.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CostCalculator;