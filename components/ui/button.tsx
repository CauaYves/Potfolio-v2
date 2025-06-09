"use client";

/**
 * Extended by https://enhanced-button.vercel.app/
 */

import { cn } from "@/lib/utils";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { converter, parse } from "culori";
import type * as React from "react";
import type { ComponentPropsWithRef } from "react";

const buttonVariants = cva(
	"relative overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
	{
		variants: {
			variant: {
				default:
					"bg-primary/90 text-primary-foreground hover:bg-primary/80 border border-primary",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
				outline:
					"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline p-0!",
			},
			effect: {
				expandIcon: "group gap-0 relative",
				ringHover:
					"transition-all duration-300 hover:ring-2 hover:ring-primary/90 hover:ring-offset-2",
				shine:
					"before:animate-shine relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-no-repeat background-position_0s_ease",
				shineHover:
					"relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] before:duration-1000",
				gooeyRight:
					"relative z-0 overflow-hidden transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-gradient-to-r from-white/40 before:transition-transform before:duration-1000  hover:before:translate-x-[0%] hover:before:translate-y-[0%]",
				gooeyLeft:
					"relative z-0 overflow-hidden transition-all duration-500 after:absolute after:inset-0 after:-z-10 after:translate-x-[-150%] after:translate-y-[150%] after:scale-[2.5] after:rounded-[100%] after:bg-gradient-to-l from-white/40 after:transition-transform after:duration-1000  hover:after:translate-x-[0%] hover:after:translate-y-[0%]",
				underline:
					"relative !no-underline after:absolute after:bg-primary after:bottom-2 after:h-[1px] after:w-2/3 after:origin-bottom-left after:scale-x-100 hover:after:origin-bottom-right hover:after:scale-x-0 after:transition-transform after:ease-in-out after:duration-300",
				hoverUnderline:
					"relative !no-underline after:absolute after:bg-primary after:bottom-2 after:h-[1px] after:w-2/3 after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300",
				gradientSlideShow:
					"bg-[size:400%] bg-[linear-gradient(-45deg,var(--gradient-lime),var(--gradient-ocean),var(--gradient-wine),var(--gradient-rust))] animate-gradient-flow",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

interface IconProps {
	icon: React.ElementType;
	iconPlacement: "left" | "right";
}

interface IconRefProps {
	icon?: never;
	iconPlacement?: undefined;
}

// @hidden
const ButtonLoadingIndicator = () => {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			className="text-foreground"
		>
			<title>loading</title>
			<circle cx="4" cy="12" r="2" fill="currentColor">
				<animate
					id="spinner_qFRN"
					begin="0;spinner_OcgL.end+0.25s"
					attributeName="cy"
					calcMode="spline"
					dur="0.6s"
					values="12;6;12"
					keySplines=".33,.66,.66,1;.33,0,.66,.33"
				/>
			</circle>
			<circle cx="12" cy="12" r="2" fill="currentColor">
				<animate
					begin="spinner_qFRN.begin+0.1s"
					attributeName="cy"
					calcMode="spline"
					dur="0.6s"
					values="12;6;12"
					keySplines=".33,.66,.66,1;.33,0,.66,.33"
				/>
			</circle>
			<circle cx="20" cy="12" r="2" fill="currentColor">
				<animate
					id="spinner_OcgL"
					begin="spinner_qFRN.begin+0.2s"
					attributeName="cy"
					calcMode="spline"
					dur="0.6s"
					values="12;6;12"
					keySplines=".33,.66,.66,1;.33,0,.66,.33"
				/>
			</circle>
		</svg>
	);
};

interface IconProps {
	icon: React.ElementType;
	iconPlacement: "left" | "right";
}

interface IconRefProps {
	icon?: never;
	iconPlacement?: undefined;
}

export type ButtonIconProps = IconProps | IconRefProps;
export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type ButtonProps = ComponentPropsWithRef<"button"> &
	ButtonVariants &
	ButtonIconProps & { asChild?: boolean };

const Button = ({
	className,
	variant,
	effect,
	size,
	icon: Icon,
	iconPlacement,
	asChild = false,
	ref,
	...props
}: ButtonProps) => {
	const Comp = asChild ? Slot : "button";
	return (
		<Comp
			className={cn(buttonVariants({ variant, effect, size, className }))}
			ref={ref}
			onClick={(e) => {
				rippleEffect(e);

				props.onClick?.(e);
			}}
			{...props}
		>
			{Icon &&
				iconPlacement === "left" &&
				(effect === "expandIcon" ? (
					<div className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-100 group-hover:pr-2 group-hover:opacity-100">
						<Icon />
					</div>
				) : (
					<Icon />
				))}
			<Slottable>{props.children}</Slottable>
			{Icon &&
				iconPlacement === "right" &&
				(effect === "expandIcon" ? (
					<div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
						<Icon />
					</div>
				) : (
					<Icon />
				))}
		</Comp>
	);
};

function getContrastRippleColor(backgroundColor: string): string {
	const parsed = parse(backgroundColor);

	if (!parsed) return "rgba(0, 0, 0, 0.2)";

	const toRgb = converter("rgb");
	const rgbColor = toRgb(parsed);

	if (!rgbColor || rgbColor.r === undefined) return "rgba(0, 0, 0, 0.2)";

	const [r, g, b] = [rgbColor.r, rgbColor.g, rgbColor.b].map((c) => {
		const sRGB = c;
		return sRGB <= 0.03928 ? sRGB / 12.92 : ((sRGB + 0.055) / 1.055) ** 2.4;
	});

	const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
	return luminance > 0.5 ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.4)";
}

const rippleEffect = (
	e: React.MouseEvent<HTMLButtonElement>,
	customRippleColor?: string,
) => {
	const button = e.currentTarget;
	const rect = button.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;

	const ripple = document.createElement("span");
	ripple.className = "absolute rounded-full animate-ripple pointer-events-none";
	ripple.style.top = `${y}px`;
	ripple.style.left = `${x}px`;
	ripple.style.width = "200px";
	ripple.style.height = "200px";
	ripple.style.transform = "translate(-50%, -50%)";

	// Use custom ripple color if provided, otherwise calculate based on background
	if (customRippleColor) {
		ripple.style.backgroundColor = customRippleColor;
	} else {
		const bg = getComputedStyle(button).backgroundColor;
		ripple.style.backgroundColor = getContrastRippleColor(bg);
	}

	button.appendChild(ripple);
	setTimeout(() => ripple.remove(), 1000);
};

export { Button, buttonVariants };
