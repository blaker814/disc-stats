import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { UserProvider } from "./providers/UserProvider";
import { ToastContainer } from "react-toastify";
import { Navigation } from "../src/components/Navigation";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer closeOnClick autoClose={3000} position="bottom-right" hideProgressBar />
      <UserProvider>
        <Router>
          <Navigation />
          <ApplicationViews />
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;