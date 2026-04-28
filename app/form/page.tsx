'use client'
import { useState } from 'react'

const B = '#7e4070', BD = '#5c2e52', BL = '#f5eaf4', BB = '#e2cde0', MUT = '#6b5c68', SUB = '#f8f4f8'

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
  noteBox: { background: BL, borderLeft: `3px solid ${B}`, borderRadius: '0 8px 8px 0', padding: '12px 16px', fontSize: '12px', color: BD, lineHeight: 1.65 },
  infoBox: { background: '#f0f7ff', borderLeft: '3px solid #4a90d9', borderRadius: '0 8px 8px 0', padding: '12px 16px', fontSize: '12px', color: '#1a4a7a', lineHeight: 1.65 },
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' },
  weekSlot: { background: SUB, border: `1.5px solid ${BB}`, borderRadius: '10px', padding: '16px 18px' },
  weekLabel: { fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: B, marginBottom: '8px', display: 'block' },
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

const ALL_CLASSES = [
  'Aerial Silks — Intro','Aerial Silks — Beginner','Aerial Silks — Level 2/3',
  'Lyra / Hoop — Intro','Lyra / Hoop — Beginner',
  'Aerial Hammock / Sling',
  'Bungee Fitness','Bungee GOLD (55+)',
  'Slow Flow / Restorative','Sound Bath / Aerial Nap',
  'Strength & Stretch','Cardio Drumming','Hula Hoop Fitness','Dance Fitness',
  'Under 18 Classes','Teacher Training / Certification',
]

const APPROVALS = [
  { label: 'Newsletter Draft', desc: 'Subject line, opening note, Aerialsophy tip, class spotlight, and CTA — reviewed before sending.' },
  { label: 'Aerialsophy Blog Draft', desc: 'Elena expands your tip into a full blog post. You approve the draft directly in Squarespace before it goes live.' },
  { label: 'Social Post Captions', desc: 'Tuesday tip quote card and Thursday class spotlight captions — tone and voice check.' },
  { label: 'Canva Graphics', desc: 'Visual designs for social posts shared for review before scheduling.' },
  { label: 'AI Video Script', desc: 'Script reviewed and approved before voiceover is generated in ElevenLabs.' },
  { label: 'Final AI Video', desc: 'Finished video watched through and approved before publishing.' },
  { label: 'Student / Teacher Feature', desc: 'Wording and permission confirmed before anything goes live.' },
]

