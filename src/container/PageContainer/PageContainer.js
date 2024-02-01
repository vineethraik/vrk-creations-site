import Footer from "components/Footer/Footer";
import React from "react";

export default function PageContainer({ children }) {
  return (
    <div className="d-flex flex-column h-100 w-100 overflow-auto">
      <div className="d-stick">Header</div>
      {children}
      <Footer />
    </div>
  );
}
