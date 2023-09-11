import { isServer } from "@/utils/utils"; //  ensures that the hook initializes the state appropriately based on whether the code is running on the server or the client side.
import { useEffect, useState } from "react";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState(() => {
    if (isServer()) return { width: 0, height: 0 };
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

//  a custom React hook that provides a way to track and access the dimensions of the browser window as state.
//It initializes the state with appropriate values based on whether it's running on the server or the client,
//updates the state when the window is resized, and cleans up the event listener when the component is unmounted.
//This hook is useful for creating responsive design and layout adjustments.
