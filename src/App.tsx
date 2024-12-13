import React, { useState, useEffect } from 'react';
import ListGroup from './component/ListGroup';

interface City {
  id: number;
  name: string;
  description: string;
}

const App: React.FC = () => {
  const [cities, setCities] = useState<City[]>(() => {
    const savedCities = localStorage.getItem('cities');
    return savedCities ? JSON.parse(savedCities) : [];
  });
  const [selectedCity, setSelectedCity] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newCity, setNewCity] = useState({ name: '', description: '' });

  useEffect(() => {
    localStorage.setItem('cities', JSON.stringify(cities));
  }, [cities]);

  const handleSelectCity = (id: number) => {
    setSelectedCity(id);
  };

  const handleAddCity = () => {
    if (newCity.name && newCity.description) {
      setCities([
        ...cities,
        { id: cities.length + 1, name: newCity.name, description: newCity.description },
      ]);
      setNewCity({ name: '', description: '' });
    }
  };

  const handleDeleteCity = (id: number) => {
    setCities(cities.filter((city) => city.id !== id));
    if (selectedCity === id) {
      setSelectedCity(null); // Reset selection if the deleted city was selected
    }
  };

  const handleReset = () => {
    setSelectedCity(null);
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary mb-4">City Explorer</h1>

      <div className="row mb-4">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Search cities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <h4 className="text-secondary">City List</h4>
          <ListGroup
            cities={filteredCities}
            selectedCity={selectedCity}
            onSelect={handleSelectCity}
            onDelete={handleDeleteCity} // Pass delete handler
          />
        </div>

        <div className="col-md-6">
          <h4 className="text-secondary">City Details</h4>
          {selectedCity !== null ? (
            <div className="alert alert-info">
              <h5>{cities.find((city) => city.id === selectedCity)?.name}</h5>
              <p>{cities.find((city) => city.id === selectedCity)?.description}</p>
              <button className="btn btn-warning" onClick={handleReset}>
                Reset Selection
              </button>
            </div>
          ) : (
            <p className="text-muted">Select a city to see details.</p>
          )}
        </div>
      </div>

      <div className="row mt-4">
        <div className="col">
          <h4 className="text-secondary">Add New City</h4>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="City name"
            value={newCity.name}
            onChange={(e) => setNewCity({ ...newCity, name: e.target.value })}
          />
          <textarea
            className="form-control mb-2"
            placeholder="City description"
            value={newCity.description}
            onChange={(e) => setNewCity({ ...newCity, description: e.target.value })}
          ></textarea>
          <button className="btn btn-primary" onClick={handleAddCity}>
            Add City
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
