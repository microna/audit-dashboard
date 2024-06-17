import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StateProvider } from "./state/StateProvider.jsx";
import { LayoutProvider } from "./layout/LayoutProvider.jsx";
import { AuthLayout } from "./layout/AuthLayout.jsx";
import { Login } from "./page/Login.jsx";
import { AuditOne } from "./page/AuditOne.jsx";
import { AddAndUpdateAudit } from "./page/AddAndUpdateAudit.jsx";
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
              <Route
                path="add-audit"
                element={<AddAndUpdateAudit action={"create"} />}
              />
              <Route
                path="update-audit/:id"
                element={<AddAndUpdateAudit action={"update"} />}
              />
              <Route path="audit" element={<AuditOne />} />
            </Route>
            <Route path="login" element={<Login />} />
          </Routes>
        </LayoutProvider>
      </StateProvider>
    </BrowserRouter>
  );
}

export default App;
