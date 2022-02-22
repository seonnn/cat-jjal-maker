import React, { useEffect, useState } from "react";
import "./App.css";
import Title from "./components/Title";
import Form from "./components/Form";
import MainCard from "./components/MainCard";
import Favorites from "./components/Favorites";

function App() {
  const jsonLocalStorage = {
    setItem: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    getItem: (key) => {
      return JSON.parse(localStorage.getItem(key));
    },
  };

  const fetchCat = async (text) => {
    const OPEN_API_DOMAIN = "https://cataas.com";
    const response = await fetch(
      `${OPEN_API_DOMAIN}/cat/says/${text}?json=true`
    );
    const responseJson = await response.json();
    return `${OPEN_API_DOMAIN}/${responseJson.url}`;
  };

  const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";

  const [mainCat, setMainCat] = useState(CAT1);
  const [counter, setCounter] = useState(() => {
    return jsonLocalStorage.getItem("counter");
  });
  const [favorites, setFavorites] = useState(() => {
    return jsonLocalStorage.getItem("favorites") || [];
  });

  const setInitialCat = async () => {
    const newCat = await fetchCat("First cat");
    setMainCat(newCat);
  };

  useEffect(() => {
    setInitialCat();
  }, []);

  const alreadyFavorite = favorites.includes(mainCat);

  const updateMainCat = async (value) => {
    const newCat = await fetchCat(value);
    setMainCat(newCat);

    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter);
      return nextCounter;
    });
  };

  function handleHeartClick() {
    const nextFavorites = [...favorites, mainCat];
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem("favorites", nextFavorites);
  }

  function CatItem({ img }) {
    return (
      <li>
        <img src={img} alt="고양이" style={{ width: "150px" }} />
      </li>
    );
  }

  return (
    <div className="App">
      <Title counter={counter} />
      <Form updateMainCat={updateMainCat} />
      <MainCard
        img={mainCat}
        onHeartClick={handleHeartClick}
        alreadyFavorite={alreadyFavorite}
      />
      <Favorites favorites={favorites} CatItem={CatItem} />
    </div>
  );
}

export default App;
