import { createContext, ReactNode, useContext } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const LayoutContext = createContext(false);

const Layout = ({ children }: { children: ReactNode }) => {
  const isNestedLayout = useContext(LayoutContext);

  if (isNestedLayout) {
    return <>{children}</>;
  }

  return (
    <LayoutContext.Provider value={true}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;
