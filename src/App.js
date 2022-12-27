import './App.css';
import Navbar from './components/Navbar';
import Approuter from './Approuter';
import { BrowserRouter } from "react-router-dom";
import NoteState from './context/notes/NoteState';
function App() {
  return (
    <NoteState>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Approuter />
        </BrowserRouter>
    </div >
    </NoteState>  
  );
}

export default App;
