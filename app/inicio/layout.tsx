"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<NextThemesProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				{children}
			</NextThemesProvider>
		</div>
	);
}
