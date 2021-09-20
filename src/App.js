import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";

const App = () => {
  return (
    <>
      <Router>
        <div>
          <NoteState>
            <Navbar />
            <Alert message="This is alert!" />
            <div className="container">
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
          </NoteState>
        </div>
      </Router>
    </>
  );
};

export default App;
