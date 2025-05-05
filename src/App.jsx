import NavBar from "./components/NavBar";
import Routing from "./components/Routing";

import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </>
  );
}

export default App;
