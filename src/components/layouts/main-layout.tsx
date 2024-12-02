import React from "react";
import ContainerWrapper from "../wrappers/container";
import Navbar from "./navbar/navbar";
import TopNavigation from "./navbar/top/top-nav";
import BottomNavigation from "./navbar/bottom/bottom-nav";
import Footer from "./footer/footer";

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <TopNavigation />
      <ContainerWrapper>
        <Navbar />
        {children}
        <BottomNavigation />
      </ContainerWrapper>
      <Footer />
    </>
  );
}

export default MainLayout;
