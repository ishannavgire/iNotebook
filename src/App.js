import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import About from "./components/About";

function App() {
  return (
    <>
      <Router>
        <div>
          <Navbar />
          <div className="scrollable" style={{ width: "100%", top: "500px", maxHeight: "1000px", overflow: "auto" }}>
            <Switch>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/"></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
