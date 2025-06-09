import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetBrains = JetBrains_Mono({
	subsets: ["latin"],
	display: "swap",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export async function metadata(): Promise<Metadata> {
	return {
		title: "Yves.dev",
		description: "Meu portfólio",
		icons: "../public/y.svg",
	};
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body className={`${jetBrains.className} antialiased`}>{children}</body>
		</html>
	);
}
