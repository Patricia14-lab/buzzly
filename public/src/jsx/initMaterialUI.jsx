Object.assign(window, window['MaterialUI']);

let palette = {
  primary: {
    main: '#194F8F',
  },
  secondary: {
    main: localStorage.getItem("theme") == "dark" ? '#363640' : '#ccccff',
    color: '#FFFFFF',
  },
};

const darkTheme = createTheme({
  typography: {
    button: {
      textTransform: 'none'
    },
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#121215',
      paper: '#121218',
    },
    ...palette
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    ...palette
  },
});

if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "dark");
}

let theme = localStorage.getItem("theme") == "dark" ? darkTheme : lightTheme;