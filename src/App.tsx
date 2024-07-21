import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';

const App = () => {

  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="*" element={<h2>Not found</h2>}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;
