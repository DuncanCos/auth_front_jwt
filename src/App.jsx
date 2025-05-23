import NavBar from "./components/NavBar";
import Routing from "./components/Routing";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contextes/AuthProvider";

function App() {
  return (
    <>
      
        <BrowserRouter>
        <AuthProvider>
          <NavBar />
          <Routing />
          </AuthProvider>
        </BrowserRouter>
      
    </>
  );
}

export default App;
