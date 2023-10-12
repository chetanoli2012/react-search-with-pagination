import { useEffect, useState } from "react";
import "./App.css";

const BASE_URL = "https://api.punkapi.com/v2/beers";
const PER_PAGE = 25;
function App() {
  const [beers, setBeers] = useState([]);
  const [page, setPage] = useState(1);
  const [beerName, setBeerName] = useState("");

  const fetchBearData = async (page, PER_PAGE, beerName) => {
    try {
      let response = await fetch(
        `${BASE_URL}?page=${page}&per_page=${PER_PAGE}${
          beerName !== "" ? `&beer_name=${beerName}` : ""
        }`
      );
      response = await response.json();
      setBeers(response);
    } catch (e) {
      console.error("Error while fetching the beer data", e);
    }
  };

  useEffect(() => {
    fetchBearData(page, PER_PAGE, beerName);
  }, [page, beerName]);

  const handlePageChange = (e) => {
    setPage(e.target.value);
  };

  const handleSearch = (e) => {
    setBeerName(e.target.value);
  };

  return (
    <div className="app">
      <h1>Beer list</h1>
      <div>
        <input
          type="text"
          placeholder="Enter the Beer name here"
          onChange={handleSearch}
          value={beerName}
        />
      </div>
      <div>
        <label htmlFor="page">Page</label>
        <select id="page" onChange={handlePageChange}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>

      {beers.map(function ({ id, name, tagline, image_url }) {
        return (
          <Beer key={id} name={name} tagline={tagline} image_url={image_url} />
        );
      })}
    </div>
  );
}

const Beer = ({ name, tagline, image_url }) => {
  return (
    <div className="beer">
      <div>
        <img src={image_url} alt={name} />
      </div>
      <div>
        <h2>{name}</h2>
        <p>{tagline}</p>
      </div>
    </div>
  );
};

export default App;
