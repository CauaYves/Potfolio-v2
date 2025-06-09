"use client";

import { Button } from "@/components/ui/button";
import { GooeyText } from "@/components/ui/gooey-text";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";
import { Vortex } from "@/components/ui/vortex";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Github, Linkedin } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
	const { theme } = useTheme();
	const [showGooey, setShowGooey] = useState(true);
	console.log(theme);
	useEffect(() => {
		const timer = setTimeout(() => setShowGooey(false), 20000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<main className="overflow-x-hidden">
			<Vortex
				particleCount={500}
				baseRadius={4}
				className="min-w-full min-h-dvh flex items-center justify-center"
				backgroundColor={theme === "light" ? "white" : "black"}
			>
				<AnimatePresence mode="wait">
					{showGooey ? (
						<motion.div
							key="gooey"
							initial={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
						>
							<GooeyText
								texts={[
									"Olá visitante",
									"Me chamo Yves",
									"Sou Desenvolvedor Full Stack",
									"E este é meu Portfólio",
									"Fique a vontade!",
								]}
								interval={4000}
								textClassName="dark:text-white text-shadow-lg/30 subpixel-antialiased font-bold text-sm leading-20 text-balance max-w-200"
							/>
						</motion.div>
					) : (
						<motion.div
							key="final-presentation"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5 }}
							className="flex items-center gap-16 relative"
						>
							<div className="flex flex-col justify-center items-center md:items-baseline gap-y-8">
								<div className="text-center space-y-2">
									<TypographyH1 className="text-5xl">Bem-vindo!</TypographyH1>
									<TypographyLead className="font-bold">
										Vamos construir juntos?
									</TypographyLead>
								</div>
								<Button
									size={"lg"}
									className="rounded-full shadow-xs shadow-accent"
									effect={"expandIcon"}
									icon={ChevronRight}
									iconPlacement="right"
									asChild
								>
									<Link href={"#"}>Explorar</Link>
								</Button>
								<div className="space-x-4">
									<Button variant={"secondary"}>
										<Linkedin />
									</Button>
									<Button variant={"secondary"}>
										<Github />
									</Button>
								</div>
							</div>
							<div className="absolute -left-40 top-50 md:static">
								<Image
									src={"/y.svg"}
									alt={"Yves.dev"}
									quality={100}
									width={300}
									height={300}
								/>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</Vortex>
		</main>
	);
}
