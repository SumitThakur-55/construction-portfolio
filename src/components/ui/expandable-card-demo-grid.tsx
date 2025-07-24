"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  const useOutsideClick = (ref: React.RefObject<HTMLDivElement>, callback: () => void) => {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, callback]);
  };

  useOutsideClick(ref as React.RefObject<HTMLDivElement>, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-[#003e76] text-white hover:bg-[#003e76] transition-colors"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Updated grid to show 4 cards in a row on desktop */}
      <ul className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-50 items-start gap-4 p-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer transition-colors"
          >
            <div className="flex gap-4 flex-col w-full">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-48 w-full rounded-lg object-cover object-center"
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center text-base mb-2"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center text-sm"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Chikalthana, Aurangabad • 10 Acres • 2007",
    title: "Micro Coil Ltd.",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=300&fit=crop",
    ctaText: "Know More",
    ctaLink: "#",
    content: () => {
      return (
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Project Details</h4>
            <ul className="space-y-2 text-sm">
              <li><strong>Location:</strong> Chikalthana, Aurangabad</li>
              <li><strong>Project Area:</strong> 10 Acres</li>
              <li><strong>Shed Area:</strong> 200m x 50m</li>
              <li><strong>Year:</strong> 2007</li>
              <li><strong>Type:</strong> Administrative Office Building</li>
            </ul>
          </div>
          <div>
            <p className="text-sm">
              A comprehensive industrial project featuring modern administrative facilities
              and manufacturing infrastructure designed to meet contemporary business needs.
            </p>
          </div>
        </div>
      );
    },
  },
  {
    description: "Mumbai, Maharashtra • 15 Acres • 2010",
    title: "Industrial Complex Phase II",
    src: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=500&h=300&fit=crop",
    ctaText: "Know More",
    ctaLink: "#",
    content: () => {
      return (
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Project Details</h4>
            <ul className="space-y-2 text-sm">
              <li><strong>Location:</strong> Mumbai, Maharashtra</li>
              <li><strong>Project Area:</strong> 15 Acres</li>
              <li><strong>Shed Area:</strong> 300m x 75m</li>
              <li><strong>Year:</strong> 2010</li>
              <li><strong>Type:</strong> Manufacturing & Warehouse Complex</li>
            </ul>
          </div>
          <div>
            <p className="text-sm">
              Extensive manufacturing facility with state-of-the-art warehouse management
              systems and integrated logistics solutions for optimal operational efficiency.
            </p>
          </div>
        </div>
      );
    },
  },
  {
    description: "Pune, Maharashtra • 8 Acres • 2015",
    title: "Tech Park Development",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop",
    ctaText: "Know More",
    ctaLink: "#",
    content: () => {
      return (
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Project Details</h4>
            <ul className="space-y-2 text-sm">
              <li><strong>Location:</strong> Pune, Maharashtra</li>
              <li><strong>Project Area:</strong> 8 Acres</li>
              <li><strong>Shed Area:</strong> 180m x 60m</li>
              <li><strong>Year:</strong> 2015</li>
              <li><strong>Type:</strong> IT Office Complex</li>
            </ul>
          </div>
          <div>
            <p className="text-sm">
              Modern technology park featuring cutting-edge office spaces, collaborative
              work environments, and sustainable building practices for the digital age.
            </p>
          </div>
        </div>
      );
    },
  },
  {
    description: "Nashik, Maharashtra • 12 Acres • 2018",
    title: "Green Energy Facility",
    src: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&h=300&fit=crop",
    ctaText: "Know More",
    ctaLink: "#",
    content: () => {
      return (
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Project Details</h4>
            <ul className="space-y-2 text-sm">
              <li><strong>Location:</strong> Nashik, Maharashtra</li>
              <li><strong>Project Area:</strong> 12 Acres</li>
              <li><strong>Shed Area:</strong> 250m x 80m</li>
              <li><strong>Year:</strong> 2018</li>
              <li><strong>Type:</strong> Renewable Energy Production Facility</li>
            </ul>
          </div>
          <div>
            <p className="text-sm">
              Sustainable energy production facility incorporating solar and wind technologies
              with advanced grid integration and energy storage solutions.
            </p>
          </div>
        </div>
      );
    },
  },
];