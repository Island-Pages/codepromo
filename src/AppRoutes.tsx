import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/Navbar';
import HomePage from './screens/Home/Index';
import CreateCode from './screens/CreateCode';
import ValidationCode from './screens/ValidationCode';
import Login from './screens/Login';
import CodeCreated from './screens/CodeCreated';
import ValidCode from './screens/ValidCode';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/*"
          element={
            <>
              <NavBar />
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/createCode" element={<CreateCode />} />
                <Route path="/createdCode" element={<CodeCreated />} />
                <Route path="/validationCode" element={<ValidationCode />} />
                <Route path="/validCode" element={<ValidCode />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
