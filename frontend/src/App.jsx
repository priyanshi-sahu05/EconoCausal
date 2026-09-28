import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import DataUpload from "./pages/DataUpload";
import BudgetInput from "./pages/BudgetInput";
import Visualizations from "./pages/Visualizations";
import AllocationMatrix from "./pages/AllocationMatrix";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="main-layout">
        <Sidebar />

        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route
              path="/upload"
              element={<DataUpload />}
            />

            <Route
              path="/budget"
              element={<BudgetInput />}
            />

            <Route
              path="/visualizations"
              element={<Visualizations />}
            />

            <Route
              path="/allocation"
              element={<AllocationMatrix />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;