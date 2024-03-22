import React from "react";
import ReactDom from "react-dom";
import { createRoot } from "react-dom/client";
import "./style.scss";

const PlaceholderComponent = () => "Ok, seems everything went just right!";

const domNode = document.getElementById("app");
const root = createRoot(domNode);

root.render(<PlaceholderComponent />);
