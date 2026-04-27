import { sql } from '@vercel/postgres'

export async function createTable() {
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
      classes TEXT,
      class_notes TEXT,
      testimonial TEXT,
      permission TEXT,
      blog_dir TEXT,
      blog_topic TEXT,
      blog_points TEXT,
      approvals TEXT,
      notes TEXT
    )
  `
}

export async function insertResponse(data: Record<string, string>) {
  await createTable()
  const result = await sql`
    INSERT INTO responses (
      month, submitted_date, news, promo, topic, tip, audience, story, quote,
      classes, class_notes, testimonial, permission, blog_dir, blog_topic,
      blog_points, approvals, notes
    ) VALUES (
      ${data.month}, ${data.date}, ${data.news}, ${data.promo}, ${data.topic},
      ${data.tip}, ${data.audience}, ${data.story}, ${data.quote},
      ${data.classes}, ${data.classNotes}, ${data.testimonial}, ${data.permission},
      ${data.blogDir}, ${data.blogTopic}, ${data.blogPoints}, ${data.approvals}, ${data.notes}
    ) RETURNING id
  `
  return result.rows[0]
}

export async function getAllResponses() {
  await createTable()
  const result = await sql`
    SELECT * FROM responses ORDER BY created_at DESC
  `
  return result.rows
}
