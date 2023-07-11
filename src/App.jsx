import React, { useState, useEffect } from 'react';
import './App.css';
import Modal from 'react-modal';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all/")
      .then(response => response.json())
      .then(data => {
        setCountries(data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleLetterChange = (event) => {
    setSelectedLetter(event.target.value);
  };

  const handleContinentChange = (event) => {
    setSelectedContinent(event.target.value);
  };

  const handleCardClick = (country) => {
    setSelectedCountry(country);
  };

  const handleCloseModal = () => {
    setSelectedCountry(null);
  };

  const filteredCountries = countries.filter(country => {
    if (selectedLetter && !country.name.startsWith(selectedLetter)) {
      return false;
    }
    if (selectedContinent && country.region !== selectedContinent) {
      return false;
    }
    return true;
  });

  return (
    <div className="container">
      <h1>Banderas del mundo</h1>
      <div className="filter-container">
        <label htmlFor="letter">Filter by First Letter:</label>
        <input type="text" id="letter" value={selectedLetter} onChange={handleLetterChange} />
        <label htmlFor="continent">Filter by Continent:</label>
        <select id="continent" value={selectedContinent} onChange={handleContinentChange}>
          <option value="">All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div className="card-container">
        {filteredCountries.map(country => (
          <div key={country.name} className="card" onClick={() => handleCardClick(country)}>
            <h2>{country.name}</h2>
            <img src={country.flag} alt={country.name} />
            <p>Capital: {country.capital}</p>
            <p>Region: {country.region}</p>
            <p>Population: {country.population}</p>
          </div>
        ))}
      </div>
      <Modal
        isOpen={selectedCountry !== null}
        onRequestClose={handleCloseModal}
        contentLabel="Country Details"
        className="modal"
        overlayClassName="overlay"
      >
        {selectedCountry && (
          <div>
            <h2>{selectedCountry.name}</h2>
            <img src={selectedCountry.flag} alt={selectedCountry.name} />
            <p>Capital: {selectedCountry.capital}</p>
            <p>Region: {selectedCountry.region}</p>
            <p>Population: {selectedCountry.population}</p>
            <button className="close-button" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;





















