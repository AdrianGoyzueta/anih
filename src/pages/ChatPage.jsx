import React from "react";
import { ConversacionBot } from "../components/Chat";

export function ChatPage( {user} ) {

  return (
    <section className="cont">
      <ConversacionBot infoUser={user} />
    </section>
  );
}
