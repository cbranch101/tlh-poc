import React, { useCallback } from "react";
import { useStyletron } from "baseui";

const breakpointContext = React.createContext(null);

const getBreakpointFromWidth = (width, { small, medium, large }) => {
  if (width < small) {
    return 0;
  }

  if (width >= small && width < medium) {
    return 1;
  }

  if (width >= medium && width < large) {
    return 2;
  }

  return 3;
};

export const BreakpointProvider = ({ children }) => {
  const [, theme] = useStyletron();
  const [breakpoint, setBreakpoint] = React.useState(
    getBreakpointFromWidth(window.innerWidth, theme.breakpoints)
  );

  const handleWindowResize = useCallback(() => {
    const nextBreakpoint = getBreakpointFromWidth(
      window.innerWidth,
      theme.breakpoints
    );
    setBreakpoint((prevBreakpoint) => {
      if (prevBreakpoint === nextBreakpoint) {
        return nextBreakpoint;
      }
      return nextBreakpoint;
    });
  }, [theme, setBreakpoint]);
  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);

  return (
    <breakpointContext.Provider value={breakpoint}>
      {children}
    </breakpointContext.Provider>
  );
};

const useBreakpoint = () => {
  const breakpoint = React.useContext(breakpointContext);
  const isMobile = breakpoint < 2;
  return [breakpoint, isMobile];
};

export default useBreakpoint;
