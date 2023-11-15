
import { createTheme } from "@mui/material/styles";


// export const theme = createTheme({
//   shadows: ['1'],
//   palette: {
//     primary: {
//       main: "#4361ee",
//     },
//   },
//   typography: {
//     button: {
//       textTransform: "none",
//       fontWeight: 400,
//     },
//   },
// });
export let theme = createTheme();
const shadows = theme.shadows;
shadows[1] = 'my custom shadow';
shadows[2] = 'my custom shadow 2';
theme = createTheme({ shadows });