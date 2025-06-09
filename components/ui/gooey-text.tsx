"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GooeyTextProps {
	texts: string[];
	interval?: number;
	className?: string;
	textClassName?: string;
}

export function GooeyText({
	texts,
	interval = 2000,
	className,
	textClassName,
}: GooeyTextProps) {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setIndex((prev) => (prev + 1) % texts.length);
		}, interval);
		return () => clearInterval(timer);
	}, [texts.length, interval]);

	return (
		<div className={cn("relative", className)}>
			<svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
				<defs>
					<filter id="threshold">
						<feColorMatrix
							in="SourceGraphic"
							type="matrix"
							values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
						/>
					</filter>
				</defs>
			</svg>

			<div
				className="flex items-center justify-center"
				style={{ filter: "url(#threshold)" }}
			>
				<AnimatePresence mode="wait">
					<motion.span
						key={texts[index]}
						initial={{ opacity: 0, filter: "blur(8px)" }}
						animate={{ opacity: 1, filter: "blur(0px)" }}
						exit={{ opacity: 0, filter: "blur(8px)" }}
						transition={{ duration: 1 }}
						className={cn(
							"absolute inline-block select-none text-center text-6xl md:text-[60pt] text-foreground",
							textClassName,
						)}
					>
						{texts[index]}
					</motion.span>
				</AnimatePresence>
			</div>
		</div>
	);
}
