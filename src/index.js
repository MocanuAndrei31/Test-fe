import React from "react";
import { createRoot } from "react-dom/client";
import Dashboard from "./Dashboard/Dashboard";
import "./index.css";

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<Dashboard />);
