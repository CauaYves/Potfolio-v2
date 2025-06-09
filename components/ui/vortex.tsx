import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

interface VortexProps {
	children?: React.ReactNode;
	className?: string;
	containerClassName?: string;
	particleCount?: number;
	rangeY?: number;
	baseHue?: number;
	baseSpeed?: number;
	rangeSpeed?: number;
	baseRadius?: number;
	rangeRadius?: number;
	backgroundColor?: string;
}

export const Vortex = ({
	children,
	className,
	containerClassName,
	particleCount = 700,
	rangeY = 100,
	baseHue = 220,
	baseSpeed = 0.0,
	rangeSpeed = 1.5,
	baseRadius = 1,
	rangeRadius = 2,
	backgroundColor = "#000000",
}: VortexProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const animationFrameId = useRef<number | null>(null);

	const noise3D = useRef(createNoise3D()).current;

	const particlePropCount = 9;
	const particleProps = useRef<Float32Array>(
		new Float32Array(particleCount * particlePropCount),
	);
	const tick = useRef(0);
	const center = useRef<[number, number]>([0, 0]);

	const resizeCanvas = useCallback(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			center.current = [canvas.width / 2, canvas.height / 2];
		}
	}, []);

	const initParticle = useCallback(
		(i: number, canvasWidth: number) => {
			const rand = (n: number) => Math.random() * n;
			const randRange = (n: number) => n - rand(2 * n);

			particleProps.current.set(
				[
					rand(canvasWidth),
					center.current[1] + randRange(rangeY),
					0,
					0,
					0,
					50 + rand(150),
					baseSpeed + rand(rangeSpeed),
					baseRadius + rand(rangeRadius),
					baseHue + rand(100),
				],
				i,
			);
		},
		[baseHue, baseRadius, baseSpeed, rangeRadius, rangeSpeed, rangeY],
	);

	const drawParticle = useCallback(
		(
			ctx: CanvasRenderingContext2D,
			x: number,
			y: number,
			x2: number,
			y2: number,
			life: number,
			ttl: number,
			radius: number,
			hue: number,
		) => {
			const fadeInOut = (t: number, m: number) =>
				Math.abs(((t + 0.5 * m) % m) - 0.5 * m) / (0.5 * m);

			ctx.save();
			ctx.lineCap = "round";
			ctx.lineWidth = radius;
			ctx.strokeStyle = `hsla(${220}, 90%, 40%, ${fadeInOut(life, ttl)})`;
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x2, y2);
			ctx.stroke();
			ctx.restore();
		},
		[],
	);

	const renderFrame = useCallback(
		(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
			tick.current++;
			ctx.fillStyle = backgroundColor;
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			for (
				let i = 0;
				i < particleProps.current.length;
				i += particlePropCount
			) {
				let [x, y, vx, vy, life, ttl, speed, radius, hue] =
					particleProps.current.slice(i, i + particlePropCount);

				const n =
					noise3D(x * 0.00125, y * 0.00125, tick.current * 0.0005) *
					3 *
					Math.PI *
					2;
				vx = vx * 0.5 + Math.cos(n) * 0.5;
				vy = vy * 0.5 + Math.sin(n) * 0.5;

				const x2 = x + vx * speed;
				const y2 = y + vy * speed;

				drawParticle(ctx, x, y, x2, y2, life, ttl, radius, hue);

				life++;

				if (
					x2 > canvas.width ||
					x2 < 0 ||
					y2 > canvas.height ||
					y2 < 0 ||
					life > ttl
				) {
					initParticle(i, canvas.width);
				} else {
					particleProps.current.set(
						[x2, y2, vx, vy, life, ttl, speed, radius, hue],
						i,
					);
				}
			}

			animationFrameId.current = requestAnimationFrame(() =>
				renderFrame(ctx, canvas),
			);
		},
		[backgroundColor, drawParticle, initParticle, noise3D],
	);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		resizeCanvas();
		for (let i = 0; i < particleProps.current.length; i += particlePropCount) {
			initParticle(i, canvas.width);
		}
		renderFrame(ctx, canvas);

		window.addEventListener("resize", resizeCanvas);

		return () => {
			window.removeEventListener("resize", resizeCanvas);
			if (animationFrameId.current !== null) {
				cancelAnimationFrame(animationFrameId.current);
			}
		};
	}, [resizeCanvas, initParticle, renderFrame]);

	return (
		<div className={cn("relative h-full w-full", containerClassName)}>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				ref={containerRef}
				className="absolute inset-0 flex items-center justify-center z-0"
			>
				<canvas ref={canvasRef} />
			</motion.div>
			<div className={cn("relative z-10", className)}>{children}</div>
		</div>
	);
};
