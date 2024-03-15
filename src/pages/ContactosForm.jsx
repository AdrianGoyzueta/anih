import React from "react";
import { RegContactos } from "../components/Contacto";
import "../styles/formUser.css"

export function ContactForm( {id} ) {
  return (
    <RegContactos id={id}/>
  );
}