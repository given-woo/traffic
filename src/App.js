import React from "react";

import Weather from "./components/Weather";
import Risk from "./components/Risk"
import Accidents from "./components/Accidents";

import "./App.css";

class App extends React.Component {
    render() {
        return(
            <div className="main-container">
                <Weather/>
                <Risk/>
                <Accidents/>
            </div>
        )
    }
}

export default App;