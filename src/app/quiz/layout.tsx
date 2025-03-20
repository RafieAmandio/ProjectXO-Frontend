import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

type TLayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: TLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
