"use client";

import { Button, type ButtonVariants } from "@/components/ui/button";
import { Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface ThemeToggleProps {
	className?: string;
	variant?: ButtonVariants["variant"];
}

export function ThemeToggle({ className }: ThemeToggleProps) {
	const { setTheme, theme } = useTheme();
	const switchTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};
	const handleSwitchTheme = () => {
		if (!document.startViewTransition) switchTheme();
		document.startViewTransition(switchTheme);
	};
	return (
		<Button
			variant={"outline"}
			onClick={handleSwitchTheme}
			className={className}
			aria-roledescription="Toggle theme"
		>
			<Sun />
		</Button>
	);
}
