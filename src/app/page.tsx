"use client";

import { useMemo, useState, type FormEvent, type ReactNode, type ElementType } from "react";
import {
  Activity, ArrowDownRight, ArrowUpRight, Bell, Building2, Check, ChevronDown,
  CircleHelp, Command, Filter, Globe2, Inbox, LayoutDashboard, Mail, Menu,
  MessageSquare, Plus, Search, Send, Settings, Sparkles, Target, Users, X
} from "lucide-react";
import { demoActivities, demoProspects } from "@/lib/demo-data";

type Prospect = typeof demoProspects[number];

const navigation = [
  { title: "Workspace", links: [{ label: "Overview", icon: LayoutDashboard }, { label: "Prospects", icon: Users }, { label: "Campaigns", icon: Send }, { label: "Inbox", icon: Inbox }] },
  { title: "Intelligence", links: [{ label: "AI Research", icon: Sparkles }, { label: "Ideal customer profile", icon: Target }] },
  { title: "Manage", links: [{ label: "Reports", icon: Activity }, { label: "Settings", icon: Settings }] }
];

function Badge({ children, tone = "gray" }: { children: ReactNode; tone?: string }) {
  const styles: Record<string, string> = {
    gray: "border-slate-700 bg-slate-800/70 text-slate-300",
    green: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    violet: "border-violet-400/20 bg-violet-400/10 text-violet-200",
    blue: "border-sky-400/20 bg-sky-400/10 text-sky-200"
  };
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${styles[tone] ?? styles.gray}`}>{children}</span>;
}

function Metric({ label, value, change, icon: Icon, tint }: { label: string; value: string; change: string; icon: ElementType; tint: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#101622] p-5">
      <div className="flex items-center justify-between"><span className="text-sm text-slate-400">{label}</span><span className={`rounded-lg p-2 ${tint}`}><Icon size={17}/></span></div>
      <div className="mt-4 flex items-end justify-between"><span className="text-3xl font-semibold tracking-tight">{value}</span><span className="mb-1 flex items-center gap-1 text-xs text-emerald-300"><ArrowUpRight size={13}/>{change}</span></div>
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState("Overview");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All status");
  const [prospects, setProspects] = useState<Prospect[]>(demoProspects);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [person, setPerson] = useState("");
  const [email, setEmail] = useState("");

  const filtered = useMemo(() => prospects.filter((p) =>
    [p.company, p.person, p.industry, p.email].join(" ").toLowerCase().includes(query.toLowerCase()) &&
    (status === "All status" || p.status === status)
  ), [prospects, query, status]);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2500);
  }

  function addProspect(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!company.trim()) return;
    const created = {
      id: crypto.randomUUID(), company: company.trim(), person: person.trim() || "New contact",
      title: "Not set", industry: "Unclassified", region: "Unassigned", score: 0,
      status: "New", email: email.trim() || "Not added", summary: "Manually added demo prospect."
    } as Prospect;
    setProspects((items) => [created, ...items]);
    setModalOpen(false);
    setCompany(""); setPerson(""); setEmail("");
    notify("Prospect added to demo workspace");
  }

  return (
    <div className="min-h-screen bg-[#080b12] text-slate-100">
      <aside className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-slate-800 bg-[#0c111b] transition-transform lg:translate-x-0 ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-[76px] items-center gap-3 border-b border-slate-800 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500 text-white"><Command size={19}/></div>
          <div><div className="text-[15px] font-semibold tracking-tight">prospect<span className="text-violet-400">.</span></div><div className="text-[10px] uppercase tracking-[.2em] text-slate-500">VinceAI workspace</div></div>
          <button type="button" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation" className="ml-auto text-slate-500 lg:hidden"><X size={18}/></button>
        </div>
        <div className="px-4 pt-5">
          <button type="button" className="flex w-full items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/70 p-3 text-left">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/15 text-sky-300"><Building2 size={16}/></div>
            <div className="min-w-0 flex-1"><div className="truncate text-xs font-medium">VinceAI Growth Team</div><div className="mt-0.5 text-[10px] text-slate-500">Demo workspace</div></div><ChevronDown size={14} className="text-slate-500"/>
          </button>
        </div>
        <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-7">
          {navigation.map((group) => <div key={group.title}>
            <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[.18em] text-slate-600">{group.title}</div>
            <div className="space-y-1">{group.links.map(({ label, icon: Icon }) => (
              <button type="button" key={label} onClick={() => { setActive(label); setMobileNavOpen(false); }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] transition ${active === label ? "bg-violet-500/12 text-violet-200 ring-1 ring-violet-500/20" : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"}`}>
                <Icon size={16}/>{label}{label === "Inbox" && <span className="ml-auto rounded-md bg-violet-500/15 px-1.5 py-0.5 text-[10px] text-violet-200">3</span>}
              </button>
            ))}</div>
          </div>)}
        </nav>
        <div className="border-t border-slate-800 p-4">
          <div className="rounded-xl bg-gradient-to-br from-violet-500/15 to-sky-500/5 p-4">
            <div className="flex items-center gap-2 text-xs font-medium"><Sparkles size={14} className="text-violet-300"/> AI credits</div>
            <div className="mt-3 flex items-end justify-between"><span className="text-2xl font-semibold">120</span><span className="text-[10px] text-slate-500">demo balance</span></div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full w-3/5 rounded-full bg-violet-400"/></div>
            <div className="mt-3 text-[11px] text-violet-300">Usage preview</div>
          </div>
          <div className="mt-4 flex items-center gap-3 px-1"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-[11px] font-semibold">SH</div><div className="min-w-0 flex-1"><div className="text-xs font-medium">Workspace owner</div><div className="text-[10px] text-slate-500">Demo account</div></div><Settings size={15} className="text-slate-500"/></div>
        </div>
      </aside>

      {mobileNavOpen && <button type="button" aria-label="Close navigation overlay" onClick={() => setMobileNavOpen(false)} className="fixed inset-0 z-20 bg-black/60 lg:hidden"/>}

      <main className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-10 flex h-[76px] items-center justify-between border-b border-slate-800/80 bg-[#080b12]/90 px-5 backdrop-blur-xl md:px-8">
          <div className="flex items-center gap-3"><button type="button" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)} className="text-slate-400 lg:hidden"><Menu size={19}/></button><div><div className="text-sm font-medium">{active}</div><div className="mt-0.5 text-[11px] text-slate-500">Workspace <span className="mx-1 text-slate-700">/</span>{active}</div></div></div>
          <div className="flex items-center gap-2"><button type="button" aria-label="Help" className="hidden rounded-lg border border-slate-800 p-2 text-slate-400 hover:text-white sm:block"><CircleHelp size={16}/></button><button type="button" aria-label="Notifications" className="relative rounded-lg border border-slate-800 p-2 text-slate-400"><Bell size={16}/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-400"/></button><div className="mx-1 hidden h-7 border-l border-slate-800 sm:block"/><div className="hidden text-right sm:block"><div className="text-xs font-medium">Workspace owner</div><div className="text-[10px] text-slate-500">Administrator preview</div></div><div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-blue-500 text-[11px] font-bold text-white">SH</div></div>
        </header>

        <div className="mx-auto max-w-[1500px] space-y-7 p-5 md:p-8">
          <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div><div className="flex items-center gap-2"><Badge tone="green"><span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"/> Demo workspace</Badge><span className="text-[11px] text-slate-500">{new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span></div><h1 className="mt-3 text-2xl font-semibold tracking-tight md:text-[28px]">Outbound command centre</h1><p className="mt-1.5 text-sm text-slate-400">Monitor prospect quality, outreach activity and pipeline movement.</p></div>
            <div className="flex gap-2"><button type="button" onClick={() => setActive("AI Research")} className="flex items-center gap-2 rounded-lg border border-slate-700 px-3.5 py-2.5 text-xs font-medium text-slate-200 hover:bg-slate-800"><Sparkles size={14}/> AI research</button><button type="button" onClick={() => setModalOpen(true)} className="flex items-center gap-2 rounded-lg bg-violet-500 px-3.5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-500/10 hover:bg-violet-400"><Plus size={15}/> Add prospect</button></div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Metric label="Total prospects" value={String(prospects.length + 1234)} change="12.8%" icon={Users} tint="bg-violet-500/10 text-violet-300"/>
            <Metric label="Qualified leads" value="386" change="8.4%" icon={Target} tint="bg-emerald-500/10 text-emerald-300"/>
            <Metric label="Emails delivered" value="2,841" change="18.2%" icon={Mail} tint="bg-sky-500/10 text-sky-300"/>
            <Metric label="Meetings booked" value="42" change="6.1%" icon={Activity} tint="bg-amber-500/10 text-amber-200"/>
          </section>

          <section className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
            <div className="rounded-xl border border-slate-800 bg-[#101622] p-5 md:p-6">
              <div className="flex items-start justify-between"><div><h2 className="text-sm font-semibold">Pipeline performance</h2><p className="mt-1 text-xs text-slate-500">Outreach activity · Sample trend</p></div><Badge>Last 30 days</Badge></div>
              <div className="mt-6 grid grid-cols-3 gap-3"><div><div className="text-[11px] text-slate-500">Open opportunities</div><div className="mt-1 text-xl font-semibold">128</div><div className="mt-1 text-[10px] text-emerald-300">+14 this month</div></div><div><div className="text-[11px] text-slate-500">Reply rate</div><div className="mt-1 text-xl font-semibold">8.6%</div><div className="mt-1 text-[10px] text-emerald-300">+1.2 pts</div></div><div><div className="text-[11px] text-slate-500">Meeting rate</div><div className="mt-1 text-xl font-semibold">2.4%</div><div className="mt-1 text-[10px] text-emerald-300">+0.3 pts</div></div></div>
              <div className="mt-7 flex h-40 items-end gap-2 sm:gap-3">{[35,48,42,62,55,72,58,79,67,91,74,84,65,96,77,88,73,100,80,93,70,87,76,97,83,91,74,100].map((height,index)=><div key={index} className="group flex h-full flex-1 items-end"><div style={{height:`${height}%`}} className={`w-full rounded-t-[3px] transition group-hover:bg-violet-300 ${index===27?"bg-violet-400":"bg-violet-500/35"}`}/></div>)}</div>
              <div className="mt-3 flex justify-between text-[10px] text-slate-600"><span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span></div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#101622] p-5 md:p-6">
              <div className="flex items-center justify-between"><div><h2 className="text-sm font-semibold">Recent activity</h2><p className="mt-1 text-xs text-slate-500">Latest sample updates</p></div><button type="button" onClick={() => setActive("Reports")} className="text-[11px] text-violet-300">View reports</button></div>
              <div className="mt-5 space-y-5">{demoActivities.map((item,index)=><div key={item.id} className="flex gap-3"><div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${index===0?"bg-emerald-500/10 text-emerald-300":"bg-violet-500/10 text-violet-300"}`}>{index===0?<MessageSquare size={15}/>:index===1?<Check size={15}/>:index===2?<Send size={15}/>:<Sparkles size={15}/>}</div><div className="min-w-0 flex-1"><div className="text-xs font-medium">{item.title}</div><div className="mt-1 truncate text-[11px] text-slate-500">{item.detail}</div><div className="mt-1.5 text-[10px] text-slate-600">{item.time}</div></div></div>)}</div>
            </div>
          </section>

          <section className="overflow-hidden rounded-xl border border-slate-800 bg-[#101622]">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-800 p-5 md:flex-row md:items-center md:px-6"><div><h2 className="text-sm font-semibold">Priority prospects</h2><p className="mt-1 text-xs text-slate-500">Sample opportunities ranked by fit score</p></div><div className="flex flex-wrap gap-2"><div className="flex items-center gap-2 rounded-lg border border-slate-800 px-3 py-2"><Search size={14} className="text-slate-500"/><input aria-label="Search prospects" value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Search prospects..." className="w-36 bg-transparent text-xs outline-none placeholder:text-slate-600"/></div><select aria-label="Filter by status" value={status} onChange={(event)=>setStatus(event.target.value)} className="rounded-lg border border-slate-800 bg-[#0c111b] px-3 py-2 text-xs text-slate-300"><option>All status</option>{["New","Researching","Qualified","Contacted","Replied"].map((item)=><option key={item}>{item}</option>)}</select><button type="button" aria-label="Filter options" className="rounded-lg border border-slate-800 p-2 text-slate-400"><Filter size={14}/></button></div></div>
            <div className="overflow-x-auto"><table className="w-full min-w-[780px] text-left"><thead className="bg-[#0c111b]/70 text-[10px] uppercase tracking-[.13em] text-slate-500"><tr><th className="px-6 py-3 font-medium">Company / Contact</th><th className="px-4 py-3 font-medium">Industry</th><th className="px-4 py-3 font-medium">Region</th><th className="px-4 py-3 font-medium">Fit score</th><th className="px-4 py-3 font-medium">Status</th><th className="px-6 py-3 text-right font-medium">Action</th></tr></thead><tbody className="divide-y divide-slate-800/80">{filtered.map((p)=><tr key={p.id} className="transition hover:bg-slate-800/20"><td className="px-6 py-4"><div className="text-xs font-medium">{p.company}</div><div className="mt-1 text-[11px] text-slate-500">{p.person} · {p.title}</div></td><td className="px-4 py-4 text-xs text-slate-400">{p.industry}</td><td className="px-4 py-4 text-xs text-slate-400">{p.region}</td><td className="px-4 py-4"><div className="flex items-center gap-2"><div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-800"><div style={{width:`${p.score}%`}} className="h-full rounded-full bg-violet-400"/></div><span className="text-xs tabular-nums text-slate-300">{p.score}</span></div></td><td className="px-4 py-4"><Badge tone={p.status==="Qualified"?"green":p.status==="Replied"?"blue":p.status==="Contacted"?"violet":"gray"}>{p.status}</Badge></td><td className="px-6 py-4 text-right"><button type="button" onClick={()=>notify(`${p.company} record is sample data`)} className="text-xs font-medium text-violet-300 hover:text-violet-200">View profile →</button></td></tr>)}</tbody></table>{filtered.length===0&&<div className="p-10 text-center text-xs text-slate-500">No prospects match your filters.</div>}</div>
            <div className="flex items-center justify-between border-t border-slate-800 px-6 py-3"><span className="text-[10px] text-slate-500">Showing {filtered.length} demo records</span><button type="button" onClick={()=>setActive("Prospects")} className="text-[11px] font-medium text-violet-300">View prospect database →</button></div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-[#101622] p-5"><div className="flex items-center gap-2 text-violet-200"><Sparkles size={16}/><span className="text-xs font-semibold">AI prospect intelligence</span></div><h3 className="mt-3 text-base font-semibold">Turn account context into relevant conversations.</h3><p className="mt-1.5 max-w-lg text-xs leading-5 text-slate-400">Research a target account, identify relevant business context and create a tailored first-touch draft for human review.</p><button type="button" onClick={()=>setActive("AI Research")} className="mt-4 rounded-lg bg-violet-500 px-3.5 py-2 text-xs font-semibold text-white">Start research <ArrowDownRight size={14} className="ml-1 inline"/></button></div>
            <div className="rounded-xl border border-slate-800 bg-[#101622] p-5"><div className="flex items-center gap-2 text-sky-200"><Globe2 size={16}/><span className="text-xs font-semibold">GCC market workspace</span></div><h3 className="mt-3 text-base font-semibold">Build a focused regional pipeline.</h3><p className="mt-1.5 text-xs leading-5 text-slate-400">Organise accounts across UAE, Saudi Arabia and wider MENA using fit criteria and documented sourcing.</p><button type="button" onClick={()=>setActive("Ideal customer profile")} className="mt-4 text-xs font-semibold text-sky-300">Configure ICP <ArrowDownRight size={14} className="ml-1 inline"/></button></div>
          </section>
          <footer className="flex flex-col justify-between gap-2 border-t border-slate-900 pt-5 text-[10px] text-slate-600 sm:flex-row"><span>© {new Date().getFullYear()} Prospect VinceAI</span><span className="flex gap-4"><span>Privacy-first workflow</span><span>v0.1.0 · Sample data</span></span></footer>
        </div>
      </main>

      {toast && <div role="status" className="fixed bottom-5 right-5 z-50 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-xs shadow-xl">{toast}</div>}
      {modalOpen && <div role="dialog" aria-modal="true" aria-labelledby="add-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"><form onSubmit={addProspect} className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#101622] p-6 shadow-2xl"><div className="flex items-center justify-between"><h2 id="add-title" className="text-base font-semibold">Add prospect</h2><button type="button" onClick={()=>setModalOpen(false)} aria-label="Close dialog" className="text-slate-500"><X size={18}/></button></div><p className="mt-1 text-xs text-slate-500">Add a company to this local demo workspace.</p><label className="mt-5 block text-xs text-slate-300">Company name<input required value={company} onChange={(event)=>setCompany(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-700 bg-[#0b1019] px-3 py-2.5 text-sm outline-none focus:border-violet-400"/></label><label className="mt-4 block text-xs text-slate-300">Contact name<input value={person} onChange={(event)=>setPerson(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-700 bg-[#0b1019] px-3 py-2.5 text-sm outline-none focus:border-violet-400"/></label><label className="mt-4 block text-xs text-slate-300">Work email<input type="email" value={email} onChange={(event)=>setEmail(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-700 bg-[#0b1019] px-3 py-2.5 text-sm outline-none focus:border-violet-400"/></label><div className="mt-6 flex justify-end gap-2"><button type="button" onClick={()=>setModalOpen(false)} className="rounded-lg border border-slate-700 px-4 py-2 text-xs text-slate-300">Cancel</button><button className="rounded-lg bg-violet-500 px-4 py-2 text-xs font-semibold text-white">Add prospect</button></div></form></div>}
    </div>
  );
}
