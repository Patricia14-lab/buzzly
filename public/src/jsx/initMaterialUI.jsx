Object.assign(window, window["MaterialUI"]);

const themename = localStorage.getItem("theme") ?? "dark";

let palette = {
  primary: {
    main: "#194F8F",
    contrastText: themename == "dark" ? "#fff" : "#000",
  },
  secondary: {
    main: themename == "dark" ? "#363640" : "#ccccff",
    color: "#fff",
  },
};

const darkTheme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
  palette: {
    mode: "dark",
    background: {
      default: "#121215",
      paper: "#121218",
    },
    ...palette,
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    ...palette,
  },
});

let theme = themename == "dark" ? darkTheme : lightTheme;
