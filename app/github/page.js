"use client";

import { useEffect } from "react";

export default function GitHubRedirectPage() {
      useEffect(() => {
            // Open the GitHub page in a new tab
            const newWindow = window.open(
                  "https://github.com/jacobthomasjohnson",
                  "_blank"
            );

            if (
                  !newWindow ||
                  newWindow.closed ||
                  typeof newWindow.closed === "undefined"
            ) {
                  console.error("New window could not be opened");
            }
      }, []);

      return (
            <div>
                  <h1>Redirecting to GitHub...</h1>
                  <p>
                        If the page didn't open, click{" "}
                        <a
                              href="https://github.com"
                              target="_blank"
                              rel="noopener noreferrer"
                        >
                              here
                        </a>
                        .
                  </p>
            </div>
      );
}
