import React from "react";
import App from "./App";

import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

const PARENT_DIV_SELECTOR = "div.css-175oi2r.r-k4xj1c.r-18u37iz.r-1wtj0ep";
const TWEET_CONTAINER_SELECTOR = "[data-testid='tweet']";

function initializeApp() {
  const app = document.createElement("div");
  app.id = "root";

  function appendFactCheckButton() {
    setTimeout(() => {
      let parentDiv = document.querySelector(PARENT_DIV_SELECTOR);

      while (!parentDiv) {
        console.error("Parent div not found");
        parentDiv = document.querySelector(PARENT_DIV_SELECTOR);
      }

      if (parentDiv.children.length < 2) {
        console.error("Parent div does not have enough children", parentDiv);
        return;
      }

      const parentChild = parentDiv.children[1] as HTMLDivElement;
      parentChild.style.alignSelf = "flex-end";

      const tweet = document.querySelector(
        TWEET_CONTAINER_SELECTOR
      ) as HTMLDivElement;
      parentDiv.insertBefore(app, parentChild);

      const container = document.getElementById("root");
      const root = createRoot(container!);

      root.render(
        <ChakraProvider>
          <React.StrictMode>
            <App tweetText={tweet.innerText} />
          </React.StrictMode>
        </ChakraProvider>
      );

      console.info("[INSIGHT] Succesfully added extension to tweet");
    }, 5000);
  }

  appendFactCheckButton();
}

initializeApp();
