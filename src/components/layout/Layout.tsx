import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="app-shell" data-route={location.pathname}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
