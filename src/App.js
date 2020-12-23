
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path = '/' component = {Login}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
