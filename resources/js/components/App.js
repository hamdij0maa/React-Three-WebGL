import React, { Component } from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import { Router, Route } from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import history from "./utils/history";
import Home from "./pages/Home";
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
    }

    render() {
        return (
            <Router history={history}>
                <div className="app-container">
                    <AnimatedSwitch
                        atEnter={{ opacity: 0 }}
                        atLeave={{ opacity: 0 }}
                        atActive={{ opacity: 1 }}
                        className="switch-wrapper"
                    >
                        <Route exact path="/" component={Home} />
                    </AnimatedSwitch>
                </div>
            </Router>
        );
    }
}

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}
