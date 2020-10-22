import React, { useEffect, useState } from "react";
import { Header } from "../Components/layout/Header";
import { Content } from "../Components/layout/Content";
import { Tutorial } from "../Components/Tutorial/Tutorial";

export const Home = () => {
  return (
    <div className="App">
      <Header />
      <Content />
      <Tutorial />
    </div>
  );
};
