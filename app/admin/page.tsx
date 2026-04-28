'use client'
import { useState } from 'react'

const B = '#7e4070', BD = '#5c2e52', BL = '#f5eaf4', BB = '#e2cde0', MUT = '#6b5c68', SUB = '#f8f4f8'

const ALL_CLASSES = [
  '','Aerial Silks — Intro','Aerial Silks — Beginner','Aerial Silks — Intermediate','Aerial Silks — Advanced',
  'Aerial Sling & Hammock — Intro','Aerial Sling & Hammock — Beginner','Aerial Sling & Hammock — Intermediate','Aerial Sling & Hammock — Advanced',
  'Lyra / Hoop — Intro','Lyra / Hoop — Beginner','Lyra / Hoop — Intermediate','Lyra / Hoop — Advanced',
  'Bungee Fitness','Bungee GOLD (55+)',
  'Slow Flow / Restorative','Sound Bath / Aerial Nap',
  'Strength & Stretch','Cardio Drumming','Hula Hoop Fitness','Dance Fitness',
  'Under 18 Classes','Teacher Training / Certification',
]

const FIELDS: [string, string, 'text'|'textarea'|'select'][] = [
  ['month','Month & Year','text'],
  ['submitted_date','Date Submitted','text'],
  ['news','Big News This Month','textarea'],
  ['promo','Promotions / Offers','textarea'],
  ['topic','Aerialsophy Topic','text'],
  ['tip','The Tip','textarea'],
  ['audience','Audience','text'],
  ['story','Student Story / Example','textarea'],
  ['quote','Quote Card','text'],
  ['aerialsophy_note','Notes for Blog Expansion','textarea'],
  ['week1_class','Week 1 Class Spotlight','select'],
  ['week2_class','Week 2 Class Spotlight','select'],
  ['week3_class','Week 3 Class Spotlight','select'],
  ['week4_class','Week 4 Class Spotlight','select'],
  ['class_notes','Class Spotlight Notes','textarea'],
  ['student_of_month','Student of the Month','text'],
  ['teacher_of_month','Teacher of the Month','text'],
  ['approvals','Approvals Checked','text'],
  ['notes','Open Notes','textarea'],
]

const WIDE = ['tip','story','notes','aerialsophy_note','class_notes','promo','news']

