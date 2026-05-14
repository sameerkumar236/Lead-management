import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { LeadProvider } from "./store/LeadContext";

const App = () => {
  return (
    <BrowserRouter>
      <LeadProvider>
        <AppRoutes />
      </LeadProvider>
    </BrowserRouter>
  );
};

export default App;
