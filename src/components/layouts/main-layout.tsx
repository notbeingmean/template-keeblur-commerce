import React from "react";
import ContainerWrapper from "../wrappers/container";
import Navbar from "./navbar/navbar";
import TopNavigation from "./navbar/top-nav";
import BottomNavigation from "./navbar/bottom-nav";

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
    </>
  );
}

export default MainLayout;
