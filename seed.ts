import "dotenv/config";
import { pool } from "./lib/db";

async function main() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(
      `INSERT INTO "Register" (period, description) VALUES ($1, $2), ($3, $4), ($5, $6)`,
      [
        "2024 - 2025",
        "Trabalhei como líder técnico de desenvolvimento frontend na construção do novo Portal para os clubes e parques do Brasil. Alguns clientes finais foram: Flamengo, Palmeiras e Aldeia das águas.",
        "Early 2023",
        "Desenvolvimento e integração de novos sistemas no núcleo Multiclubes. Implementação de lógicas complexas e layouts arrojados.",
        "2022",
        "Estudos intensivos de Typescript, React e introdução aos bancos de dados relacionais.",
      ]
    );

    await client.query("COMMIT");
    console.log("Seed concluída");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);
