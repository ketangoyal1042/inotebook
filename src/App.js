import Navbar from './components/Navbar';
import Approuter from './Approuter';
import { BrowserRouter } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
function App() {
  return (
    <NoteState>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Alert message="Our Notes !!"/>
          <div className="container">
          <Approuter />
          </div>
        </BrowserRouter>
      </div >
    </NoteState>
  );
}

export default App;
