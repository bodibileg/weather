import { useState } from "react";
import searchSVG from "../../assets/icons/static/search.svg";
import myLocation from "../../assets/icons/static/my-location.png";
import {
  getLocationZipcode,
  getLocationFromBrowser,
} from "../../services/geoLocation";
import getWeatherData from "../../services/getWeatherData";
import { useSelector, useDispatch } from "react-redux";
import {
  resetWeatherState,
  setLoading,
  setLocation,
  setWeatherData,
} from "../../containers/weatherSlice";
import Alert from "@mui/material/Alert";
import SnackBar from "@mui/material/Snackbar";
import isNight from "../../utils/isNight";
import "./SearchBar.scss";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const units = useSelector((state) => state.units);

  const zipcodePattern = /^\d{5}$/;

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const getWeatherByZipcode = async (zipcode) => {
    // loading
    dispatch(resetWeatherState());
    dispatch(setLoading(true));

    // get and set location and name from zipcode
    const location = await getLocationZipcode(zipcode);
    if (location) {
      const { latitude, longitude, name } = location;
      dispatch(setLocation({ lat: latitude, lon: longitude, name: name }));

      // get and set weather data
      const result = await getWeatherData(latitude, longitude, units);
      result.current.name = name;
      isNight(result.current, dispatch);
      dispatch(setWeatherData(result));
    }

    // loading false
    dispatch(setLoading(false));
  };

  const handleClick = () => {
    if (!zipcodePattern.test(input)) {
      setError("Please enter a valid zipcode");
      return;
    }
    getWeatherByZipcode(input);

    input && setInput("");
  };

  const getWeatherByLocation = async () => {
    // loading
    dispatch(resetWeatherState());
    dispatch(setLoading(true));

    // get and set location and name from browser
    const { latitude, longitude, name } = await getLocationFromBrowser();
    dispatch(setLocation({ lat: latitude, lon: longitude, name: name }));

    // get and set weather data
    const result = await getWeatherData(latitude, longitude, units);
    result.current.name = name;
    isNight(result.current, dispatch);
    dispatch(setWeatherData(result));

    // loading false
    dispatch(setLoading(false));
  };

  const handleLocationClick = () => {
    getWeatherByLocation();
  };

  return (
    <div className="search-bar">
      <input
        className="input"
        placeholder="Enter zipcode ... "
        value={input}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
      />
      <button className="search-button" onClick={handleClick}>
        <img className="search-icon" src={searchSVG} alt="search icon" />
      </button>
      <button className="location-button" onClick={handleLocationClick}>
        <img
          className="my-location-icon"
          src={myLocation}
          alt="my location icon"
        />
      </button>
      <SnackBar
        open={error !== ""}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setInput("");
          setError("");
        }}
      >
        <Alert
          onClose={() => {
            setInput("");
            setError("");
          }}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </SnackBar>
    </div>
  );
};

export default SearchBar;
