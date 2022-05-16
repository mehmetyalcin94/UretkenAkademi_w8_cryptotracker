import "./Columns.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Columns() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedField, setSortedField] = React.useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      setData(response.data);
    };
    fetchCoins();
  }, []);

  let sortedData = [...data];
  if (sortedField !== null) {
    sortedData.sort((a, b) => {
      if (a[sortedField] < b[sortedField]) {
        return -1;
      }
      if (a[sortedField] > b[sortedField]) {
        return 1;
      }
      return 0;
    });
  }

  return (
    <div>
      <table border="" className="container">
        <thead>
          <tr>
            <td>
              <input
                className="searchBar"
                type="text"
                placeholder="Search..."
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </td>
          </tr>
        </thead>
        <thead>
          <tr>
            <th className="tableItem">
              Name
              <button type="button" className="button">
                <img
                  className="sortImg"
                  src="https://icon-library.com/images/sort-by-icon/sort-by-icon-20.jpg"
                  alt=""
                  onClick={() => setSortedField("name")}
                />
              </button>
            </th>
            <th className="tableItem">Symbol</th>
            <th className="tableItem">
              Price
              <button type="button" className="button">
                <img
                  className="sortImg"
                  src="https://icon-library.com/images/sort-by-icon/sort-by-icon-20.jpg"
                  alt=""
                  onClick={() => setSortedField("price")}
                />
              </button>
            </th>
            <th className="tableItem">
              Price Change
              <button type="button" className="button">
                <img
                  className="sortImg"
                  src="https://icon-library.com/images/sort-by-icon/sort-by-icon-20.jpg"
                  alt=""
                  onClick={() => setSortedField("gain")}
                />
              </button>
            </th>
          </tr>
        </thead>
        {data
          .filter((repo) => {
            if (searchTerm === "") {
              return repo;
            } else if (
              repo.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return repo;
            }
          })
          .map((repo) => (
            <tbody>
              <tr key={repo.id}>
                <td className="tableItem">
                  <img className="coinImg" src={repo.image} alt=""></img>{" "}
                  {repo.name}
                </td>
                <td className="tableItem">{repo.symbol.toUpperCase()}</td>
                <td className="tableItem">${repo.current_price}</td>
                <td
                  className="tableItem"
                  style={
                    repo.price_change_percentage_24h.toString()[0] === "-"
                      ? {
                          color: "red",
                        }
                      : {
                          color: "green",
                        }
                  }
                >
                  {repo.price_change_percentage_24h}%
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
}

export default Columns;
