import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import SignIn from "./routes/sign-in/sing-in.component";

const App = () => {
  return(
    <Routes>
      <Route path="/" element={<Navigation />} >
        <Route index element={<Home />} />
        {/* index: if url matches '/' Home component is also be rendered */}
        <Route path='sing-in' element={<SignIn />} />
      </Route>
    </Routes>


  ) 
}

export default App;
