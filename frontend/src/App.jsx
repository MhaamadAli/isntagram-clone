import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./ui/pages/Home/Home";
import Authentication from './ui/pages/Authentication/Authentication'
import Profile from './ui/pages/Profile/Profile'
import './ui/styles/utilities.css'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
