import {BrowserRouter,Routes,Route,Link} from "react-router-dom"
import './App.css';
import Login from "./pages/login";
import Home from "./pages/Home";
import Signup from "./pages/signup";
function App() {
  return (
    
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
      Mohansundar
    </div>
    </BrowserRouter>
  );
}

export default App;
