import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const CoinList = () => {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [filters, setFilters] = useState({
    marketCap: 1000000000, // 1 billion
    volume: 100000000, // 100 million
  });

  // Fetch data from the proxy server endpoint
  const fetchData = async () => {
    try {
      const response1 = await axios.get("http://localhost:3001/api/coins");

      // Process response1 and response2 as needed
      const data1 = response1.data.data;

      // Update state with data from both responses
      setCoins(data1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch initial data
  }, []); // Run only once on component mount

  useEffect(() => {
    // Filter coins based on filters
    const filtered = coins.filter((coin) => {
      return (
        coin.quote.USD.market_cap < filters.marketCap &&
        coin.quote.USD.volume_24h > filters.volume
      );
    });
    setFilteredCoins(filtered);
  }, [coins, filters]);

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <div className="bg-slate-400 pb-32">
      <div className="px-4 py-6 sm:px-6">
        <h3 className="text-base font-semibold leading-7">Crypto Coins</h3>
        <div className="grid border h-32 gap-4 mt-4">
          <div>
            <label className="text-sm font-medium">
              Market Cap (less than):
            </label>
            <input
              className="text-sm font-medium text-gray-900"
              type="number"
              value={filters.marketCap}
              onChange={(e) => handleFilterChange("marketCap", e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">
              Volume (greater than):
            </label>
            <input
              className="text-sm font-medium text-gray-900"
              type="number"
              value={filters.volume}
              onChange={(e) => handleFilterChange("volume", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700">
        <ul className="divide-y divide-gray-100">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => (
              <li
                key={coin.id}
                className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt className="text-sm font-medium text-gray-900">Name</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {coin.name}
                </dd>
                <dt className="text-sm font-medium text-gray-900">
                  Market Cap
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {coin.quote.USD.market_cap.toLocaleString()}
                </dd>
                <dt className="text-sm font-medium text-gray-900">
                  Volume 24h
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {coin.quote.USD.volume_24h.toLocaleString()}
                </dd>
                <dt className="text-sm font-medium text-gray-900">
                  Circulating Supply
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {coin.circulating_supply.toLocaleString()}
                </dd>
                <dt className="text-sm font-medium text-gray-900">Ranking</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {coin.cmc_rank}
                </dd>
              </li>
            ))
          ) : (
            <li className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <span className="text-sm text-gray-500 sm:col-span-2 sm:mt-0">
                No coins found
              </span>
            </li>
          )}
        </ul>{" "}
      </div>
    </div>
  );
};

export default CoinList;
