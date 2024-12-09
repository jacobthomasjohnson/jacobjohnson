"use client";

import { useEffect } from "react";

export default function GitHubRedirectPage() {
      useEffect(() => {
            // Open the GitHub page in a new tab
            const newWindow = window.open(
                  "/resume.pdf",
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
                  <h1>Opening Resume...</h1>
                  <p>
                        If the page didn't open, click{" "}
                        <a
                              href="https://jacobjohnson.gg/resume.pdf"
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
