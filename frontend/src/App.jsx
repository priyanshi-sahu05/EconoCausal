import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import DataUpload from "./pages/DataUpload";
import BudgetInput from "./pages/BudgetInput";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <div className="main-layout">
          <Sidebar />

          <main className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/upload" element={<DataUpload />} />
              <Route path="/budget" element={<BudgetInput />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;