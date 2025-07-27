"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// Card data array - easy to update
const cardsData = [
  {
    id: 1,
    title: "Micro Coil Ltd.",
    description: "Chikalthana, Aurangabad • 10 Acres • 2007",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    ctaText: "Know More",
    ctaLink: "#",
    details: {
      location: "Chikalthana, Aurangabad",
      area: "10 Acres",
      shedArea: "200m x 50m",
      year: "2007",
      type: "Administrative Office Building",
      summary: "A comprehensive industrial project featuring modern administrative facilities and manufacturing infrastructure designed to meet contemporary business needs."
    }
  },
  {
    id: 2,
    title: "Industrial Complex Phase II",
    description: "Mumbai, Maharashtra • 15 Acres • 2010",
    image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&h=600&fit=crop",
    ctaText: "Know More",
    ctaLink: "#",
    details: {
      location: "Mumbai, Maharashtra",
      area: "15 Acres",
      shedArea: "300m x 75m",
      year: "2010",
      type: "Manufacturing & Warehouse Complex",
      summary: "Extensive manufacturing facility with state-of-the-art warehouse management systems and integrated logistics solutions for optimal operational efficiency."
    }
  },
  {
    id: 3,
    title: "Tech Park Development",
    description: "Pune, Maharashtra • 8 Acres • 2015",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    ctaText: "Know More",
    ctaLink: "#",
    details: {
      location: "Pune, Maharashtra",
      area: "8 Acres",
      shedArea: "180m x 60m",
      year: "2015",
      type: "IT Office Complex",
      summary: "Modern technology park featuring cutting-edge office spaces, collaborative work environments, and sustainable building practices for the digital age."
    }
  },
  {
    id: 4,
    title: "Green Energy Facility",
    description: "Nashik, Maharashtra • 12 Acres • 2018",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop",
    ctaText: "Know More",
    ctaLink: "#",
    details: {
      location: "Nashik, Maharashtra",
      area: "12 Acres",
      shedArea: "250m x 80m",
      year: "2018",
      type: "Renewable Energy Production Facility",
      summary: "Sustainable energy production facility incorporating solar and wind technologies with advanced grid integration and energy storage solutions."
    }
  },
  {
    id: 5,
    title: "Logistics Hub Central",
    description: "Bangalore, Karnataka • 20 Acres • 2020",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
    ctaText: "Know More",
    ctaLink: "#",
    details: {
      location: "Bangalore, Karnataka",
      area: "20 Acres",
      shedArea: "400m x 100m",
      year: "2020",
      type: "Multi-modal Logistics Center",
      summary: "Advanced logistics and distribution center with automated sorting systems, cold storage facilities, and integrated transportation network."
    }
  },
  {
    id: 6,
    title: "Smart Manufacturing Plant",
    description: "Chennai, Tamil Nadu • 18 Acres • 2022",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
    ctaText: "Know More",
    ctaLink: "#",
    details: {
      location: "Chennai, Tamil Nadu",
      area: "18 Acres",
      shedArea: "350m x 90m",
      year: "2022",
      type: "Industry 4.0 Manufacturing Facility",
      summary: "Next-generation smart manufacturing plant with IoT integration, robotics automation, and AI-driven quality control systems for enhanced productivity."
    }
  }
];

export function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cardsData)[number] | boolean | null>(null);
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
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
                  width={500}
                  height={500}
                  src={active.image}
                  alt={active.title}
                  className="w-full h-96 lg:h-96 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
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
                    className="px-4 py-3 text-sm rounded-full font-bold bg-[#003e76] text-white hover:bg-[#002a54] transition-colors"
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
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Project Details</h4>
                        <ul className="space-y-2 text-sm">
                          <li><strong>Location:</strong> {active.details.location}</li>
                          <li><strong>Project Area:</strong> {active.details.area}</li>
                          <li><strong>Shed Area:</strong> {active.details.shedArea}</li>
                          <li><strong>Year:</strong> {active.details.year}</li>
                          <li><strong>Type:</strong> {active.details.type}</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm">{active.details.summary}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Horizontal scrolling container with reduced margins */}
      <div className="w-full px-2 sm:px-4">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-10 pb-4" style={{ width: 'max-content' }}>
            {cardsData.map((card) => (
              <motion.div
                layoutId={`card-${card.title}-${id}`}
                key={card.id}
                onClick={() => setActive(card)}
                className="flex-shrink-0 sm:w-[30rem] cursor-pointer group w-[80vw]"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <motion.div layoutId={`image-${card.title}-${id}`}>
                    <img
                      width={320}
                      height={360}
                      src={card.image}
                      alt={card.title}
                      className="h-[27rem] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </motion.div>

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {/* Meta text in bottom left corner */}
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <motion.h3
                      layoutId={`title-${card.title}-${id}`}
                      className="font-bold text-xl mb-2 leading-tight"
                    >
                      {card.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${card.description}-${id}`}
                      className="text-gray-200 text-sm leading-relaxed"
                    >
                      {card.description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
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