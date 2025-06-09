import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function TypographyH1({ children, className, ...props }: ComponentProps<"h1">) {
	return (
		<h1
			{...props}
			className={cn(
				"scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
				className,
			)}
		>
			{children}
		</h1>
	);
}

export function TypographyH2({ children, className, ...props }: ComponentProps<"h2">) {
	return (
		<h2
			{...props}
			className={cn("scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0", className)}
		>
			{children}
		</h2>
	);
}

export function TypographyH3({ children, className, ...props }: ComponentProps<"h3">) {
	return (
		<h3
			{...props}
			className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}
		>
			{children}
		</h3>
	);
}

export function TypographyH4({ children, className, ...props }: ComponentProps<"h4">) {
	return (
		<h4
			{...props}
			className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)}
		>
			{children}
		</h4>
	);
}

export function TypographyP({ children, className, ...props }: ComponentProps<"p">) {
	return (
		<p {...props} className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
			{children}
		</p>
	);
}

export function TypographyBlockquote({ children, className, ...props }: ComponentProps<"blockquote">) {
	return (
		<blockquote
			{...props}
			className={cn("mt-6 border-l-2 pl-6 italic", className)}
		>
			{children}
		</blockquote>
	);
}

export function TypographyInlineCode({ children, className, ...props }: ComponentProps<"code">) {
	return (
		<code
			{...props}
			className={cn(
				"bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
				className
			)}
		>
			{children}
		</code>
	);
}

export function TypographyLead({ children, className, ...props }: ComponentProps<"p">) {
	return (
		<p
			{...props}
			className={cn("text-muted-foreground text-xl", className)}
		>
			{children}
		</p>
	);
}

export function TypographyLarge({ children, className, ...props }: ComponentProps<"div">) {
	return (
		<div
			{...props}
			className={cn("text-lg font-semibold", className)}
		>
			{children}
		</div>
	);
}

export function TypographySmall({ children, className, ...props }: ComponentProps<"small">) {
	return (
		<small
			{...props}
			className={cn("text-sm leading-none font-medium", className)}
		>
			{children}
		</small>
	);
}

export function TypographyMuted({ children, className, ...props }: ComponentProps<"p">) {
	return (
		<p
			{...props}
			className={cn("text-muted-foreground text-sm", className)}
		>
			{children}
		</p>
	);
}
