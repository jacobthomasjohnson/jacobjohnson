"use client";

import { useState, useEffect, useRef } from "react";
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
      const [activeTab, setActiveTab] = useState(null);
      const [tabHeights, setTabHeights] = useState({}); // Store heights of tabs

      const projects = [
            {
                  id: "alchemizing",
                  name: "Alchemiz.ing",
                  description: `
        Alchemiz.ing is an incremental clicker game where you immerse yourself in the ancient art of alchemy.
        Gather resources, brew potions, and upgrade your laboratory to unlock powerful abilities and new crafting recipes.
        With beautiful visuals, an engaging gameplay loop, and a detailed Grimoire to track your progress, this game
        is perfect for fans of creative and addictive experiences. Start small, and build your way to becoming the
        ultimate alchemist!`,
            },
            {
                  id: "ndex",
                  name: "Nature Deck Exchange",
                  description: `
        Nature Deck Exchange (NDEX) is a trading card game app where players collect cards inspired by elements of 
        nature, mythology, and strategy. Open booster packs, trade with other players, and battle against AI or friends
        in exciting card duels. Featuring dynamic rarity systems, strategic gameplay mechanics, and the ability to 
        customize your decks, NDEX combines the thrill of collecting with the challenge of competition. 
        Available online at ndex.live!`,
            },
            {
                  id: "ports",
                  name: "PortAuthority",
                  description: `
        PortAuthority is a management simulation game where you take control of a bustling port.
        Manage imports and exports, oversee trade routes, and invest in upgrading infrastructure to handle larger and
        more complex shipments. Balance your resources carefully to keep operations smooth while expanding your 
        empire. With a focus on strategic decision-making and replayability, PORTS offers a fresh take on simulation
        games for players who love a challenge.`,
            },
      ];

      useEffect(() => {
            const interval = setInterval(() => {
                  setFirstLetterColor((prevColor) => adjustHue(prevColor, 12));
            }, 75);

            return () => clearInterval(interval);
      }, []);

      const toggleProjectsWindow = () => {
            setProjectsWindow(!projectsWindow);
      };

      const toggleTab = (projectId, tabRef) => {
            setActiveTab((prevTab) =>
                  prevTab === projectId ? null : projectId
            );
            if (tabRef?.current) {
                  setTabHeights((prev) => ({
                        ...prev,
                        [projectId]: tabRef.current.scrollHeight,
                  }));
            }
      };

      return (
            <>
                  <div
                        className={`content ${
                              projectsWindow ? "content-hide" : ""
                        }`}
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
                                    <Link href="https://github.com/jacobthomasjohnson">
                                          GITHUB
                                    </Link>
                              </div>
                        </div>
                  </div>
                  <div
                        className={`p-3 xl:p-6 text-base items-center w-full h-full fixed top-0 left-0 xl:rounded-lg flex flex-col overflow-hidden bg-background ${
                              !projectsWindow ? "translate-y-[100vh]" : ""
                        } transition-all duration-[1s]`}
                  >
                        <div className="p-4 w-full xl:w-1/3 flex justify-between items-center text-3xl">
                              <div>
                                    <ColorText
                                          firstLetterColor={firstLetterColor}
                                    >
                                          Projects
                                    </ColorText>
                              </div>
                              <div
                                    className="hover:cursor-pointer text-2xl"
                                    onClick={toggleProjectsWindow}
                              >
                                    &#x2715;
                              </div>
                        </div>
                        <div className="p-4 grow text-neutral-300 w-full xl:w-1/3 text-lg">
                              {projects.map((project) => {
                                    const tabRef = useRef(null); // Reference to dynamically calculate height
                                    const isActive = activeTab === project.id;
                                    const height = isActive
                                          ? tabHeights[project.id] || "auto"
                                          : 0;

                                    return (
                                          <div key={project.id}>
                                                <div
                                                      className="py-2 border-b border-neutral-800 font-serif text-2xl cursor-pointer"
                                                      onClick={() =>
                                                            toggleTab(
                                                                  project.id,
                                                                  tabRef
                                                            )
                                                      }
                                                >
                                                      {project.name}
                                                </div>
                                                <div
                                                      ref={tabRef}
                                                      className={`overflow-hidden duration-500 transition-all text-base text-justify`}
                                                      style={{
                                                            maxHeight: `${height}px`,
                                                      }}
                                                >
                                                      <div className="pt-2 pb-8">
                                                            {
                                                                  project.description
                                                            }
                                                      </div>
                                                </div>
                                          </div>
                                    );
                              })}
                        </div>
                  </div>
            </>
      );
}
