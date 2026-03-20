import { createContext, lazy, ReactNode, Suspense, useContext } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
const ChatWidget = lazy(() => import("./ChatWidget"));

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
        <Suspense fallback={null}><ChatWidget /></Suspense>
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;
