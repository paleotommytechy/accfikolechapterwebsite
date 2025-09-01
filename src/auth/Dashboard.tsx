// import React from 'react'
// import {useAuth} from '../context/AuthContext'
// import {useNavigate} from 'react-router-dom'

// const Dashboard:React.FC = () => {
// 	const {signOut} = useAuth();
// 	const navigate = useNavigate();

// 	const handleLogout = async () => {
// 		await signOut();
// 		navigate("/login");
// 	}
// 	return(
// 		<>
// 		<h1>Welcome to Dashboard Page</h1>
// 		<button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
// 		</>
// 	);
// };

// export default Dashboard;
import React, { useMemo, useState, useRef, useEffect } from "react";

/**
 * Fellowship Dashboard (UI-only)
 * Frameworks: React + TypeScript (TSX) + Bootstrap classes
 *
 * NOTE: This file is design-only. No real-time / backend integrations.
 * It uses local component state and mock data to demonstrate interactions.
 *
 * HOW IT'S ORGANIZED
 * - Step 1: Profile Update (image + personal fields)
 * - Step 2: User Task Assignment (assign tasks to a user)
 * - Step 3: Daily Tasks (checkbox list with progress)
 * - Step 4: Weekly Challenge (progress + CTA)
 * - Step 5: Leaderboard (top users by points)
 * - Step 6–8: Notifications (New Post + Comment)
 * - Step 9: Prayer Request section (submit & list)
 * - Step10: Bible Study Progress Tracker (plan progress)
 * - Step11: User Profile with Badges (badges showcase)
 * - Step12: Coin Store (redeem with coins)
 * - Step13: Level-up system (XP bar)
 * - Step14: Scripture of the day widget
 * - Step15: Event calendar (simple month grid)
 * - Step16: Private Messaging (mock DMs)
 * - Step17: Analytics for leaders (KPIs + mini bars)
 * - Step18: Group Challenges (join/progress)
 * - Step19: Custom Notifications (per-user toggles)
 */

/*********************\
|* Shared Types      *|
\*********************/

type Gender = "Male" | "Female" | "Other";

type UserProfile = {
  id: string;
  avatarUrl?: string;
  name: string;
  position: string; // e.g., Prayer Coordinator
  level: string; // e.g., 100L, 200L, ...
  department: string; // e.g., Media, Choir
  gender: Gender;
  dobMonth?: number; // 1-12
  dobDay?: number; // 1-31
  whatsapp?: string;
  hotline?: string;
  email?: string;
  coins: number;
  xp: number; // 0-100 for demo
  badges: string[];
};

type Task = {
  id: string;
  title: string;
  assigneeId?: string;
  due?: string; // ISO date
  done?: boolean;
  points?: number;
};

type NotificationItem = {
  id: string;
  type: "post" | "comment";
  title: string;
  time: string; // e.g., '2h ago'
  unread?: boolean;
};

type PrayerRequest = {
  id: string;
  userId: string;
  text: string;
  date: string;
};

type StudyPlan = { id: string; name: string; progress: number };

type StoreItem = { id: string; name: string; cost: number; owned?: boolean };

type EventItem = { id: string; date: string; title: string };

type Message = { id: string; from: string; text: string; time: string };

type Challenge = { id: string; title: string; progress: number; joined?: boolean };

type AnalyticsStat = { id: string; label: string; value: number; trend?: number };

/*********************\
|* Utility helpers   *|
\*********************/

const uid = () => Math.random().toString(36).slice(2);

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/*********************\n * Step 14: Scripture Widget
 *********************/
const ScriptureOfTheDay: React.FC = () => {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between">
          <h6 className="text-muted mb-0">Scripture of the Day</h6>
          <span className="badge bg-light text-dark">Psalm 23:1</span>
        </div>
        <p className="mt-2 mb-0 fw-semibold">
          "The LORD is my shepherd; I shall not want."
        </p>
      </div>
    </div>
  );
};

/*********************\n * Step 13: Level-Up System
 *********************/
