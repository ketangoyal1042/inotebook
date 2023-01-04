import Navbar from './components/Navbar';
import Approuter from './Approuter';
import { BrowserRouter } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import { useState } from 'react';
function App() {

  const [Alertv, SetAlert] = useState(null);

  const Alertval = (Mes, Type) => {
    SetAlert({
      Message: Mes,
      Type: Type
    });
    console.log("Alert");
    setTimeout(() => {
      SetAlert(null);
    }, 1500);
  };
  return (
    <NoteState>
      <div className="App">
        <BrowserRouter>
          <Navbar SetAlert={Alertval}/>
          <Alert Alert={Alertv} />
          <Alert message="Our Notes !!" />
          <div className="container">
            <Approuter SetAlert={Alertval} />
          </div>
        </BrowserRouter>
      </div >
    </NoteState>
  );
}

export default App;
