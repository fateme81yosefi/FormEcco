import React, { useContext, useEffect } from "react";
import Home from "./components/Home/Home";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { DataContext } from "../src/components/shared/Shared";

export default function App() {

  return (
    <BrowserRouter>
      <Switch>
          <Home />
      </Switch>
    </BrowserRouter>
  );
}
