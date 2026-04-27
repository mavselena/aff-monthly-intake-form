import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'var(--subtle)' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--brand-mid)', marginBottom: '12px' }}>
          Aerial Fun &amp; Fitness
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '42px', color: 'var(--brand-dark)', lineHeight: 1.15, marginBottom: '16px' }}>
          Content <em style={{ fontStyle: 'italic', color: 'var(--brand)' }}>Hub</em>
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '36px' }}>
          Where Zina shares her monthly content and Elena manages everything else.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link href="/form" style={{ display: 'block', background: 'var(--brand)', color: '#fff', borderRadius: '10px', padding: '16px 32px', fontFamily: "'Montserrat', sans-serif", fontSize: '14px', fontWeight: '700', textDecoration: 'none', letterSpacing: '0.5px' }}>
            Fill Out This Month&apos;s Form →
          </Link>
          <Link href="/admin" style={{ display: 'block', background: '#fff', color: 'var(--brand-dark)', border: '1.5px solid var(--brand-border)', borderRadius: '10px', padding: '16px 32px', fontFamily: "'Montserrat', sans-serif", fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>
            Admin Dashboard (Elena &amp; Zina)
          </Link>
        </div>
      </div>
    </div>
  )
}
