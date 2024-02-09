import Footer from "components/Footer/Footer";
import React from "react";
import "./PageContainer.css";
import { Header } from "components/Header/Header";

export default function PageContainer({
  className,
  children,
  containerClassName,
}) {
  return (
    <div
      className={`page__container d-flex flex-column overflow-auto  ${className}`}
    >
      <Header />
      <div className={`flex-grow-1 ${containerClassName}`}>{children}</div>
      <Footer />
    </div>
  );
}
