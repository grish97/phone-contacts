import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "components/MainLayout";
import ConatctLayout from "components/ConatctLayout";

// pages
import Contacts from "pages/Contacts";
import ContactActions from "pages/ContactActions";
import NotFound from "pages/NotFound";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/contact" replace />} />

          <Route path="/contact" element={<ConatctLayout />}>
            <Route index element={<Contacts />} />

            <Route path="create" element={<ContactActions />} />
            <Route path="edit/:id" element={<ContactActions />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default Routing;