const LevelUpSystem: React.FC<{ profile: UserProfile; onGainXP: (n: number) => void }> = ({ profile, onGainXP }) => {
  const levelNumber = useMemo(() => {
    // Demo formula: every 100 XP == +1 level tier within the string like "300L"
    const base = parseInt(profile.level);
    const extra = Math.floor(profile.xp / 100) * 100;
    return isNaN(base) ? profile.level : `${base + extra}L`;
  }, [profile.level, profile.xp]);

  const pct = Math.min(profile.xp % 100, 100);

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0">Level-Up</h6>
          <span className="badge bg-primary">Level {levelNumber}</span>
        </div>
        <div className="progress mt-3" style={{ height: 8 }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${pct}%` }}
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <div className="d-flex gap-2 mt-3">
          <button className="btn btn-outline-primary btn-sm" onClick={() => onGainXP(10)}>
            +10 XP
          </button>
          <button className="btn btn-outline-primary btn-sm" onClick={() => onGainXP(25)}>
            +25 XP
          </button>
        </div>
      </div>
    </div>
  );
};

/*********************\n * Step 11: Badges
 *********************/
const ProfileBadges: React.FC<{ badges: string[] }> = ({ badges }) => (
  <div className="card shadow-sm mb-3">
    <div className="card-body">
      <h6 className="mb-2">Badges</h6>
      <div className="d-flex flex-wrap gap-2">
        {badges.length ? (
          badges.map((b) => (
            <span key={b} className="badge bg-success-subtle text-success border border-success-subtle">
              {b}
            </span>
          ))
        ) : (
          <small className="text-muted">No badges yet</small>
        )}
      </div>
    </div>
  </div>
);

/*********************\n * Step 1: Profile Update
 *********************/
const ProfileUpdate: React.FC<{
  profile: UserProfile;
  onSave: (p: Partial<UserProfile>) => void;
}> = ({ profile, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Partial<UserProfile>>({ ...profile });
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => setDraft(profile), [profile]);

  const onChange = (key: keyof UserProfile, value: any) => {
    setDraft((d) => ({ ...d, [key]: value }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onChange("avatarUrl", url);
  };

  const months = monthNames.map((m, i) => ({ label: m, value: i + 1 }));
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <div className="d-flex align-items-center gap-3">
          <img
            src={draft.avatarUrl || `https://i.pravatar.cc/120?u=${profile.id}`}
            alt="avatar"
            className="rounded-circle border"
            width={72}
            height={72}
          />
          <div className="flex-grow-1">
            <h5 className="mb-0">{profile.name}</h5>
            <small className="text-muted">{profile.position} • {profile.department}</small>
          </div>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => setEditing((e) => !e)}>
            {editing ? "Close" : "Edit Profile"}
          </button>
        </div>

        {editing && (
          <div className="mt-3 border-top pt-3">
            <div className="row g-3">
              <div className="col-12 d-flex align-items-center gap-2">
                <input ref={fileRef} type="file" accept="image/*" className="form-control form-control-sm" onChange={handleImage} />
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => fileRef.current?.click()}
                  type="button"
                >
                  Upload Image
                </button>
              </div>
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input className="form-control" value={draft.name || ""} onChange={(e) => onChange("name", e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Position in Fellowship</label>
                <input className="form-control" value={draft.position || ""} onChange={(e) => onChange("position", e.target.value)} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Level</label>
                <select className="form-select" value={draft.level} onChange={(e) => onChange("level", e.target.value)}>
                  {["100L","200L","300L","400L","500L"].map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Department</label>
                <select className="form-select" value={draft.department} onChange={(e) => onChange("department", e.target.value)}>
                  {["Choir","Media","Ushering","Prayer","Evangelism","Welfare"].map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Gender</label>
                <select className="form-select" value={draft.gender} onChange={(e) => onChange("gender", e.target.value as Gender)}>
                  {["Male","Female","Other"].map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Birth Month</label>
                <select className="form-select" value={draft.dobMonth || 1} onChange={(e) => onChange("dobMonth", Number(e.target.value))}>
                  {months.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Birth Day</label>
                <select className="form-select" value={draft.dobDay || 1} onChange={(e) => onChange("dobDay", Number(e.target.value))}>
                  {days.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">WhatsApp</label>
                <input className="form-control" value={draft.whatsapp || ""} onChange={(e) => onChange("whatsapp", e.target.value)} placeholder="e.g. +234 801 234 5678" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Hotline</label>
                <input className="form-control" value={draft.hotline || ""} onChange={(e) => onChange("hotline", e.target.value)} />
              </div>
              <div className="col-md-12">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={draft.email || ""} onChange={(e) => onChange("email", e.target.value)} />
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <button className="btn btn-light" onClick={() => setDraft(profile)}>Reset</button>
              <button className="btn btn-primary" onClick={() => { onSave(draft); setEditing(false); }}>Save</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/*********************\n * Step 3: Daily Tasks
 *********************/
const DailyTasks: React.FC<{
  items: Task[];
  onToggle: (id: string) => void;
}> = ({ items, onToggle }) => {
  const completed = items.filter((t) => t.done).length;
  const pct = items.length ? Math.round((completed / items.length) * 100) : 0;

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0">Daily Tasks</h6>
          <small className="text-muted">{completed}/{items.length} done</small>
        </div>
        <div className="progress mb-3" style={{ height: 6 }}>
          <div className="progress-bar" role="progressbar" style={{ width: `${pct}%` }} />
        </div>
        <ul className="list-group list-group-flush">
          {items.map((t) => (
            <li key={t.id} className="list-group-item d-flex align-items-center justify-content-between">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={!!t.done} onChange={() => onToggle(t.id)} id={`daily-${t.id}`} />
                <label className="form-check-label" htmlFor={`daily-${t.id}`}>
                  {t.title}
                </label>
              </div>
              {t.points ? <span className="badge bg-light text-dark">+{t.points} pts</span> : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/*********************\n * Step 4: Weekly Challenge
 *********************/
const WeeklyChallenge: React.FC<{ challenge: Challenge; onJoin: () => void }> = ({ challenge, onJoin }) => {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body d-flex flex-column gap-2">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0">Weekly Challenge</h6>
          {!challenge.joined ? (
            <button className="btn btn-sm btn-outline-primary" onClick={onJoin}>Join</button>
          ) : (
            <span className="badge bg-primary">Joined</span>
          )}
        </div>
        <div className="fw-semibold">{challenge.title}</div>
        <div className="progress" style={{ height: 8 }}>
          <div className="progress-bar" style={{ width: `${challenge.progress}%` }} />
        </div>
      </div>
    </div>
  );
};

/*********************\n * Step 2: Task Assignment
 *********************/
const TaskAssignment: React.FC<{
  users: UserProfile[];
  onAssign: (task: Task) => void;
}> = ({ users, onAssign }) => {
  const [title, setTitle] = useState("");
  const [assigneeId, setAssigneeId] = useState(users[0]?.id || "");
  const [due, setDue] = useState("");

  const submit = () => {
    if (!title.trim()) return;
    onAssign({ id: uid(), title, assigneeId, due, points: 10, done: false });
    setTitle("");
    setDue("");
  };

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h6 className="mb-3">Assign Task</h6>
        <div className="row g-2">
          <div className="col-md-6">
            <input className="form-control" placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="col-md-3">
            <select className="form-select" value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)}>
              {users.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <input type="date" className="form-control" value={due} onChange={(e) => setDue(e.target.value)} />
          </div>
        </div>
        <div className="text-end mt-2">
          <button className="btn btn-primary" onClick={submit}>Assign</button>
        </div>
      </div>
    </div>
  );
};

/*********************\n * Step 5: Leaderboard
 *********************/
const Leaderboard: React.FC<{ users: UserProfile[] }> = ({ users }) => {
  const sorted = [...users].sort((a, b) => b.coins - a.coins).slice(0, 5);
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h6 className="mb-3">Leaderboard</h6>
        <ol className="list-group list-group-numbered list-group-flush">
          {sorted.map((u) => (
            <li key={u.id} className="list-group-item d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <img src={u.avatarUrl || `https://i.pravatar.cc/60?u=${u.id}`} className="rounded-circle" width={32} height={32} />
                <div>
                  <div className="fw-semibold">{u.name}</div>
                  <small className="text-muted">{u.department}</small>
                </div>
              </div>
              <span className="badge bg-warning text-dark">{u.coins} coins</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

/*********************\n * Steps 6–8: Notifications
 *********************/
const Notifications: React.FC<{ items: NotificationItem[]; title: string }> = ({ items, title }) => (
  <div className="card shadow-sm mb-3">
    <div className="card-body">
      <h6 className="mb-2">{title}</h6>
      <div className="list-group list-group-flush">
        {items.map((n) => (
          <div key={n.id} className={`list-group-item d-flex justify-content-between align-items-start ${n.unread ? "bg-light" : ""}`}>
            <div>
              <div className="fw-semibold">{n.title}</div>
              <small className="text-muted">{n.time}</small>
            </div>
            {n.unread && <span className="badge bg-primary">New</span>}
          </div>
        ))}
      </div>
    </div>
  </div>
);

/*********************\n * Step 9: Prayer Requests
 *********************/
const PrayerRequests: React.FC<{ items: PrayerRequest[]; onAdd: (text: string) => void }> = ({ items, onAdd }) => {
  const [text, setText] = useState("");
  const submit = () => { if (!text.trim()) return; onAdd(text.trim()); setText(""); };

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h6 className="mb-2">Prayer Requests</h6>
        <div className="d-flex gap-2 mb-2">
          <input className="form-control" placeholder="Share a request..." value={text} onChange={(e) => setText(e.target.value)} />
          <button className="btn btn-outline-primary" onClick={submit}>Send</button>
        </div>
        <div className="list-group list-group-flush" style={{ maxHeight: 180, overflow: "auto" }}>
          {items.map((p) => (
            <div key={p.id} className="list-group-item">
              <div className="fw-semibold">{new Date(p.date).toLocaleDateString()}</div>
              <div>{p.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/*********************\n * Step10: Bible Study Progress
 *********************/
const BibleStudyProgress: React.FC<{ plans: StudyPlan[] }> = ({ plans }) => (
  <div className="card shadow-sm mb-3">
    <div className="card-body">
      <h6 className="mb-3">Bible Study Progress</h6>
      {plans.map((p) => (
        <div key={p.id} className="mb-2">
          <div className="d-flex justify-content-between">
            <div className="fw-semibold">{p.name}</div>
            <small className="text-muted">{p.progress}%</small>
          </div>
          <div className="progress" style={{ height: 6 }}>
            <div className="progress-bar" style={{ width: `${p.progress}%` }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/*********************\n * Step12: Coin Store
 *********************/
const CoinStore: React.FC<{
  items: StoreItem[];
  coins: number;
  onBuy: (id: string) => void;
}> = ({ items, coins, onBuy }) => (
  <div className="card shadow-sm mb-3">
    <div className="card-body">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">Coin Store</h6>
        <span className="badge bg-warning text-dark">Balance: {coins}</span>
      </div>
      <div className="row g-2">
        {items.map((i) => (
          <div className="col-6" key={i.id}>
            <div className="border rounded p-2 d-flex justify-content-between align-items-center">
              <div>
                <div className="fw-semibold">{i.name}</div>
                <small className="text-muted">{i.cost} coins</small>
              </div>
              <button className="btn btn-sm btn-outline-primary" disabled={!!i.owned || coins < i.cost} onClick={() => onBuy(i.id)}>
                {i.owned ? "Owned" : coins < i.cost ? "Insufficient" : "Buy"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/*********************\n * Step15: Event Calendar (simple)
 *********************/
const EventCalendar: React.FC<{ month: number; year: number; events: EventItem[] }> = ({ month, year, events }) => {
  // Build a simple month grid
  const first = new Date(year, month, 1);
  const startDay = first.getDay(); // 0-6
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const grid: (number | null)[] = Array(startDay).fill(null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );
  while (grid.length % 7 !== 0) grid.push(null);

  const key = (d: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0">Event Calendar</h6>
          <small className="text-muted">{monthNames[month]} {year}</small>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered mb-2 align-middle text-center">
            <thead className="table-light">
              <tr>
                {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => <th key={d} className="small">{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: grid.length / 7 }, (_, r) => (
                <tr key={r}>
                  {grid.slice(r * 7, r * 7 + 7).map((d, c) => (
                    <td key={c} style={{ height: 60 }} className="position-relative">
                      {d && (
                        <>
                          <div className="small text-muted text-start">{d}</div>
                          <div className="small text-start">
                            {events.filter((e) => e.date === key(d)).slice(0,2).map((e) => (
                              <div key={e.id} className="badge bg-primary-subtle text-primary d-block text-truncate mb-1">{e.title}</div>
                            ))}
                          </div>
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="small text-muted">*Showing up to 2 events per day</div>
      </div>
    </div>
  );
};

/*********************\n * Step16: Private Messaging
 *********************/
const PrivateMessaging: React.FC<{ messages: Message[]; onSend: (text: string) => void }> = ({ messages, onSend }) => {
  const [text, setText] = useState("");
  const submit = () => { if (!text.trim()) return; onSend(text.trim()); setText(""); };

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body d-flex flex-column" style={{ height: 300 }}>
        <h6 className="mb-2">Private Messaging</h6>
        <div className="border rounded p-2 flex-grow-1 mb-2 overflow-auto">
          {messages.map((m) => (
            <div key={m.id} className="mb-2">
              <div className="small text-muted">{m.from} • {m.time}</div>
              <div>{m.text}</div>
            </div>
          ))}
        </div>
        <div className="input-group">
          <input className="form-control" placeholder="Type a message" value={text} onChange={(e) => setText(e.target.value)} />
          <button className="btn btn-primary" onClick={submit}>Send</button>
        </div>
      </div>
    </div>
  );
};

/*********************\n * Step17: Analytics for Leaders
 *********************/
const LeaderAnalytics: React.FC<{ stats: AnalyticsStat[] }> = ({ stats }) => (
  <div className="card shadow-sm mb-3">
    <div className="card-body">
      <h6 className="mb-3">Analytics</h6>
      <div className="row g-3">
        {stats.map((s) => (
          <div className="col-6 col-md-3" key={s.id}>
            <div className="border rounded p-2 h-100">
              <div className="small text-muted">{s.label}</div>
              <div className="fs-5 fw-bold">{s.value}</div>
              <div className="progress mt-1" style={{ height: 6 }}>
                <div className="progress-bar" style={{ width: `${Math.min(Math.abs(s.trend ?? 0), 100)}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/*********************\n * Step18: Group Challenges
 *********************/
const GroupChallenges: React.FC<{ items: Challenge[]; onJoin: (id: string) => void }> = ({ items, onJoin }) => (
  <div className="card shadow-sm mb-3">
    <div className="card-body">
      <h6 className="mb-2">Group Challenges</h6>
      <div className="row g-2">
        {items.map((c) => (
          <div className="col-md-6" key={c.id}>
            <div className="border rounded p-2 h-100 d-flex flex-column">
              <div className="fw-semibold mb-1">{c.title}</div>
              <div className="progress mb-2" style={{ height: 6 }}>
                <div className="progress-bar" style={{ width: `${c.progress}%` }} />
              </div>
              <div className="mt-auto text-end">
                <button className="btn btn-sm btn-outline-primary" disabled={c.joined} onClick={() => onJoin(c.id)}>
                  {c.joined ? "Joined" : "Join"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/*********************\n * Step19: Custom Notifications (settings)
 *********************/
const NotificationSettings: React.FC<{
  settings: { [k: string]: boolean };
  onToggle: (key: string) => void;
}> = ({ settings, onToggle }) => (
  <div className="card shadow-sm mb-3">
    <div className="card-body">
      <h6 className="mb-2">Notification Preferences</h6>
      {Object.keys(settings).map((k) => (
        <div key={k} className="form-check form-switch">
          <input className="form-check-input" type="checkbox" id={`notif-${k}`} checked={settings[k]} onChange={() => onToggle(k)} />
          <label className="form-check-label" htmlFor={`notif-${k}`}>{k}</label>
        </div>
      ))}
    </div>
  </div>
);

/*********************\n * Top Info Strip (KPIs)
 *********************/
const KPIStrip: React.FC<{ profile: UserProfile; dailyDone: number; dailyTotal: number }> = ({ profile, dailyDone, dailyTotal }) => (
  <div className="row g-3 mb-3">
    <div className="col-md-3">
      <div className="card shadow-sm h-100">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <div className="small text-muted">Coins</div>
            <div className="fs-4 fw-bold">{profile.coins}</div>
          </div>
          <span className="badge bg-warning text-dark">★</span>
        </div>
      </div>
    </div>
    <div className="col-md-3">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <div className="small text-muted">XP</div>
          <div className="fs-4 fw-bold">{profile.xp}</div>
          <div className="progress mt-2" style={{ height: 6 }}>
            <div className="progress-bar" style={{ width: `${Math.min(profile.xp % 100, 100)}%` }} />
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-3">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <div className="small text-muted">Daily Tasks</div>
          <div className="fs-4 fw-bold">{dailyDone}/{dailyTotal}</div>
        </div>
      </div>
    </div>
    <div className="col-md-3">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <div className="small text-muted">Streak</div>
          <div className="fs-4 fw-bold">7 days</div>
        </div>
      </div>
    </div>
  </div>
);

/*********************\n * Root Dashboard Page
 *********************/
const mockUsers: UserProfile[] = [
  { id: "u1", name: "Tomiwa", position: "Lead Dev", level: "400L", department: "Media", gender: "Male", coins: 320, xp: 45, badges: ["Early Bird","Top Giver"] },
  { id: "u2", name: "Grace", position: "Prayer Coord.", level: "300L", department: "Prayer", gender: "Female", coins: 420, xp: 80, badges: ["Prayer Warrior"] },
  { id: "u3", name: "Daniel", position: "Usher", level: "200L", department: "Ushering", gender: "Male", coins: 210, xp: 20, badges: [] },
];

export default function Dashboard() {
  const [users, setUsers] = useState<UserProfile[]>(mockUsers);
  const [currentId, setCurrentId] = useState<string>("u1");
  const profile = users.find((u) => u.id === currentId)!;

  const [daily, setDaily] = useState<Task[]>([
    { id: uid(), title: "Morning devotion (15m)", done: false, points: 5 },
    { id: uid(), title: "Bible reading: John 3", done: true, points: 10 },
    { id: uid(), title: "Pray for a friend", done: false, points: 5 },
  ]);

  const [challenge, setChallenge] = useState<Challenge>({ id: uid(), title: "Invite 3 classmates to midweek service", progress: 40, joined: true });

  const [postNotifs] = useState<NotificationItem[]>([
    { id: uid(), type: "post", title: "New blog: Faith & Finals", time: "2h ago", unread: true },
    { id: uid(), type: "post", title: "Event: Worship Night", time: "1d ago" },
  ]);

  const [commentNotifs] = useState<NotificationItem[]>([
    { id: uid(), type: "comment", title: "Grace commented on your post", time: "10m ago", unread: true },
    { id: uid(), type: "comment", title: "Daniel replied in #dev-team", time: "3h ago" },
  ]);

  const [prayers, setPrayers] = useState<PrayerRequest[]>([
    { id: uid(), userId: currentId, text: "Strength for exams", date: new Date().toISOString() },
  ]);

  const [plans] = useState<StudyPlan[]>([
    { id: uid(), name: "New Testament (90 days)", progress: 65 },
    { id: uid(), name: "Psalms (30 days)", progress: 30 },
  ]);

  const [store, setStore] = useState<StoreItem[]>([
    { id: uid(), name: "Cafe Voucher", cost: 200 },
    { id: uid(), name: "Church T-shirt", cost: 400 },
    { id: uid(), name: "Bible Study Journal", cost: 150 },
    { id: uid(), name: "Event Priority Seat", cost: 300 },
  ]);

  const today = new Date();
  const [events] = useState<EventItem[]>([
    { id: uid(), date: `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`, title: "Prayer Meeting" },
    { id: uid(), date: `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()+2).padStart(2,"0")}`, title: "Choir Rehearsal" },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    { id: uid(), from: "Grace", text: "Hey, can you check the slides?", time: "09:12" },
    { id: uid(), from: "You", text: "Sure, sending shortly.", time: "09:15" },
  ]);

  const [groupChallenges, setGroupChallenges] = useState<Challenge[]>([
    { id: uid(), title: "Bible Trivia Week", progress: 20 },
    { id: uid(), title: "Outreach Saturday", progress: 55, joined: true },
  ]);

  const [analytics] = useState<AnalyticsStat[]>([
    { id: uid(), label: "Active Today", value: 42, trend: 70 },
    { id: uid(), label: "New Posts", value: 12, trend: 60 },
    { id: uid(), label: "Prayer Req.", value: 8, trend: 40 },
    { id: uid(), label: "Tasks Done", value: 75, trend: 75 },
  ]);

  const [notifPrefs, setNotifPrefs] = useState({
    "New Post": true,
    "Comments": true,
    "Mentions": true,
    "Weekly Summary": false,
  });

  // Handlers
  const updateProfile = (patch: Partial<UserProfile>) => {
    setUsers((us) => us.map((u) => (u.id === profile.id ? { ...u, ...patch } : u)));
  };

  const toggleDaily = (id: string) => {
    setDaily((ds) => ds.map((d) => (d.id === id ? { ...d, done: !d.done } : d)));
  };

  const assignTask = (task: Task) => {
    // Demo: add as a new daily item for the assignee if it's you
    if (task.assigneeId === profile.id) setDaily((d) => [{ ...task }, ...d]);
    // Otherwise, just console log (design only)
    console.log("Assigned", task);
  };

  const buyItem = (id: string) => {
    const item = store.find((s) => s.id === id);
    if (!item || item.cost > profile.coins) return;
    setStore((st) => st.map((s) => (s.id === id ? { ...s, owned: true } : s)));
    updateProfile({ coins: profile.coins - item.cost });
  };

  const gainXP = (n: number) => updateProfile({ xp: profile.xp + n });

  const addPrayer = (text: string) => setPrayers((p) => [{ id: uid(), userId: profile.id, text, date: new Date().toISOString() }, ...p]);

  const sendMessage = (text: string) => setMessages((m) => [...m, { id: uid(), from: "You", text, time: new Date().toLocaleTimeString().slice(0,5) }]);

  const joinGroup = (id: string) => setGroupChallenges((gs) => gs.map((g) => (g.id === id ? { ...g, joined: true } : g)));

  const togglePref = (k: string) => setNotifPrefs((p) => ({ ...p, [k]: !p[k as keyof typeof p] }));

  const dailyDone = daily.filter((t) => t.done).length;

  return (
    <div className="container-fluid p-3 p-md-4">
      {/* Header */}
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
        <div>
          <h4 className="mb-0">Dashboard</h4>
          <small className="text-muted">Welcome back, {profile.name}</small>
        </div>
        <div className="d-flex gap-2">
          <select className="form-select" style={{ width: 180 }} value={currentId} onChange={(e) => setCurrentId(e.target.value)}>
            {users.map((u) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
          <button className="btn btn-outline-secondary">Export</button>
        </div>
      </div>

      {/* KPIs */}
      <KPIStrip profile={profile} dailyDone={dailyDone} dailyTotal={daily.length} />

      <div className="row g-3">
        {/* Left Column */}
        <div className="col-lg-3">
          <ProfileUpdate profile={profile} onSave={updateProfile} />
          <ScriptureOfTheDay />
          <ProfileBadges badges={profile.badges} />
          <LevelUpSystem profile={profile} onGainXP={gainXP} />
        </div>

        {/* Middle Column */}
        <div className="col-lg-6">
          <TaskAssignment users={users} onAssign={assignTask} />
          <DailyTasks items={daily} onToggle={toggleDaily} />
          <WeeklyChallenge challenge={challenge} onJoin={() => setChallenge((c) => ({ ...c, joined: true }))} />
          <BibleStudyProgress plans={plans} />
          <EventCalendar month={today.getMonth()} year={today.getFullYear()} events={events} />
          <GroupChallenges items={groupChallenges} onJoin={joinGroup} />
          <LeaderAnalytics stats={analytics} />
        </div>

        {/* Right Column */}
        <div className="col-lg-3">
          <Leaderboard users={users} />
          <Notifications items={postNotifs} title="New Post Notifications" />
          <Notifications items={commentNotifs} title="Comment Notifications" />
          <PrayerRequests items={prayers} onAdd={addPrayer} />
          <CoinStore items={store} coins={profile.coins} onBuy={buyItem} />
          <PrivateMessaging messages={messages} onSend={sendMessage} />
          <NotificationSettings settings={notifPrefs} onToggle={togglePref} />
        </div>
      </div>
    </div>
  );
}
