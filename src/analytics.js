import ReactGA from "react-ga4";

export const initializeGA = () => {
  ReactGA.initialize("G-GE3W4JRF2H"); 
};

export const logPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export const logEvent = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};
