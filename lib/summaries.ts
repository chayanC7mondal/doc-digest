import { getDbConnection } from "./db";

export async function getSummaries(userId: string) {
  const sql = await getDbConnection();
  const summaries =
    await sql`SELECT * from pdf_summaries where user_id=${userId} ORDER BY created_at DESC `;
  return summaries;
}

export async function getSummaryById(id: string) {
  try {
    const sql = await getDbConnection();
    const result = await sql`SELECT * FROM pdf_summaries WHERE id=${id}`;

    // Return the first row if found, otherwise null
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Error fetching summary by ID:", error);
    return null;
  }
}
