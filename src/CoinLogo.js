import React, { useState, useEffect } from "react";
import axios from "axios";

const CoinLogo = ({ coinId }) => {
  const [logoUrl, setLogoUrl] = useState(null);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await axios.get(
          `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${coinId}`
        );
        const coinData = response.data.data[coinId];
        if (coinData && coinData.logo) {
          setLogoUrl(coinData.logo);
        }
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };

    fetchLogo();
  }, [coinId]);

  return (
    <div>
      {logoUrl && (
        <img src={logoUrl} alt={`Logo of coin ${coinId}`} width="64" height="64" />
      )}
    </div>
  );
};

export default CoinLogo;
