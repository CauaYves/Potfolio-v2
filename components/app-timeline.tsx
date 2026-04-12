import { useEffect, useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import { TypographySmall } from "@/components/ui/typography";
import { getRegisters } from "@/app/actions/register";

export function AppTimeline() {
	const [registers, setRegisters] = useState<{ id: number; period: string | null; description: string | null, images?: { id: number, data: string | null }[] }[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getRegisters().then((res) => {
			setRegisters(res);
			setIsLoading(false);
		});
	}, []);

	// Format data for Aceternity Timeline component
	const data = registers.map((reg) => ({
		title: reg.period || "Sem data",
		content: (
			<div className="flex flex-col gap-6">
				<TypographySmall className="leading-6 text-neutral-800 dark:text-neutral-200">
					{reg.description}
				</TypographySmall>
				{reg.images && reg.images.length > 0 && (
					<div className="grid grid-cols-2 gap-4">
						{reg.images.map((img) => (
							img.data ? (
								<img
									key={img.id}
									src={img.data}
									alt="registro"
									className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
								/>
							) : null
						))}
					</div>
				)}
			</div>
		),
	}));

	if (isLoading) {
		return (
			<div className="min-h-screen w-full flex items-center justify-center">
				<p className="text-neutral-500 animate-pulse">Carregando timeline...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen w-full">
			<div className="absolute top-0 left-0 w-full pt-10">
				{registers.length > 0 ? (
					<Timeline data={data} />
				) : (
					<p className="text-center text-neutral-500">Nenhum registro encontrado.</p>
				)}
			</div>
		</div>
	);
}