export default function FormPage() {
  const [f, setF] = useState({
    month: '', date: new Date().toISOString().split('T')[0],
    news: '', promo: '',
    topic: '', tip: '', story: '', quote: '',
    studentOfMonth: '', teacherOfMonth: '',
    week1Class: '', week2Class: '', week3Class: '', week4Class: '',
    classNotes: '',
    aerialsophy_note: '',
    notes: '',
  })
  const [audience, setAudience] = useState<string[]>([])
  const [approvals, setApprovals] = useState<string[]>([])
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [savedMonth, setSavedMonth] = useState('')

  const toggle = (arr: string[], val: string, set: (a: string[]) => void) =>
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])

  const upd = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF(prev => ({ ...prev, [k]: e.target.value }))

  const selectStyle: React.CSSProperties = { ...styles.input, appearance: 'none' as const, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b5c68' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: '36px', cursor: 'pointer' }

  const ClassSelect = ({ field, week }: { field: string; week: string }) => (
    <div style={styles.weekSlot}>
      <span style={styles.weekLabel}>{week}</span>
      <select style={selectStyle} value={(f as Record<string,string>)[field]} onChange={upd(field)}>
        <option value="">— Select a class —</option>
        {ALL_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  )

  const submit = async () => {
    if (!f.month) { alert('Please enter the Month & Year'); return }
    if (!f.topic) { alert('Please enter your Aerialsophy topic'); return }
    setStatus('loading')
    try {
      const payload = {
        ...f,
        audience: audience.join(', '),
        classes: [f.week1Class, f.week2Class, f.week3Class, f.week4Class].filter(Boolean).join(' | '),
        approvals: approvals.join(', '),
        classNotes: f.classNotes,
      }
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error()
      setSavedMonth(f.month)
      setStatus('success')
      setF({ month: '', date: new Date().toISOString().split('T')[0], news: '', promo: '', topic: '', tip: '', story: '', quote: '', studentOfMonth: '', teacherOfMonth: '', week1Class: '', week2Class: '', week3Class: '', week4Class: '', classNotes: '', aerialsophy_note: '', notes: '' })
      setAudience([]); setApprovals([])
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
        {status === 'success' && <div style={styles.successBox}><span style={{ fontSize: '18px' }}>✅</span><div>Saved! Thank you, Zina. Everything has been received for <strong>{savedMonth}</strong>.</div></div>}
        {status === 'error' && <div style={styles.errorBox}><span>⚠️</span> Something went wrong. Please try again.</div>}

        {/* SECTION 1 — BASICS */}
        <div style={styles.card}>
          <div style={styles.cardHead}><div style={styles.cardNum}>1</div><div style={styles.cardTitle}>Month &amp; Basic Info</div></div>
          <div style={styles.cardBody}>
            <div style={styles.twoCol}>
              <div><label style={styles.fieldLabel}>Month &amp; Year *</label><input style={styles.input} value={f.month} onChange={upd('month')} placeholder="e.g. May 2026" /></div>
              <div><label style={styles.fieldLabel}>Date Submitted</label><input type="date" style={styles.input} value={f.date} onChange={upd('date')} /></div>
            </div>
            <div><label style={styles.fieldLabel}>Big News This Month?</label><div style={styles.fieldHint}>New class, schedule change, special event, or anything exciting at the studio?</div><textarea style={styles.textarea} value={f.news} onChange={upd('news')} placeholder="e.g. We're adding a Saturday Bungee GOLD class starting May 10th!" /></div>
            <div><label style={styles.fieldLabel}>Promotions or Special Offers?</label><div style={styles.fieldHint}>Discount codes, intro offers, seasonal deals, referral promos...</div><textarea style={{ ...styles.textarea, minHeight: '75px' }} value={f.promo} onChange={upd('promo')} placeholder="e.g. First class free for new students. Use code MAY2026 at checkout." /></div>
          </div>
        </div>

        {/* SECTION 2 — AERIALOSOPHY */}
        <div style={styles.card}>
          <div style={styles.cardHead}><div style={styles.cardNum}>2</div><div style={styles.cardTitle}>Zina&apos;s Aerialsophy — This Month&apos;s Tip</div></div>
          <div style={styles.cardBody}>
            <div style={styles.noteBox}>
              <strong style={{ fontWeight: 700 }}>How this works:</strong> You share your tip here in your own words. Elena will expand it into a full blog post and publish it on the website. You&apos;ll receive a draft to approve directly in Squarespace before it goes live — no extra work needed from you!
            </div>
            <div><label style={styles.fieldLabel}>Topic or Theme *</label><div style={styles.fieldHint}>What do you want to talk about this month? A movement tip, wellness insight, technique — anything aerial or whole-body wellness.</div><input style={styles.input} value={f.topic} onChange={upd('topic')} placeholder="e.g. Why breathing matters more than strength in aerial silks" /></div>
            <div><label style={styles.fieldLabel}>Your Tip — In Your Own Words *</label><div style={styles.fieldHint}>Don&apos;t worry about perfect writing. Bullet points, a paragraph, a brain dump — all good. This is your voice and your knowledge, we&apos;ll shape it into the final content.</div><textarea style={{ ...styles.textarea, minHeight: '140px' }} value={f.tip} onChange={upd('tip')} placeholder="e.g. Most students hold their breath when they're scared or working hard. But this makes everything harder...&#10;&#10;• Breathing on the way up releases tension&#10;• Exhale on the effort — like in weight training&#10;• Try this next time you do a pull-up on the silks..." /></div>
            <div><label style={styles.fieldLabel}>Who Is This Tip For?</label><div style={styles.fieldHint}>Select all that apply — this helps us write the right tone.</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>{AUDIENCE.map(a => <Pill key={a} label={a} selected={audience.includes(a)} onClick={() => toggle(audience, a, setAudience)} />)}</div></div>
            <div><label style={styles.fieldLabel}>Student Story or Example</label><div style={styles.fieldHint}>A student win, a moment from class, something you observed recently — makes the content come alive.</div><textarea style={styles.textarea} value={f.story} onChange={upd('story')} placeholder="e.g. Last week, one of my students tried the breathing technique and immediately felt the difference on her third pull..." /></div>
            <div><label style={styles.fieldLabel}>One-Sentence Takeaway</label><div style={styles.fieldHint}>If someone could only remember one thing — this becomes the Tuesday social media quote card.</div><input style={styles.input} value={f.quote} onChange={upd('quote')} placeholder="e.g. You don't need more strength — you need to stop fighting your own body." /></div>
            <div><label style={styles.fieldLabel}>Anything Else for the Blog?</label><div style={styles.fieldHint}>Any specific points, research, or personal insights you want Elena to include when she expands this into the full blog post.</div><textarea style={{ ...styles.textarea, minHeight: '75px' }} value={f.aerialsophy_note} onChange={upd('aerialsophy_note')} placeholder="e.g. Make sure to mention Golgi Tendon Bodies and how they relate to this. Also include the breathing exercise from my Level 2 class." /></div>
          </div>
        </div>

        {/* SECTION 3 — CLASS SPOTLIGHT */}
        <div style={styles.card}>
          <div style={styles.cardHead}><div style={styles.cardNum}>3</div><div style={styles.cardTitle}>Class Spotlight This Month</div></div>
          <div style={styles.cardBody}>
            <div style={styles.noteBox}>
              <strong style={{ fontWeight: 700 }}>One class promoted per week</strong> on Facebook and Instagram — a dedicated post each Thursday with the class benefits, schedule, and sign-up link. Pick the 4 classes you want to push most this month, one per week slot below.
            </div>
            <div>
              <label style={styles.fieldLabel}>Which Classes to Spotlight This Month?</label>
              <div style={styles.fieldHint}>Assign one class per week — these will each get their own dedicated social media promo post.</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                <ClassSelect field="week1Class" week="Week 1 Spotlight" />
                <ClassSelect field="week2Class" week="Week 2 Spotlight" />
                <ClassSelect field="week3Class" week="Week 3 Spotlight" />
                <ClassSelect field="week4Class" week="Week 4 Spotlight" />
              </div>
            </div>
            <div><label style={styles.fieldLabel}>Anything Special to Highlight?</label><div style={styles.fieldHint}>New time slots, limited spots, a seasonal angle, beginner-friendly messaging, or anything specific you want emphasized for any of these classes.</div><textarea style={styles.textarea} value={f.classNotes} onChange={upd('classNotes')} placeholder="e.g. Bungee GOLD is now Wednesdays at 11am — great for our 55+ community. Aerial Silks Intro has been filling fast, mention limited spots for Week 1." /></div>
          </div>
        </div>

        {/* SECTION 4 — STUDENT & TEACHER OF THE MONTH */}
        <div style={styles.card}>
          <div style={styles.cardHead}><div style={styles.cardNum}>4</div><div style={styles.cardTitle}>Student &amp; Teacher of the Month</div></div>
          <div style={styles.cardBody}>
            <div style={styles.infoBox}>
              Student responses and feedback are collected separately through the student form and saved in the Google Sheet. Just provide the names here so we can feature them in the newsletter and social posts this month!
            </div>
            <div style={styles.twoCol}>
              <div>
                <label style={styles.fieldLabel}>Student of the Month</label>
                <div style={styles.fieldHint}>First name is fine if they prefer privacy.</div>
                <input style={styles.input} value={f.studentOfMonth} onChange={upd('studentOfMonth')} placeholder="e.g. Sandra" />
              </div>
              <div>
                <label style={styles.fieldLabel}>Teacher of the Month</label>
                <div style={styles.fieldHint}>Which teacher shone brightest this month?</div>
                <input style={styles.input} value={f.teacherOfMonth} onChange={upd('teacherOfMonth')} placeholder="e.g. Coach Maria" />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5 — APPROVALS */}
        <div style={styles.card}>
          <div style={styles.cardHead}><div style={styles.cardNum}>5</div><div style={styles.cardTitle}>Approvals Needed This Month</div></div>
          <div style={styles.cardBody}>
            <p style={{ fontSize: '12.5px', color: MUT, lineHeight: 1.6 }}>Check each item once you&apos;ve reviewed and approved it. Anything unchecked will be flagged before it goes live.</p>
            <div>{APPROVALS.map(a => <CheckItem key={a.label} label={a.label} desc={a.desc} checked={approvals.includes(a.label)} onClick={() => toggle(approvals, a.label, setApprovals)} />)}</div>
          </div>
        </div>

        {/* SECTION 6 — OPEN NOTES */}
        <div style={styles.card}>
          <div style={styles.cardHead}><div style={styles.cardNum}>6</div><div style={styles.cardTitle}>Anything Else?</div></div>
          <div style={styles.cardBody}>
            <div><label style={styles.fieldLabel}>Open Notes for This Month</label><div style={styles.fieldHint}>Ideas, upcoming events, feedback on last month&apos;s content, or anything at all on your mind.</div><textarea style={{ ...styles.textarea, minHeight: '120px' }} value={f.notes} onChange={upd('notes')} placeholder="e.g. Thinking of doing an open house in June. Also want to start sharing more about nervous system work — maybe next month's blog topic?" /></div>
          </div>
        </div>

        {/* SUBMIT */}
        <div style={styles.submitArea}>
          <p style={styles.submitNote}>Once submitted, your response goes directly to the admin dashboard where Elena can access everything right away.</p>
          <button style={{ ...styles.btnSubmit, opacity: status === 'loading' ? 0.7 : 1 }} onClick={submit} disabled={status === 'loading'}>
            {status === 'loading' ? 'Saving...' : 'Submit This Month ✓'}
          </button>
        </div>
      </div>
    </div>
  )
}
