'use client'
import { useState, useEffect } from 'react'

const B = '#7e4070', BD = '#5c2e52', BL = '#f5eaf4', BB = '#e2cde0', MUT = '#6b5c68', SUB = '#f8f4f8'

const FIELDS = [
  ['month','Month & Year'],['submitted_date','Date Submitted'],['news','Big News'],
  ['promo','Promotions'],['topic','Aerialosophy Topic'],['tip','The Tip'],
  ['audience','Audience'],['story','Student Story'],['quote','Quote Card'],
  ['classes','Classes to Feature'],['class_notes','Class Notes'],['testimonial','Testimonial'],
  ['permission','Permission'],['blog_dir','Blog Direction'],['blog_topic','Blog Topic'],
  ['blog_points','Blog Key Points'],['approvals','Approvals Checked'],['notes','Open Notes'],
]

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [user, setUser] = useState<{name:string}>()
  const [responses, setResponses] = useState<Record<string,string>[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState<number|null>(null)

  const login = async () => {
    setLoginError('')
    const res = await fetch('/api/login', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({username, password}) })
    if (res.ok) {
      const d = await res.json()
      setUser(d.user)
      setAuthed(true)
      loadResponses()
    } else { setLoginError('Incorrect username or password.') }
  }

  const logout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    setAuthed(false); setUser(undefined); setResponses([])
  }

  const loadResponses = async () => {
    setLoading(true)
    const res = await fetch('/api/responses')
    if (res.ok) setResponses(await res.json())
    setLoading(false)
  }

  const inp: React.CSSProperties = { width: '100%', fontFamily: "'Montserrat',sans-serif", fontSize: '14px', color: '#1a1020', background: SUB, border: `1.5px solid ${BB}`, borderRadius: '8px', padding: '11px 15px', outline: 'none', marginBottom: '14px' }

  if (!authed) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: SUB, padding: '20px' }}>
      <div style={{ background: '#fff', borderRadius: '16px', border: `1px solid ${BB}`, padding: '48px', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#c49abe', marginBottom: '10px' }}>Admin Access</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '30px', color: BD }}>Content <em style={{fontStyle:'italic',color:B}}>Hub</em></h1>
          <p style={{ fontSize: '13px', color: MUT, marginTop: '8px', lineHeight: 1.5 }}>Sign in to view Zina&apos;s monthly responses</p>
        </div>
        <div>
          <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: B, display: 'block', marginBottom: '5px' }}>Username</label>
          <input style={inp} value={username} onChange={e=>setUsername(e.target.value)} placeholder="elena or zina" onKeyDown={e=>e.key==='Enter'&&login()} />
          <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: B, display: 'block', marginBottom: '5px' }}>Password</label>
          <input type="password" style={inp} value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()} />
          {loginError && <p style={{ fontSize: '13px', color: '#a33', marginBottom: '12px' }}>{loginError}</p>}
          <button onClick={login} style={{ width: '100%', background: B, color: '#fff', border: 'none', borderRadius: '8px', padding: '13px', fontFamily: "'Montserrat',sans-serif", fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Sign In</button>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      {/* NAV */}
      <div style={{ background: BD, padding: '14px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '17px', color: '#fff', fontWeight: 700 }}>
          Aerial Fun <em style={{fontStyle:'italic',color:'#c49abe'}}>&amp; Fitness</em> <span style={{fontSize:'13px',fontWeight:400,color:'rgba(255,255,255,0.5)',marginLeft:'10px'}}>Admin</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
          <span style={{fontSize:'13px',color:'rgba(255,255,255,0.7)'}}>Hi, {user?.name}!</span>
          <a href="/form" style={{fontSize:'12px',color:'rgba(255,255,255,0.6)',textDecoration:'none'}}>← Form</a>
          <button onClick={logout} style={{background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',color:'rgba(255,255,255,0.8)',borderRadius:'6px',padding:'6px 14px',fontFamily:"'Montserrat',sans-serif",fontSize:'12px',cursor:'pointer'}}>Sign Out</button>
        </div>
      </div>

      <div style={{maxWidth:'900px',margin:'0 auto',padding:'36px 40px 60px'}}>

        {/* HEADER */}
        <div style={{marginBottom:'32px'}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'28px',color:BD,marginBottom:'8px'}}>Monthly <em style={{fontStyle:'italic',color:B}}>Responses</em></h2>
          <p style={{fontSize:'13px',color:MUT}}>All of Zina&apos;s submitted content forms, newest first.</p>
        </div>

        {loading && <p style={{color:MUT,fontSize:'14px'}}>Loading responses...</p>}

        {!loading && responses.length === 0 && (
          <div style={{textAlign:'center',padding:'60px 20px',color:MUT}}>
            <div style={{fontSize:'40px',marginBottom:'16px',opacity:0.3}}>📋</div>
            <p style={{fontSize:'14px',lineHeight:1.6}}>No responses yet.<br/>Once Zina fills out the form, her entries will appear here.</p>
          </div>
        )}

        {responses.map((r, i) => (
          <div key={r.id} style={{background:'#fff',borderRadius:'12px',border:`1px solid ${BB}`,marginBottom:'16px',overflow:'hidden'}}>
            {/* Card header */}
            <div onClick={()=>setOpen(open===i?null:i)} style={{background:open===i?BD:BL,padding:'16px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer',transition:'background 0.2s'}}>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:'18px',fontWeight:700,color:open===i?'#fff':BD}}>{r.month || 'Untitled'}</div>
                <div style={{fontSize:'11px',color:open===i?'rgba(255,255,255,0.6)':MUT,marginTop:'3px'}}>Submitted: {r.created_at ? new Date(r.created_at).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}) : '—'}</div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                {r.topic && <span style={{fontSize:'11px',background:open===i?'rgba(255,255,255,0.15)':BL,border:`1px solid ${open===i?'rgba(255,255,255,0.2)':BB}`,borderRadius:'20px',padding:'4px 12px',color:open===i?'#fff':BD,fontWeight:600}}>{r.topic.slice(0,40)}{r.topic.length>40?'...':''}</span>}
                <span style={{fontSize:'12px',color:open===i?'rgba(255,255,255,0.8)':MUT}}>{open===i?'▲':'▼'}</span>
              </div>
            </div>

            {/* Card body */}
            {open === i && (
              <div style={{padding:'24px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>
                {FIELDS.map(([key, label]) => r[key] ? (
                  <div key={key} style={{gridColumn: ['tip','story','notes','blog_points'].includes(key)?'1 / -1':'auto'}}>
                    <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:B,marginBottom:'5px'}}>{label}</div>
                    <div style={{fontSize:'13px',color:'#1a1020',lineHeight:1.65,whiteSpace:'pre-wrap',background:SUB,borderRadius:'6px',padding:'10px 14px'}}>{r[key]}</div>
                  </div>
                ) : null)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
