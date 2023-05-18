import "./App.css";
import Detail from "./views/Detail/Detail";
import Form from "./views/Form/Form";
import Home from "./views/Home/Home";
import Landing from "./views/Landing/Landing";
import NavBar from "./components/NavBar/NavBar.jsx";
import { Route, useLocation } from "react-router-dom";
// import { Redirect } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Route exact path="/" component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/create" component={Form} />
      <Route path="/detail/:id" component={Detail} />
      {/* <Route path="/detail/*" render={() => <Redirect to="/" />} /> */}
    </div>
  );
}

export default App;
