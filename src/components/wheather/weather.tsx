import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { getWeathweData } from "../../apis/getweather";
import LogoutButton from "../logout/logout";
import "../../App.css";
import {
  FaTemperatureArrowDown,
  FaTemperatureArrowUp,
  FaWind,
} from "react-icons/fa6";
import { GiWhirlwind } from "react-icons/gi";
import { RiDeleteBinFill } from "react-icons/ri";

function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);


  // useEffect(() => {
  //   getWeathweData(search);
  // }, [search]);

  async function handelSearch() {
    if (!search.trim()) {
      setError("Please enter a city name");
      return;
    } else {
      setError("");
      setLoading(true);
  
      try {
        const data = await getWeathweData(search);
  
        setTimeout(() => {
          if (data.cod === 200) {
            setWeatherData(data);
            setSearch("");
  
            const newSearch = {
              name: data.name,
              country: data.sys.country,
              temp: data.main.temp,
              icon: data.weather[0].icon,
            };
  
            // ذخیره‌ی ۵ جستجوی آخر
            const updatedSearches = [newSearch, ...recentSearches].slice(0, 5);
            setRecentSearches(updatedSearches);
            localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  
          } else if (data.cod === "404") {
            setError("City not found");
            setWeatherData(null);
          } else {
            setError("No weather data found.");
            setWeatherData(null);
          }
          setLoading(false);
        }, 5000);
      
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  }
  
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);
  
    
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  function addToFavorites() {
    if (
      weatherData &&
      !favorites.some((item) => item.name === weatherData.name)
    ) {
      const updatedFavorites = [...favorites, weatherData];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); 
    }
  }
  function deleteFavorites(cityName) {
    const updatedFavorites = favorites.filter((item) => item.name !== cityName);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }
  
  return (
    <div className="weather-container pt-5 flex flex-row-reverse">
      <div className="relative  flex flex-col justify-end items-end  border-2 border-white rounded-lg pt-2 w-80 h-[575px] ml-auto  p-4 mr-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex flex-col items-center pt-4">
        <div className="flex flex-row justify-center  items-center  w-full  p-2 ">
          <input
            type="text"
            className="outline-none w-[500px] h-10 pl-4 rounded-l-lg"
            placeholder="Search a city"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handelSearch}
            className="bg-white h-10 pr-4 rounded-r-lg"
          >
            <IoSearchOutline />
          </button>
        </div>
        {error && (
          <p className="text-red-500 mt-1 flex justify-center items-center">
            {error}
          </p>
        )}
        </div>
    
        <div className="mt-5">

  <div className="flex flex-col gap-2">
    {recentSearches.map((item, index) => (
      <div key={index} className="flex flex-row gap-4 items-center border-2 border-white/40 p-2 rounded-lg">
        <span className="text-lg font-bold">
          {item.name}, {item.country}
        </span>
        <span className="text-lg">{item.temp}°C</span>
        <img
          src={`https://openweathermap.org/img/wn/${item.icon}.png`}
          alt="Weather icon"
          className="w-16 h-16"
        />
      </div>
    ))}
  </div>
</div>
      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-md bg-white/30">
          <img
            src="src/assets/Animation - 1740389580545.gif"
            alt="loading"
            className="w-96 h-96"
          />
        </div>
      )}

      <div className="flex flex-col justify-center items-center content-center ml-20">
        {/* <h1 className="text-4xl font-bold animate-pulse flex justify-center items-center content-center text-center">Weather</h1> */}
      {weatherData && weatherData.weather && weatherData.weather[0] && (
        <div className="flex flex-col justify-center items-center ">

        <div className="flex flex-row justify-center items-center content-center pt-20 gap-16">
          <div className="flex flex-col ">
            <img
              className="w-40 h-40"
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-5xl">
              {weatherData.name},{weatherData.sys.country}
            </h3>
            <p className="text-2xl">{weatherData.weather[0].description}</p>
            <p className="text-4xl font-bold">{weatherData.main.temp}°C</p>
          </div>
          <div className=" flex flex-col">
            <p className="flex flex-row gap-2">
              <FaTemperatureArrowDown />
              Min Temperature: {weatherData.main.temp_min}°C
            </p>
            <p className="flex flex-row gap-2">

              {" "}
              <FaTemperatureArrowUp />
              Max Temperature: {weatherData.main.temp_max}°C
            </p>
            
            <p className="flex flex-row gap-2">

              {" "}
              <GiWhirlwind />
              Wind Speed: {weatherData.wind.speed} m/s
            </p>
            <p className="flex flex-row gap-2">

              {" "}
              <FaWind />
              Wind Direction: {weatherData.wind.deg}°
            </p>
          </div>
        </div>
            <button
              onClick={addToFavorites}
              className="border-2 border-white text-black  rounded mt-5 p-1 hover:bg-white/50 "
            >
              Add to favorites
            </button>
        </div>
      )}
      <div className="mt-6 w-full ">
        <h3 className="text-lg font-semibold ml-20">🧡 Favorites:</h3>

        <div className="border-t-2 w-full border-white  mr-20 ml-20 flex flex-row gap-10">
          {favorites.map((item, id) => (
            <div key={id} className="flex flex-col items-center border-2 border-white p-2 rounded-lg mt-2">
              <span className="text-xl font-bold">
                {item.name},{item.sys.country}
              </span>
              <span className="text-lg">{item.main.temp}°C</span>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
                className="w-16 h-16"
              />
              <button
              onClick={() => deleteFavorites(item.name)}
              className=" text-black  rounded mt-2  hover:bg-white/50 "
            >
              <RiDeleteBinFill />
            </button>
            </div>
          ))}
        </div>
      </div>
      </div>
      <LogoutButton/>
     
    </div>
  );
}

export default Weather;
