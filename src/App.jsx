import { useState } from "react";
import Preloader from "./components/Preloader/Preloader";
import HomePage from './components/HomePage/HomePage';
import { useEffect } from "react";

function App() {
  const [preloading, setPreloading] = useState(true);
  useEffect(() => {
    setInterval(() => {
      setPreloading(false);
    }, 3000);
  }, []);
  return <>{preloading ? <Preloader /> : <HomePage />}</>;
}

export default App;