type Row = Record<string, string>

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [user, setUser] = useState<{name:string}>()
  const [responses, setResponses] = useState<Row[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState<number|null>(null)
  const [editingId, setEditingId] = useState<number|null>(null)
  const [editData, setEditData] = useState<Row>({})
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  const login = async () => {
    setLoginError('')
    const res = await fetch('/api/login', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({username, password}) })
    if (res.ok) {
      const d = await res.json()
      setUser(d.user); setAuthed(true); loadResponses()
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

  const startEdit = (r: Row) => {
    setEditingId(Number(r.id))
    setEditData({ ...r })
    setSaveMsg('')
  }

  const cancelEdit = () => { setEditingId(null); setEditData({}); setSaveMsg('') }

  const saveEdit = async () => {
    setSaving(true); setSaveMsg('')
    try {
      const res = await fetch('/api/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData)
      })
      if (!res.ok) throw new Error()
      setResponses(prev => prev.map(r => r.id === editData.id ? { ...editData } : r))
      setEditingId(null); setEditData({})
      setSaveMsg('saved')
    } catch { setSaveMsg('error') }
    setSaving(false)
  }

  const upd = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setEditData(prev => ({ ...prev, [k]: e.target.value }))

  const inp: React.CSSProperties = { width: '100%', fontFamily: "'Montserrat',sans-serif", fontSize: '13px', color: '#1a1020', background: '#fff', border: `1.5px solid ${B}`, borderRadius: '7px', padding: '9px 13px', outline: 'none', marginBottom: '0' }
  const ta: React.CSSProperties = { ...inp, resize: 'vertical' as const, minHeight: '80px', lineHeight: 1.6 }
  const loginInp: React.CSSProperties = { width: '100%', fontFamily: "'Montserrat',sans-serif", fontSize: '14px', color: '#1a1020', background: SUB, border: `1.5px solid ${BB}`, borderRadius: '8px', padding: '11px 15px', outline: 'none', marginBottom: '14px' }

  if (!authed) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: SUB, padding: '20px' }}>
      <div style={{ background: '#fff', borderRadius: '16px', border: `1px solid ${BB}`, padding: '48px', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#c49abe', marginBottom: '10px' }}>Admin Access</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '30px', color: BD }}>Content <em style={{fontStyle:'italic',color:B}}>Hub</em></h1>
          <p style={{ fontSize: '13px', color: MUT, marginTop: '8px', lineHeight: 1.5 }}>Sign in to view and edit Zina&apos;s monthly responses</p>
        </div>
        <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: B, display: 'block', marginBottom: '5px' }}>Username</label>
        <input style={loginInp} value={username} onChange={e=>setUsername(e.target.value)} placeholder="elena or zina" onKeyDown={e=>e.key==='Enter'&&login()} />
        <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' as const, color: B, display: 'block', marginBottom: '5px' }}>Password</label>
        <input type="password" style={loginInp} value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()} />
        {loginError && <p style={{ fontSize: '13px', color: '#a33', marginBottom: '12px' }}>{loginError}</p>}
        <button onClick={login} style={{ width: '100%', background: B, color: '#fff', border: 'none', borderRadius: '8px', padding: '13px', fontFamily: "'Montserrat',sans-serif", fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Sign In</button>
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ background: BD, padding: '14px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '17px', color: '#fff', fontWeight: 700 }}>
          Aerial Fun <em style={{fontStyle:'italic',color:'#c49abe'}}>&amp; Fitness</em>
          <span style={{fontSize:'13px',fontWeight:400,color:'rgba(255,255,255,0.5)',marginLeft:'10px'}}>Admin</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
          <span style={{fontSize:'13px',color:'rgba(255,255,255,0.7)'}}>Hi, {user?.name}!</span>
          <a href="/form" style={{fontSize:'12px',color:'rgba(255,255,255,0.6)',textDecoration:'none'}}>← Form</a>
          <button onClick={logout} style={{background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',color:'rgba(255,255,255,0.8)',borderRadius:'6px',padding:'6px 14px',fontFamily:"'Montserrat',sans-serif",fontSize:'12px',cursor:'pointer'}}>Sign Out</button>
        </div>
      </div>

      <div style={{maxWidth:'960px',margin:'0 auto',padding:'36px 40px 60px'}}>
        <div style={{marginBottom:'32px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
          <div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'28px',color:BD,marginBottom:'6px'}}>Monthly <em style={{fontStyle:'italic',color:B}}>Responses</em></h2>
            <p style={{fontSize:'13px',color:MUT}}>View and edit Zina&apos;s monthly content submissions.</p>
          </div>
          <div style={{background:BL,border:`1px solid ${BB}`,borderRadius:'20px',padding:'6px 16px',fontSize:'12px',fontWeight:600,color:BD}}>
            {responses.length} {responses.length === 1 ? 'entry' : 'entries'}
          </div>
        </div>

        {loading && <p style={{color:MUT,fontSize:'14px',textAlign:'center',padding:'40px'}}>Loading responses...</p>}

        {!loading && responses.length === 0 && (
          <div style={{textAlign:'center',padding:'60px 20px',color:MUT}}>
            <div style={{fontSize:'48px',marginBottom:'16px',opacity:0.25}}>📋</div>
            <p style={{fontSize:'14px',lineHeight:1.7}}>No responses yet.<br/>Once Zina fills out the form, her entries will appear here.</p>
          </div>
        )}

        {responses.map((r, i) => {
          const isEditing = editingId === Number(r.id)
          const isOpen = open === i

          return (
            <div key={r.id} style={{background:'#fff',borderRadius:'12px',border:`1.5px solid ${isEditing ? B : BB}`,marginBottom:'16px',overflow:'hidden',transition:'border-color 0.2s'}}>

              {/* Card header */}
              <div style={{background:isEditing ? B : isOpen ? BD : BL, padding:'16px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',transition:'background 0.2s'}}>
                <div style={{cursor:'pointer',flex:1}} onClick={()=>!isEditing&&setOpen(isOpen?null:i)}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:'20px',fontWeight:700,color:isEditing||isOpen?'#fff':BD}}>{r.month || 'Untitled'}</div>
                  <div style={{fontSize:'11px',color:(isEditing||isOpen)?'rgba(255,255,255,0.6)':MUT,marginTop:'3px'}}>
                    Submitted: {r.created_at ? new Date(r.created_at).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}) : '—'}
                    {isEditing && <span style={{marginLeft:'10px',background:'rgba(255,255,255,0.2)',borderRadius:'10px',padding:'2px 10px',fontSize:'11px'}}>✏️ Editing</span>}
                  </div>
                </div>
                <div style={{display:'flex',gap:'8px',flexShrink:0}}>
                  {!isEditing ? (
                    <>
                      <button onClick={()=>{setOpen(isOpen?null:i)}} style={{background:'rgba(255,255,255,0.15)',border:'1px solid rgba(255,255,255,0.3)',color:'#fff',borderRadius:'6px',padding:'6px 14px',fontFamily:"'Montserrat',sans-serif",fontSize:'12px',fontWeight:600,cursor:'pointer'}}>
                        {isOpen ? '▲ Close' : '▼ View'}
                      </button>
                      <button onClick={()=>{startEdit(r);setOpen(i)}} style={{background:'#fff',border:'none',color:BD,borderRadius:'6px',padding:'6px 14px',fontFamily:"'Montserrat',sans-serif",fontSize:'12px',fontWeight:700,cursor:'pointer'}}>
                        ✏️ Edit
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={cancelEdit} style={{background:'rgba(255,255,255,0.15)',border:'1px solid rgba(255,255,255,0.3)',color:'#fff',borderRadius:'6px',padding:'6px 14px',fontFamily:"'Montserrat',sans-serif",fontSize:'12px',fontWeight:600,cursor:'pointer'}}>
                        Cancel
                      </button>
                      <button onClick={saveEdit} disabled={saving} style={{background:'#fff',border:'none',color:BD,borderRadius:'6px',padding:'6px 18px',fontFamily:"'Montserrat',sans-serif",fontSize:'12px',fontWeight:700,cursor:'pointer',opacity:saving?0.7:1}}>
                        {saving ? 'Saving...' : '✓ Save Changes'}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Save feedback */}
              {saveMsg === 'saved' && !isEditing && i === open && (
                <div style={{background:'#eaf5f0',borderBottom:`1px solid #b2dfce`,padding:'10px 24px',fontSize:'13px',color:'#2e7d5e',fontWeight:600}}>✅ Changes saved successfully!</div>
              )}
              {saveMsg === 'error' && isEditing && (
                <div style={{background:'#fdf0f0',borderBottom:`1px solid #f5c0c0`,padding:'10px 24px',fontSize:'13px',color:'#a33',fontWeight:600}}>⚠️ Something went wrong. Please try again.</div>
              )}

              {/* Card body — view or edit */}
              {(isOpen || isEditing) && (
                <div style={{padding:'24px'}}>

                  {/* Class spotlight — always shown as summary */}
                  {(isEditing ? editData : r).week1_class || (isEditing ? editData : r).week2_class ? (
                    <div style={{background:BL,border:`1px solid ${BB}`,borderRadius:'10px',padding:'16px 20px',marginBottom:'20px'}}>
                      <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:B,marginBottom:'12px'}}>Class Spotlight Schedule</div>
                      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'10px'}}>
                        {(['week1_class','week2_class','week3_class','week4_class'] as const).map((k,wi)=>(
                          <div key={k} style={{background:'#fff',borderRadius:'8px',border:`1px solid ${BB}`,padding:'10px 12px'}}>
                            <div style={{fontSize:'10px',fontWeight:700,color:MUT,marginBottom:'4px'}}>Week {wi+1}</div>
                            {isEditing ? (
                              <select value={editData[k]||''} onChange={upd(k)} style={{width:'100%',fontFamily:"'Montserrat',sans-serif",fontSize:'12px',color:'#1a1020',background:SUB,border:`1px solid ${BB}`,borderRadius:'5px',padding:'5px 8px',outline:'none'}}>
                                {ALL_CLASSES.map(c=><option key={c} value={c}>{c||'— Select —'}</option>)}
                              </select>
                            ) : (
                              <div style={{fontSize:'12px',fontWeight:600,color:(isEditing?editData:r)[k]?BD:MUT,lineHeight:1.4}}>{(isEditing?editData:r)[k]||'—'}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {/* Student & Teacher */}
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'20px'}}>
                    {(['student_of_month','teacher_of_month'] as const).map((k,ki)=>(
                      <div key={k} style={{background:'#fff8ff',border:`1px solid ${BB}`,borderRadius:'8px',padding:'12px 16px'}}>
                        <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:B,marginBottom:'6px'}}>{ki===0?'Student of the Month':'Teacher of the Month'}</div>
                        {isEditing ? (
                          <input value={editData[k]||''} onChange={upd(k)} style={{...inp,marginBottom:0}} placeholder={ki===0?'e.g. Sandra':'e.g. Coach Maria'} />
                        ) : (
                          <div style={{fontSize:'14px',fontWeight:600,color:(isEditing?editData:r)[k]?BD:MUT}}>{(isEditing?editData:r)[k]||'—'}</div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* All other fields */}
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
                    {FIELDS.filter(([key])=>!['week1_class','week2_class','week3_class','week4_class','student_of_month','teacher_of_month'].includes(key)).map(([key, label, type])=>{
                      const val = (isEditing ? editData : r)[key]
                      if (!isEditing && !val) return null
                      return (
                        <div key={key} style={{gridColumn: WIDE.includes(key) ? '1 / -1' : 'auto'}}>
                          <div style={{fontSize:'10px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:B,marginBottom:'5px'}}>{label}</div>
                          {isEditing ? (
                            type === 'textarea' ? (
                              <textarea value={editData[key]||''} onChange={upd(key)} style={ta} />
                            ) : (
                              <input value={editData[key]||''} onChange={upd(key)} style={{...inp,marginBottom:0}} />
                            )
                          ) : (
                            <div style={{fontSize:'13px',color:'#1a1020',lineHeight:1.65,whiteSpace:'pre-wrap',background:SUB,borderRadius:'6px',padding:'10px 14px'}}>{val}</div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Bottom save button when editing — convenient second save */}
                  {isEditing && (
                    <div style={{marginTop:'24px',paddingTop:'20px',borderTop:`1px solid ${BB}`,display:'flex',justifyContent:'flex-end',gap:'10px'}}>
                      <button onClick={cancelEdit} style={{background:'#fff',border:`1.5px solid ${BB}`,color:MUT,borderRadius:'8px',padding:'10px 22px',fontFamily:"'Montserrat',sans-serif",fontSize:'13px',fontWeight:600,cursor:'pointer'}}>
                        Cancel
                      </button>
                      <button onClick={saveEdit} disabled={saving} style={{background:B,border:'none',color:'#fff',borderRadius:'8px',padding:'10px 28px',fontFamily:"'Montserrat',sans-serif",fontSize:'13px',fontWeight:700,cursor:'pointer',opacity:saving?0.7:1}}>
                        {saving ? 'Saving...' : '✓ Save Changes'}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
