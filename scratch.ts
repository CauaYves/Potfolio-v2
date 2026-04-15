import "dotenv/config";
import { pool } from "./lib/db";

async function main() {
  const client = await pool.connect();
  try {
    const result = await client.query<{ id: number; data: Buffer | null }>(
      `SELECT id, data FROM "Image"`
    );
    console.log("Images count:", result.rows.length);
    if (result.rows.length > 0) {
      console.log(
        "First image buffer size:",
        result.rows[0].data ? result.rows[0].data.length : "null"
      );
      console.log("First 20 bytes:", result.rows[0].data?.subarray(0, 20));
    }
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);
