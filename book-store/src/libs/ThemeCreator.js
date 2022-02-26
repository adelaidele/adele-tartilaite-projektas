import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  mixins: {
    drawer: {
      width: 240,
    },
  },
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    white: {
      main: "#ffff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    alert: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});
