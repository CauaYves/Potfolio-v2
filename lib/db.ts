import { Pool } from "pg";

export const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

/**
 * Extrai o nome do banco de dados da connection string e retorna
 * uma URL apontando para o banco padrão "postgres" do mesmo servidor.
 */
function parseConnectionString(url: string): { dbName: string; adminUrl: string } {
	const parsed = new URL(url);
	const dbName = parsed.pathname.replace(/^\//, ""); // remove a barra inicial
	parsed.pathname = "/postgres";
	return { dbName, adminUrl: parsed.toString() };
}

/**
 * Garante que o banco de dados e as tabelas necessárias existam.
 * Chamado uma vez na inicialização do servidor via instrumentation.ts.
 */
export async function initializeDatabase() {
	const connectionString = process.env.DATABASE_URL;
	if (!connectionString) {
		throw new Error("[db] DATABASE_URL não está definida.");
	}

	const { dbName, adminUrl } = parseConnectionString(connectionString);

	// ── 1. Cria o banco de dados se não existir ──────────────────────────────
	const adminPool = new Pool({ connectionString: adminUrl });
	const adminClient = await adminPool.connect();
	try {
		const { rowCount } = await adminClient.query(
			`SELECT 1 FROM pg_database WHERE datname = $1`,
			[dbName],
		);

		if (!rowCount || rowCount === 0) {
			// CREATE DATABASE não aceita parâmetros — usamos escape manual (nome vem do .env)
			await adminClient.query(`CREATE DATABASE "${dbName.replace(/"/g, "")}"`);
			console.log(`[db] Banco de dados "${dbName}" criado.`);
		} else {
			console.log(`[db] Banco de dados "${dbName}" já existe.`);
		}
	} finally {
		adminClient.release();
		await adminPool.end();
	}

	// ── 2. Cria as tabelas se não existirem ──────────────────────────────────
	const client = await pool.connect();
	try {
		await client.query(`
			CREATE TABLE IF NOT EXISTS "Register" (
				id          SERIAL PRIMARY KEY,
				period      VARCHAR(48),
				description TEXT
			)
		`);

		await client.query(`
			CREATE TABLE IF NOT EXISTS "Image" (
				id           SERIAL PRIMARY KEY,
				"registerId" INTEGER REFERENCES "Register"(id) ON DELETE CASCADE,
				data         BYTEA
			)
		`);

		console.log("[db] Tabelas inicializadas.");
	} finally {
		client.release();
	}
}
