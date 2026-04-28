import { neon } from '@neondatabase/serverless'

function getDb() {
  const sql = neon(process.env.DATABASE_URL!)
  return sql
}

export async function createTable() {
  const sql = getDb()
  await sql`
    CREATE TABLE IF NOT EXISTS responses (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      month TEXT NOT NULL,
      submitted_date TEXT,
      news TEXT,
      promo TEXT,
      topic TEXT,
      tip TEXT,
      audience TEXT,
      story TEXT,
      quote TEXT,
      aerialophy_note TEXT,
      week1_class TEXT,
      week2_class TEXT,
      week3_class TEXT,
      week4_class TEXT,
      class_notes TEXT,
      student_of_month TEXT,
      teacher_of_month TEXT,
      approvals TEXT,
      notes TEXT
    )
  `
}

export async function insertResponse(data: Record<string, string>) {
  const sql = getDb()
  await createTable()
  const result = await sql`
    INSERT INTO responses (
      month, submitted_date, news, promo, topic, tip, audience, story, quote,
      aerialophy_note, week1_class, week2_class, week3_class, week4_class,
      class_notes, student_of_month, teacher_of_month, approvals, notes
    ) VALUES (
      ${data.month}, ${data.date}, ${data.news}, ${data.promo},
      ${data.topic}, ${data.tip}, ${data.audience}, ${data.story}, ${data.quote},
      ${data.aerialophyNote}, ${data.week1Class}, ${data.week2Class},
      ${data.week3Class}, ${data.week4Class}, ${data.classNotes},
      ${data.studentOfMonth}, ${data.teacherOfMonth}, ${data.approvals}, ${data.notes}
    ) RETURNING id
  `
  return result[0]
}

export async function getAllResponses() {
  const sql = getDb()
  await createTable()
  const result = await sql`
    SELECT * FROM responses ORDER BY created_at DESC
  `
  return result
}
