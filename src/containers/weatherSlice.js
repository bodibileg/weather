import { createSlice } from "@reduxjs/toolkit";

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    loading: false,
    location: {
      lat: null,
      lon: null,
      name: null,
    },
    weatherData: {
      current: null,
      daily: [],
      hourly: [],
    },
    units: "imperial",

  },
  reducers: {
    setLoading: (state, actions) => {
      state.loading = actions.payload;
    },
    setLocation: (state, actions) => {
      state.location = actions.payload;
    },
    setWeatherData: (state, actions) => {
      state.weatherData = actions.payload;
    },
    setUnit: (state, actions) => {
      console.log("setUnit", actions.payload);
      state.units = actions.payload;
    },
  },
});

export const { setLoading, setLocation, setWeatherData, setUnit } =
  weatherSlice.actions;

export default weatherSlice.reducer;
