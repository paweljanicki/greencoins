import { useEffect } from "react";
import Events from "./Events";
import Header from "./Header";
import Mapbox from "./Mapbox";

function App() {
  return (
    <>
      <Header />
      <Mapbox className="h-svh w-full fixed top-0 left-0" />
      {/* <Events /> */}
    </>
  );
}

export default App;
