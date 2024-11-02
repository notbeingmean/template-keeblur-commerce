import React from "react";
import ContainerWrapper from "../wrappers/container";
import Navbar from "./navbar/navbar";
import TopNavigation from "./navbar/top-nav";

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
      </ContainerWrapper>
    </>
  );
}

export default MainLayout;
