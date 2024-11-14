import { project } from "@/types/main"
import Image from "next/image"
import Link from "next/link"
import { FaGithub, FaVideo } from "react-icons/fa"
import { BiLinkExternal } from "react-icons/bi"
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' } }
};

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
    })
};

const Project = ({ name, image, category, techstack, description, links }: project) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const images = Array.isArray(image) ? image : [image];

    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    useEffect(() => {
        if (images.length > 1) {
            const interval = setInterval(() => {
                setDirection(1);
                setCurrentImageIndex((prev) => (prev + 1) % images.length);
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [images.length]);

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    return (
        <motion.div
            ref={ref}
            variants={cardVariants}
            initial='hidden'
            animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col gap-2 bg-white dark:bg-grey-800 rounded-lg p-4">

            <div className="relative group rounded-lg bg-violet-50 overflow-hidden">
                <div className="relative h-48">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentImageIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            drag={images.length > 1 ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);

                                if (swipe < -swipeConfidenceThreshold) {
                                    setDirection(1);
                                    setCurrentImageIndex((prev) => (prev + 1) % images.length);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    setDirection(-1);
                                    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
                                }
                            }}
                            className="absolute w-full h-full"
                        >
                            <div className="relative w-full h-full">
                                <Image 
                                    alt={`${name} - ${currentImageIndex + 1}`} 
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-contain"
                                    src={images[currentImageIndex]}
                                    priority
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    
                    {images.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setDirection(index > currentImageIndex ? 1 : -1);
                                        setCurrentImageIndex(index);
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                        index === currentImageIndex 
                                            ? 'bg-white' 
                                            : 'bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {(links.visit.trim() || links.code.trim() || links.video.trim()) &&
                    <div className="absolute top-0 scale-x-0 group-hover:scale-100 transition-transform origin-left duration-200 ease-linear bg-gray-800 bg-opacity-60 w-full h-full rounded-lg flex items-center gap-4 justify-center z-20">
                        {links.visit.trim() &&
                            <Link href={links.visit} target="_blank" className="bg-white text-black p-2 rounded-lg hover:bg-black hover:text-white transition-all">
                                <BiLinkExternal size={20} />
                            </Link>
                        }
                        {links.code.trim() &&
                            <Link href={links.code} target="_blank" className="bg-white text-black p-2 rounded-lg hover:bg-black hover:text-white transition-all">
                                <FaGithub size={20} />
                            </Link>
                        }
                        {links.video.trim() &&
                            <Link href={links.video} target="_blank" className="bg-white text-black p-2 rounded-lg hover:bg-black hover:text-white transition-all">
                                <FaVideo size={20} />
                            </Link>
                        }
                    </div>
                }
            </div>

            <div className="my-2 flex flex-col gap-3">
                <h3 className="text-xl font-medium">{name}</h3>
                <div className="text-gray-600 dark:text-gray-300">
                    {Array.isArray(description) ? (
                        <ul className="list-disc ml-4 space-y-1 text-sm">
                            {description.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm">{description}</p>
                    )}
                </div>
                <p className="text-sm text-gray-400">
                    <span className="font-medium">Tech Stack:</span> {techstack}
                </p>
            </div>
        </motion.div>
    )
}

export default Project