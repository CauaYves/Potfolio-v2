"use client";

import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import type * as React from "react";
import { useRef } from "react";

const inputVariants = cva(
	"block px-4 pb-4 pt-4 w-full text-sm bg-transparent rounded-lg appearance-none focus:outline-none focus:ring-0 peer border-2",
	{
		variants: {
			variant: {
				default:
					"text-foreground focus:text-primary focus:border-input-border hover:border-input-border border-input-border/50",
				constructive:
					"text-constructive focus:text-constructive focus:border-constructive hover:border-constructive border-constructive/50",
				destructive:
					"text-destructive focus:text-destructive focus:border-destructive hover:border-destructive border-destructive/50",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

// Cor herdada por text-current
const inputColorVariants = cva("", {
	variants: {
		variant: {
			default: "text-foreground",
			constructive: "text-constructive",
			destructive: "text-destructive",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

interface InputProps extends React.ComponentProps<"input">, VariantProps<typeof inputVariants> {
	helperText?: string;
	label?: string;
	startIcon?: LucideIcon;
	endIcon?: LucideIcon;
}

function Input({
	id,
	className,
	helperText,
	variant,
	label,
	startIcon: StartIcon,
	endIcon: EndIcon,
	required = true,
	...props
}: InputProps & { required?: boolean }) {
	const ref = useRef<HTMLInputElement>(null);

	return (
		<div className={cn(inputColorVariants({ variant }), "flex flex-col gap-2")}>
			<div className="relative">
				{/* Ícone à esquerda */}
				{StartIcon && (
					<StartIcon
						className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-current cursor-text pointer-events-auto"
						onMouseDown={(e) => {
							e.preventDefault();
							ref.current?.focus();
						}}
					/>
				)}

				<input
					ref={ref}
					id={id}
					required={required}
					aria-describedby={`helper_text-${id}`}
					className={cn(
						inputVariants({ variant }),
						StartIcon && "pl-10",
						EndIcon && "pr-10",
						className,
					)}
					placeholder=" "
					{...props}
				/>

				{/* Ícone à direita */}
				{EndIcon && (
					<EndIcon
						className="absolute right-4 top-1/2 -translate-y-1/2 size-4 pointer-events-auto text-current"
						onMouseDown={(e) => {
							e.preventDefault();
							ref.current?.focus();
						}}
					/>
				)}

				{label && (
					<>
						{/* recorte da borda */}
						<span
							className={cn(
								"absolute start-2.5 bg-transparent pl-1 -top-[1px] h-[4px] rounded z-10 text-transparent text-xs selection:text-transparent",
								"peer-focus:bg-background",
								"peer-valid:bg-background",
								"peer-[&:not(:focus):not(:placeholder-shown)]:bg-background",
							)}
						>
							{label}
						</span>

						{/* label flutuante */}
						<label
							htmlFor={id}
							className={cn(
								"cursor-text pointer-events-auto absolute text-sm text-current duration-200 transform bg-transparent rounded-full z-20 origin-[0]",
								// estado “vazio”
								"peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:pl-4",
								// há valor
								"peer-[&:not(:focus):not(:placeholder-shown)]:-translate-y-5 peer-[&:not(:focus):not(:placeholder-shown)]:top-2 peer-[&:not(:focus):not(:placeholder-shown)]:pl-5 peer-[&:not(:focus):not(:placeholder-shown)]:scale-75",
								// foco ou quando existe valor (valid)
								"peer-focus:scale-75 peer-focus:-translate-y-5 peer-focus:top-2 peer-focus:pl-5",
								"peer-valid:scale-75 peer-valid:-translate-y-5 peer-valid:top-2 peer-valid:pl-5",
								// ajuste se tiver ícone à esquerda
								StartIcon && "peer-placeholder-shown:pl-10",
								// alinhamento horizontal
							)}
							onMouseDown={(e) => {
								e.preventDefault();
								ref.current?.focus();
							}}
						>
							{label}
						</label>
					</>
				)}
			</div>

			{helperText && (
				<p id={`helper_text-${id}`} className="text-xs text-current px-4">
					{helperText}
				</p>
			)}
		</div>
	);
}

export { Input };
