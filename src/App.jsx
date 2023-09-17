import React from "react";
import AOS from 'aos';
import AppRouter from "./router/AppRouter";
import "./App.css";
import 'aos/dist/aos.css'; 

AOS.init();

export default function App() {
  return <AppRouter />;
}
