export const buildingStateConstants = {
  TEXTS: {
    CODE: `import React from 'react';
    import ReactDOM from 'react-dom/client';
    import './index.css';
    import App from './App';
    import reportWebVitals from './reportWebVitals';
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
    reportWebVitals();`,
    TERMINAL: `
    $ mqtt-server run
    Started mqtt.service - Service for mqtt application.
    Using default config from mqtt/default_config.conf
    mqtt version 5.0 starting
    Config loaded from mqtt/default_config.conf
    Starting in local only mode. Connections will only be possible from clients running on this machine
    Create a configuration file which defines a listener to allow remote access.
    Opening ipv4 listen socket on port 1883.
    Opening ipv6 listen socket on port 1883.
    MQTT version 5.0 running`,
  },
  LOADING_TEXT: {
    CODE: "Building Page",
    TERMINAL: "Building Server",
  },
};
