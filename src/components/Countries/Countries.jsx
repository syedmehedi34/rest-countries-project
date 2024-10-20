import { useEffect, useState } from "react";
import Country from "../Country/Country";

const Countries = () => {
  const [countries, setCountries] = useState([]); // *
  const [visited, setVisited] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [showVisitedOnly, setShowVisitedOnly] = useState(false); // State to toggle between all countries and visited countries

  const handleVisitedList = (country) => {
    const isAlreadyVisited = visited.some(
      (visitedCountry) => visitedCountry.cca3 === country.cca3
    );
    if (!isAlreadyVisited) {
      const newVisitedCountries = [...visited, country];
      setVisited(newVisitedCountries);
    } else {
      // If already visited, remove from visited list
      const updatedVisitedCountries = visited.filter(
        (visitedCountry) => visitedCountry.cca3 !== country.cca3
      );
      setVisited(updatedVisitedCountries);
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      let response;
      if (searchTerm) {
        // Fetch countries based on search term
        response = await fetch(
          `https://restcountries.com/v3.1/name/${searchTerm}`
        );
      } else {
        // Fetch all countries if no search term
        response = await fetch("https://restcountries.com/v3.1/all");
      }
      const data = await response.json();
      setCountries(data); // Set fetched data to countries
    };

    fetchCountries(); // Call the fetch function
  }, [searchTerm]);

  return (
    <div className="">
      <h1 className="text-2xl font-bold ">
        Rest Countries : {countries.length}
      </h1>
      <h1 className="text-2xl font-bold ">
        Visited Countries : {visited.length}
      </h1>

      {/* Toggle Button to Show Only Visited Countries */}
      <div className="mt-2">
        <button
          onClick={() => setShowVisitedOnly(!showVisitedOnly)}
          className="btn btn-primary"
        >
          {showVisitedOnly
            ? "Show All Countries"
            : "Show Only Visited Countries"}
        </button>
      </div>

      {/* Search Input */}
      {!showVisitedOnly && (
        <div className="mt-2">
          <input
            type="text"
            placeholder="Search country"
            className="input input-bordered input-success w-full max-w-xs"
            value={searchTerm} // Bind search input to state
            onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
          />
        </div>
      )}

      {/* Display Countries */}
      <div className="grid grid-cols-3 gap-x-10 gap-y-5 mt-10">
        {(showVisitedOnly ? visited : countries).map((country) => (
          <Country
            key={country.cca3}
            handleVisitedList={handleVisitedList}
            country={country}
            visited={visited} // Pass visited list to Country component
          />
        ))}
      </div>
    </div>
  );
};

export default Countries;
