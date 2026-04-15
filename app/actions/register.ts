"use server";

import { pool } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createRegister(formData: FormData) {
	const client = await pool.connect();
	try {
		const period = formData.get("period") as string | null;
		const description = formData.get("description") as string | null;
		const files = formData.getAll("images") as File[];

		console.log(
			"Arquivos recebidos pelo form:",
			files.length,
			files.map((f) => `${f.name} - ${f.size}`),
		);

		const validFiles = files.filter((f) => f.size > 0);
		console.log("Arquivos válidos para upload:", validFiles.length);

		await client.query("BEGIN");

		// Insere o registro e retorna o ID gerado
		const registerResult = await client.query<{ id: number }>(
			`INSERT INTO "Register" (period, description) VALUES ($1, $2) RETURNING id`,
			[period || null, description || null],
		);
		const registerId = registerResult.rows[0].id;

		// Insere cada imagem vinculada ao registro
		for (const file of validFiles) {
			const buffer = Buffer.from(await file.arrayBuffer());
			await client.query(
				`INSERT INTO "Image" ("registerId", data) VALUES ($1, $2)`,
				[registerId, buffer],
			);
		}

		await client.query("COMMIT");

		revalidatePath("/registro");
		revalidatePath("/");

		return {
			success: true,
			message: "Registro inserido com sucesso!",
		};
	} catch (error) {
		await client.query("ROLLBACK");
		console.error("Erro ao criar registro:", error);
		return {
			success: false,
			message: "Ocorreu um erro ao cadastrar o registro.",
		};
	} finally {
		client.release();
	}
}

export async function getRegisters() {
	const client = await pool.connect();
	try {
		const result = await client.query<{
			id: number;
			period: string | null;
			description: string | null;
			img_id: number | null;
			img_data: Buffer | null;
		}>(
			`SELECT r.id, r.period, r.description, i.id AS img_id, i.data AS img_data
       FROM "Register" r
       LEFT JOIN "Image" i ON i."registerId" = r.id
       ORDER BY r.id DESC`,
		);

		// Agrupa as imagens por registro
		const registersMap = new Map<
			number,
			{
				id: number;
				period: string | null;
				description: string | null;
				images: { id: number; data: string | null }[];
			}
		>();

		for (const row of result.rows) {
			if (!registersMap.has(row.id)) {
				registersMap.set(row.id, {
					id: row.id,
					period: row.period,
					description: row.description,
					images: [],
				});
			}

			if (row.img_id !== null) {
				const base64 = row.img_data
					? `data:image/png;base64,${Buffer.from(row.img_data).toString("base64")}`
					: null;
				registersMap.get(row.id)?.images.push({ id: row.img_id, data: base64 });
			}
		}

		return Array.from(registersMap.values());
	} catch (error) {
		console.error("Erro ao buscar registros:", error);
		return [];
	} finally {
		client.release();
	}
}
