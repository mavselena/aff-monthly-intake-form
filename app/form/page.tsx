'use client'
import { useState } from 'react'

const B = '#7e4070'
const BD = '#5c2e52'
const BL = '#f5eaf4'
const BB = '#e2cde0'
const MUT = '#6b5c68'
const SUB = '#f8f4f8'

const styles: Record<string, React.CSSProperties> = {
  nav: { background: BD, padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  logo: { fontFamily: "'Playfair Display', serif", fontSize: '17px', color: '#fff', fontWeight: 700 },
  logosub: { fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 400, marginTop: '2px' },
  hero: { background: B, padding: '40px 60px 36px', position: 'relative', overflow: 'hidden' },
  heroEye: { fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, color: '#c49abe', marginBottom: '10px' },
  heroH1: { fontFamily: "'Playfair Display', serif", fontSize: '38px', color: '#fff', lineHeight: 1.15, marginBottom: '10px' },
  heroP: { fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: '500px', fontWeight: 400 },
  body: { maxWidth: '820px', margin: '0 auto', padding: '32px 40px 60px' },
  card: { background: '#fff', borderRadius: '12px', border: `1px solid ${BB}`, marginBottom: '20px', overflow: 'hidden' },
  cardHead: { background: BL, padding: '16px 28px', display: 'flex', alignItems: 'center', gap: '14px', borderBottom: `1px solid ${BB}` },
  cardNum: { width: '30px', height: '30px', borderRadius: '50%', background: B, color: '#fff', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  cardTitle: { fontFamily: "'Playfair Display', serif", fontSize: '18px', color: BD, fontWeight: 700 },
  cardBody: { padding: '24px 28px', display: 'flex', flexDirection: 'column' as const, gap: '20px' },
  fieldLabel: { display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: B, marginBottom: '5px' },
  fieldHint: { fontSize: '12px', color: MUT, fontWeight: 400, marginBottom: '8px', lineHeight: 1.55, fontStyle: 'italic' as const },
  input: { width: '100%', fontFamily: "'Montserrat', sans-serif", fontSize: '13.5px', color: '#1a1020', background: SUB, border: `1.5px solid ${BB}`, borderRadius: '8px', padding: '11px 15px', outline: 'none' },
  textarea: { width: '100%', fontFamily: "'Montserrat', sans-serif", fontSize: '13.5px', color: '#1a1020', background: SUB, border: `1.5px solid ${BB}`, borderRadius: '8px', padding: '11px 15px', outline: 'none', resize: 'vertical' as const, minHeight: '95px', lineHeight: 1.6 },
  submitArea: { background: '#fff', borderRadius: '12px', border: `1px solid ${BB}`, padding: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' },
  submitNote: { fontSize: '12.5px', color: MUT, lineHeight: 1.6, maxWidth: '420px' },
  btnSubmit: { background: B, color: '#fff', border: 'none', borderRadius: '8px', padding: '14px 36px', fontFamily: "'Montserrat', sans-serif", fontSize: '13px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.5px', whiteSpace: 'nowrap' as const, flexShrink: 0 },
  successBox: { background: '#eaf5f0', border: '1.5px solid #2e7d5e', borderRadius: '10px', padding: '16px 20px', fontSize: '13px', color: '#2e7d5e', fontWeight: 600, marginBottom: '24px', display: 'flex', gap: '10px', alignItems: 'center', lineHeight: 1.5 },
  errorBox: { background: '#fdf0f0', border: '1.5px solid #a33', borderRadius: '10px', padding: '16px 20px', fontSize: '13px', color: '#a33', fontWeight: 600, marginBottom: '24px', display: 'flex', gap: '10px', alignItems: 'center' },
}

function Pill({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <span onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center', background: selected ? B : SUB, border: `1.5px solid ${selected ? B : BB}`, borderRadius: '20px', padding: '7px 15px', fontSize: '12px', fontWeight: 600, color: selected ? '#fff' : MUT, cursor: 'pointer', transition: 'all 0.18s', userSelect: 'none', fontFamily: "'Montserrat', sans-serif", margin: '3px' }}>
      {label}
    </span>
  )
}

function CheckItem({ label, desc, checked, onClick }: { label: string; desc: string; checked: boolean; onClick: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '13px 0', borderBottom: `1px solid ${BL}` }}>
      <div onClick={onClick} style={{ width: '23px', height: '23px', border: `2px solid ${checked ? B : BB}`, borderRadius: '6px', flexShrink: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: checked ? '#fff' : 'transparent', background: checked ? B : SUB, transition: 'all 0.15s' }}>✓</div>
      <div><strong style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1a1020', marginBottom: '2px' }}>{label}</strong><span style={{ fontSize: '12px', color: MUT, lineHeight: 1.5 }}>{desc}</span></div>
    </div>
  )
}

const AUDIENCE = ['Beginners','Intermediate','Advanced','55+ / Bungee GOLD','Wellness / Recovery','Teachers & Trainers','Everyone']
const CLASSES = ['Aerial Silks','Lyra / Hoop','Aerial Hammock','Bungee Fitness','Bungee GOLD','Slow Flow / Restorative','Sound Bath','Strength & Stretch','Cardio Drumming','Under 18 Classes','Teacher Training']
const PERMISSIONS = ['Yes — name & story OK','Story only, no name','Photo approved too','Check with me first']
const BLOG_DIRS = ['Expand the same tip from Section 2','Separate blog topic this month']
const APPROVALS = [
  { label: 'Newsletter Draft', desc: 'Subject line, opening note, Aerialosophy tip, class spotlight, student spotlight, and CTA.' },
  { label: 'Blog Post Draft', desc: 'Full 600–800 word Aerial Philosophy post before it goes on the website.' },
  { label: 'Social Post Captions', desc: 'Tuesday tip caption and Thursday class spotlight — tone and voice review.' },
  { label: 'Canva Graphics', desc: 'Visual designs for social posts — colors, fonts, and overall look before scheduling.' },
  { label: 'AI Video Script', desc: 'Script approved before voiceover is generated in ElevenLabs.' },
  { label: 'Final AI Video', desc: 'Finished video watched through before it is published anywhere.' },
  { label: 'Student Feature', desc: 'Permission confirmed and exact wording approved before anything goes live.' },
]

export default function FormPage() {
  const [f, setF] = useState({ month: '', date: new Date().toISOString().split('T')[0], news: '', promo: '', topic: '', tip: '', story: '', quote: '', classNotes: '', testimonial: '', blogTopic: '', blogPoints: '', notes: '' })
  const [audience, setAudience] = useState<string[]>([])
  const [classes, setClasses] = useState<string[]>([])
  const [permission, setPermission] = useState('')
  const [blogDir, setBlogDir] = useState('')
  const [approvals, setApprovals] = useState<string[]>([])
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [savedMonth, setSavedMonth] = useState('')

  const toggle = (arr: string[], val: string, set: (a: string[]) => void) =>
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])

  const upd = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF(prev => ({ ...prev, [k]: e.target.value }))

  const submit = async () => {
    if (!f.month) { alert('Please enter the Month & Year'); return }
    if (!f.topic) { alert('Please enter your Aerialosophy topic'); return }
    setStatus('loading')
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, audience: audience.join(', '), classes: classes.join(', '), permission, blogDir, approvals: approvals.join(', '), classNotes: f.classNotes, blogTopic: f.blogTopic, blogPoints: f.blogPoints })
      })
      if (!res.ok) throw new Error()
      setSavedMonth(f.month)
      setStatus('success')
      setF({ month: '', date: new Date().toISOString().split('T')[0], news: '', promo: '', topic: '', tip: '', story: '', quote: '', classNotes: '', testimonial: '', blogTopic: '', blogPoints: '', notes: '' })
      setAudience([]); setClasses([]); setPermission(''); setBlogDir(''); setApprovals([])
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch { setStatus('error') }
  }

  return (
    <div>
      <div style={styles.nav}>
        <div>
          <div style={styles.logo}>Aerial Fun <em style={{ fontStyle: 'italic', color: '#c49abe' }}>&amp; Fitness</em></div>
          <div style={styles.logosub}>Monthly Content Intake</div>
        </div>
        <a href="/admin" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 500 }}>Admin →</a>
      </div>

      <div style={styles.hero}>
        <div style={styles.heroEye}>Monthly Content Intake</div>
        <h1 style={styles.heroH1}>Zina&apos;s <em style={{ fontStyle: 'italic', color: '#e8ccf0' }}>Monthly</em><br />Content Form</h1>
        <p style={styles.heroP}>Fill this out each month so your newsletter, blog, and social media content can be created on your behalf. Takes about 15–20 minutes.</p>
      </div>

      <div style={styles.body}>
        {status === 'success' && <div style={styles.successBox}><span style={{ fontSize: '18px' }}>✅</span><div>Response saved! Thank you, Zina. Everything has been received for <strong>{savedMonth}</strong>.</div></div>}
        {status === 'error' && <div style={styles.errorBox}><span>⚠️</span> Something went wrong. Please try again.</div>}

        {/* SECTION 1 */}
        <div style={styles.card}>
          <div style={styles.cardHead}><div style={styles.cardNum}>1</div><div style={styles.cardTitle}>Month &amp; Basic Info</div></div>
          <div style={styles.cardBody}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
              <div><label style={styles.fieldLabel}>Month &amp; Year *</label><input style={styles.input} value={f.month} onChange={upd('month')} placeholder="e.g. May 2026" /></div>
              <div><label style={styles.fieldLabel}>Date Submitted</label><input type="date" style={styles.input} value={f.date} onChange={upd('date')} /></div>
            </div>
            <div><label style={styles.fieldLabel}>Big News This Month?</label><div style={styles.fieldHint}>New class, schedule change, special event?</div><textarea style={styles.textarea} value={f.news} onChange={upd('news')} placeholder="e.g. We're adding a Saturday Bungee GOLD class starting May 10th!" /></div>
            <div><label style={styles.fieldLabel}>Promotions or Special Offers?</label><div style={styles.fieldHint}>Discount codes, intro offers, seasonal deals...</div><textarea style={{ ...styles.textarea, minHeight: '75px' }} value={f.promo} onChange={upd('promo')} placeholder="e.g. First class free for new students. Use code MAY2026." /></div>
          </div>
        </div>

        {/* SECTION 2 */}
        <div style={styles.card}>
          <div style={styles.cardHead}><div style={styles.cardNum}>2</div><div style={styles.cardTitle}>Zina&apos;s Aerialosophy — This Month&apos;s Tip</div></div>
          <div style={styles.cardBody}>
            <div><label style={styles.fieldLabel}>Topic or Theme *</label><div style={styles.fieldHint}>A movement tip, wellness insight, technique — anything aerial or whole-body wellness.</div><input style={styles.input} value={f.topic} onChange={upd('topic')} placeholder="e.g. Why breathing matters more than strength in aerial silks" /></div>
            <div><label style={styles.fieldLabel}>The Tip — In Your Own Words *</label><div style={styles.fieldHint}>Bullet points, a paragraph, a brain dump — all good. We&apos;ll shape it into the final content.</div><textarea style={{ ...styles.textarea, minHeight: '140px' }} value={f.tip} onChange={upd('tip')} placeholder="e.g. Most students hold their breath when working hard. But this makes everything harder...&#10;&#10;• Breathing on the way up releases tension&#10;• Exhale on the effort — like in weight training" /></div>
            <div><label style={styles.fieldLabel}>Who Is This Tip For?</label><div style={styles.fieldHint}>Select all that apply.</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>{AUDIENCE.map(a => <Pill key={a} label={a} selected={audience.includes(a)} onClick={() => toggle(audience, a, setAudience)} />)}</div></div>
            <div><label style={styles.fieldLabel}>Student Story or Example</label><div style={styles.fieldHint}>A student win, a class moment — even a short anecdote is powerful.</div><textarea style={styles.textarea} value={f.story} onChange={upd('story')} placeholder="e.g. Last week, a student tried the breathing technique and immediately felt the difference..." /></div>
            <div><label style={styles.fieldLabel}>One-Sentence Takeaway (Quote Card)</label><div style={styles.fieldHint}>This becomes the Tuesday social post quote card.</div><input style={styles.input} value={f.quote} onChange={upd('quote')} placeholder="e.g. You don't need more strength — you need to stop fighting your own body." /></div>
          </div>
        </div>

        {/* SECTION 3 */}
        <div style={styles.card}>
          <div style={styles.cardHead}><div style={styles.cardNum}>3</div><div style={styles.cardTitle}>Class Spotlight This Month</div></div>
          <div style={styles.cardBody}>
            <div><label style={styles.fieldLabel}>Which Classes to Feature?</label><div style={styles.fieldHint}>Pick up to 4 (one per week).</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>{CLASSES.map(c => <Pill key={c} label={c} selected={classes.includes(c)} onClick={() => toggle(classes, c, setClasses)} />)}</div></div>
            <div><label style={styles.fieldLabel}>Anything Special About These Classes?</label><div style={styles.fieldHint}>New time slot, limited spots, seasonal angle...</div><textarea style={styles.textarea} value={f.classNotes} onChange={upd('classNotes')} placeholder="e.g. Bungee GOLD is now Wednesdays at 11am. Silks Intro filling fast — mention limited spots." /></div>
          </div>
        </div>

        {/* SECTION 4 */}
        <div style={styles.card}>
          <div style={styles.cardHead}><div style={styles.cardNum}>4</div><div style={styles.cardTitle}>Student Spotlight or Testimonial</div></div>
          <div style={styles.cardBody}>
            <div><label style={styles.fieldLabel}>Student Win or Testimonial</label><div style={styles.fieldHint}>Optional but very powerful for the newsletter and social posts.</div><textarea style={styles.textarea} value={f.testimonial} onChange={upd('testimonial')} placeholder="e.g. Sandra told me she hadn't felt this mobile in 10 years." /></div>
            <div><label style={styles.fieldLabel}>Permission to Feature?</label><div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>{PERMISSIONS.map(p => <Pill key={p} label={p} selected={permission === p} onClick={() => setPermission(permission === p ? '' : p)} />)}</div></div>
          </div>
        </div>

        {/* SECTION 5 */}
        <div style={styles.card}>
          <div style={styles.cardHead}><div style={styles.cardNum}>5</div><div style={styles.cardTitle}>Blog Post — Aerial Philosophy Deep Dive</div></div>
          <div style={styles.cardBody}>
            <div><label style={styles.fieldLabel}>Blog Direction</label><div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>{BLOG_DIRS.map(d => <Pill key={d} label={d} selected={blogDir === d} onClick={() => setBlogDir(blogDir === d ? '' : d)} />)}</div></div>
            <div><label style={styles.fieldLabel}>If Separate — Blog Topic</label><input style={styles.input} value={f.blogTopic} onChange={upd('blogTopic')} placeholder="e.g. Understanding hypermobility and why it's not always an advantage in aerial" /></div>
            <div><label style={styles.fieldLabel}>Key Points to Cover</label><textarea style={styles.textarea} value={f.blogPoints} onChange={upd('blogPoints')} placeholder="e.g. What hypermobility is, why aerialists plateau, what teachers should watch for..." /></div>
          </div>
        </div>

        {/* SECTION 6 */}
        <div style={styles.card}>
          <div style={styles.cardHead}><div style={styles.cardNum}>6</div><div style={styles.cardTitle}>Approvals Needed This Month</div></div>
          <div style={styles.cardBody}>
            <p style={{ fontSize: '12.5px', color: MUT, lineHeight: 1.6 }}>Check each item once you&apos;ve reviewed and approved it.</p>
            <div>{APPROVALS.map(a => <CheckItem key={a.label} label={a.label} desc={a.desc} checked={approvals.includes(a.label)} onClick={() => toggle(approvals, a.label, setApprovals)} />)}</div>
          </div>
        </div>

        {/* SECTION 7 */}
        <div style={styles.card}>
          <div style={styles.cardHead}><div style={styles.cardNum}>7</div><div style={styles.cardTitle}>Anything Else?</div></div>
          <div style={styles.cardBody}>
            <div><label style={styles.fieldLabel}>Open Notes</label><div style={styles.fieldHint}>Ideas, upcoming events, feedback on last month, anything at all.</div><textarea style={{ ...styles.textarea, minHeight: '130px' }} value={f.notes} onChange={upd('notes')} placeholder="e.g. Thinking of an open house in June..." /></div>
          </div>
        </div>

        {/* SUBMIT */}
        <div style={styles.submitArea}>
          <p style={styles.submitNote}>Once submitted, your response is saved to the admin dashboard where Elena can access everything right away.</p>
          <button style={{ ...styles.btnSubmit, opacity: status === 'loading' ? 0.7 : 1 }} onClick={submit} disabled={status === 'loading'}>
            {status === 'loading' ? 'Saving...' : 'Submit This Month ✓'}
          </button>
        </div>
      </div>
    </div>
  )
}
