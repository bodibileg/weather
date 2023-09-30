import { setTheme } from "../containers/themeSlice";

const isNight = (current, dispatch) => {
  if (current.dt > current.sunset || current.dt < current.sunrise) {
    console.log("night");
    document.body.style = "background-color: #1a3858;";
    dispatch(setTheme(true));
  } else {
    console.log("day");
    document.body.style = "background-color: #4f9bec;";
    dispatch(setTheme(false));
  }
};

export default isNight;
