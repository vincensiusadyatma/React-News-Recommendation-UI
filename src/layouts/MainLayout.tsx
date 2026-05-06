import Navbar from "../components/Navbar";
import type { PropsType } from "../Types/PropsType";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";


const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#020a1a", 
      paper: "#1e293b",
    },
  },
});

const MainLayout = ({ children, func }: PropsType) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <div className="min-h-screen flex flex-col bg-[#020a1a]">
        <Navbar func={func} />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

    </ThemeProvider>
  );
};

export default MainLayout;