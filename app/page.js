"use client";

import { useState, useEffect } from "react";
import adjustHue from "./utils";
import Link from "next/link";

const DEFAULT_COLOR = "#9DC4E9";

export function ColorText({ children, firstLetterColor }) {
      const characters = Array.from(children);
      let currentColor = firstLetterColor;

      const colorString = characters.map((char, index) => {
            const newColor = adjustHue(currentColor, 20);
            currentColor = newColor;
            return (
                  <span key={index} style={{ color: newColor }}>
                        {char}
                  </span>
            );
      });

      return <>{colorString}</>;
}

export default function Home() {
      const [firstLetterColor, setFirstLetterColor] = useState(DEFAULT_COLOR);
      const [projectsWindow, setProjectsWindow] = useState(false);

      useEffect(() => {
            const interval = setInterval(() => {
                  setFirstLetterColor((prevColor) => adjustHue(prevColor, 12));
            }, 75);

            return () => clearInterval(interval);
      }, []);

      const toggleProjectsWindow = () => {
            setProjectsWindow(!projectsWindow);
      };

      return (
            <>
                  <div
                        className={`content ${projectsWindow ? "content-hide" : ""}`}
                  >
                        <div className="logo">
                              <ColorText firstLetterColor={firstLetterColor}>
                                    Jacob Johnson
                              </ColorText>
                        </div>
                        <div className="links">
                              <div className="link">
                                    <span onClick={toggleProjectsWindow}>
                                          PROJECTS
                                    </span>
                              </div>
                              <div className="link">
                                    <Link href="/resume.pdf">RESUME</Link>
                              </div>
                              <div className="link">
                                    <Link href="https://github.com/jacobthomasjohnson">GITHUB</Link>
                              </div>
                        </div>
                  </div>
                  <div
                        className={`shadow-md p-3 text-base w-full h-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 xl:w-[95%] xl:h-[95%]  xl:rounded-lg flex flex-col overflow-hidden bg-background ${
                              !projectsWindow ? "translate-y-[100vh]" : ""
                        } transition-all duration-[1s] ease-[cubic-bezier(0,1,0,1)]`}
                  >
                        <div className="p-4 flex justify-between items-center">
                              <div className="">
                                    <ColorText
                                          firstLetterColor={firstLetterColor}
                                    >
                                          PROJECTS
                                    </ColorText>
                              </div>
                              <div
                                    className="hover:cursor-pointer"
                                    onClick={toggleProjectsWindow}
                              >
                                    &#x2715;
                              </div>
                        </div>
                        <div className="p-4 grow text-neutral-300">
                              <div className="py-4 border-b border-neutral-800 font-serif">Alchemiz.ing</div>
                              <div className="py-4 border-b border-neutral-800 font-serif">Nature Deck Exchange</div>
                              <div className="py-4 border-b border-neutral-800 font-serif">PORTS / PortAuthority</div>
                        </div>
                  </div>
            </>
      );
}
