/**
 * Next.js Instrumentation Hook
 * Executado uma única vez na inicialização do servidor Node.js.
 * Garante que o banco de dados e as tabelas existam antes de qualquer requisição.
 */
export async function register() {
	if (process.env.NEXT_RUNTIME === "nodejs") {
		const { initializeDatabase } = await import("./lib/db");
		try {
			await initializeDatabase();
		} catch (err) {
			console.error("[db] Falha na inicialização do banco de dados:", err);
		}
	}
}
