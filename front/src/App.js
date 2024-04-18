import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StateProvider } from "./state/StateProvider.jsx";
import { LayoutProvider } from "./layout/LayoutProvider.jsx";
import { AuthLayout } from "./layout/AuthLayout.jsx";
import { Dashboard } from "./page/Dashboard.jsx";
import { Login } from "./page/Login.jsx";
import { AuditOne } from "./page/AuditOne.jsx";
import { AddAudit } from "./page/AddAudit.jsx";
import { Audit } from "./page/Audit.jsx";
import { Home } from "./page/home/Home.jsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <StateProvider>
        <LayoutProvider>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route index element={<Home />} />
              <Route path="audit/:id" element={<AuditOne />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="add-audit" element={<AddAudit />} />
              <Route path="audit" element={<Audit />} />
            </Route>
            <Route path="login" element={<Login />} />
          </Routes>
        </LayoutProvider>
      </StateProvider>
    </BrowserRouter>
  );
}

export default App;
