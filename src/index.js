import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Bitacora from "./pages/bitacora";
import Equipos from "./pages/equipos";
import Observaciones from "./pages/observaciones";
import Usuarios from "./pages/usuarios";
import Solicitud from "./pages/solicitud";
import Materia from "./pages/materia";
import Chat from "./chat/chat";

export default function App() {
  return (
    <BrowserRouter>
      <Chat/>
      <Routes>
          <Route index element={<Home />} />
          <Route path="Equipos" element={<Equipos />} />
          <Route path="Bitacora" element={<Bitacora />} />
          <Route path="Observaciones" element={<Observaciones />} />
          <Route path="Usuarios" element={<Usuarios />} />
          <Route path="Solicitud" element={<Solicitud />} />
          <Route path="Materias" element={<Materia />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
