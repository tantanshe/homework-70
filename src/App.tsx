import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import AddContact from './containers/AddContact/AddContact';
import EditContact from './containers/EditContact/EditContact';

const App = () => {

  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/addContact" element={<AddContact/>}/>
          <Route path="/edit/:id" element={<EditContact/>}/>
          <Route path="*" element={<h2>Not found</h2>}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;
