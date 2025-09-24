// src/App.tsx
import { useState } from 'react';
import { Outlet } from "react-router-dom";
import { Header } from "@/components/layouts/Header";

function App() {
  const [, setSidebarOpen] = useState(false);

  return (
    // O container principal usa 'flex' para alinhar os filhos lado a lado.
    <div className="flex min-h-screen w-full bg-muted/40">

      {/* Este container agrupa o Header e o Main.
        'flex-1' faz ele ocupar todo o espaço restante.
        'flex-col' faz seus filhos (Header e Main) se alinharem verticalmente.
      */}
      <div className="flex flex-1 flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default App;