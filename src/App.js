import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "./pages/MainPage";
import { UserForm } from "./pages/UserForm";
import { ContactForm } from "./pages/ContactosForm";
import { ChatPage } from "./pages/ChatPage";
import DenunciaForm from "./pages/DenunciaForm";
import AdminPage from "./pages/aNoticias";
import DNoticias from "./pages/cNoticia";
import { Ajustes } from "./components/Ajustes";

function App() {
  const [user, setUser] = useState({Id: 0, Alias: "Inicio Sesion", Tipo: "Usuario"});

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main user={user} setUser={setUser} />} />
        <Route path="/usuario" element={<UserForm user={setUser} />} />
        <Route path="/contactos" element={<ContactForm user={user} />} />
        <Route path="/chat" element={<ChatPage user={user} />} />
        <Route path="/ajustes" element={<Ajustes user={user}/>} />
        <Route path="/denuncia" element={<DenunciaForm user={user} />} />
        <Route path="/noticias" element={user.Tipo !== "Usuario" ? <AdminPage /> : <DNoticias/>} />
        <Route path="*" element={<h1>Not Found 404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
