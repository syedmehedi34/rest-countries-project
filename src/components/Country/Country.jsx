/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

/* eslint-disable react/prop-types */
const Country = ({ country, handleVisitedList, visited }) => {
  const { name, capital, area, flags } = country;

  // Determine if this country is already visited
  const isVisited = visited.some(
    (visitedCountry) => visitedCountry.cca3 === country.cca3
  );

  return (
    <div className="border rounded-lg p-5 flex flex-col space-y-2">
      <img src={flags.png} className="h-12 w-20" alt={`${name.common} flag`} />
      <h1>Country : {name.common}</h1>
      <h5>Capital : {capital}</h5>
      <h5>Area : {area} sq km</h5>
      <button
        onClick={() => {
          handleVisitedList(country);
        }}
        className={`btn btn-ghost w-full font-extrabold hover:bg-slate-400 ${
          isVisited ? "bg-green-500" : "bg-[tomato]"
        }`}
      >
        {isVisited ? "Visited" : "Not Visited"}
      </button>
    </div>
  );
};

export default Country;
