import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  CalendarDays,
  ChevronDown,
  CircleDot,
  Database,
  Filter,
  Gauge,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Play,
  Plus,
  RefreshCw,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Sun,
  Trophy,
  UserRound,
  Users,
  X,
  Zap,
} from "lucide-react";

type PageKey = "overview" | "live" | "players" | "sql" | "data";

type Player = {
  name: string;
  role: string;
  team: string;
  runs: string;
  average: string;
  trend: string;
  trendValue: string;
};

const navItems: { key: PageKey; label: string; icon: typeof LayoutDashboard; count?: string }[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "live", label: "Live center", icon: Activity, count: "04" },
  { key: "players", label: "Player stats", icon: Trophy },
  { key: "sql", label: "SQL lab", icon: Database, count: "25" },
  { key: "data", label: "Data manager", icon: Users },
];

const matches = [
  {
    id: "01",
    format: "T20 · Match 18",
    title: "Asia Premier League",
    teams: ["Mumbai Falcons", "Delhi Strikers"],
    scores: ["184/6", "72/2"],
    overs: ["20.0", "8.4"],
    status: "LIVE",
    statusTone: "live",
    note: "Delhi need 113 off 68",
    accent: "lime",
  },
  {
    id: "02",
    format: "ODI · 2nd innings",
    title: "Australia tour of England",
    teams: ["England", "Australia"],
    scores: ["251/9", "198/4"],
    overs: ["50.0", "38.1"],
    status: "LIVE",
    statusTone: "live",
    note: "Australia need 54 off 71",
    accent: "blue",
  },
  {
    id: "03",
    format: "T20 · Final",
    title: "Caribbean Premier League",
    teams: ["Trinbago Knight Riders", "Barbados Royals"],
    scores: ["146/7", "147/5"],
    overs: ["20.0", "19.2"],
    status: "RESULT",
    statusTone: "done",
    note: "Barbados won by 5 wickets",
    accent: "purple",
  },
];

const players: Player[] = [
  { name: "Rohit Sharma", role: "Opening batter", team: "India", runs: "842", average: "52.6", trend: "up", trendValue: "+18.4%" },
  { name: "Jasprit Bumrah", role: "Fast bowler", team: "India", runs: "28", average: "14.2", trend: "up", trendValue: "+12.1%" },
  { name: "Harry Brook", role: "Middle-order batter", team: "England", runs: "778", average: "48.6", trend: "up", trendValue: "+9.7%" },
  { name: "Rashid Khan", role: "Spin all-rounder", team: "Afghanistan", runs: "34", average: "16.8", trend: "down", trendValue: "-3.2%" },
];

const queryGroups = [
  { label: "Beginner", range: "01—08", color: "lime" },
  { label: "Intermediate", range: "09—16", color: "blue" },
  { label: "Advanced", range: "17—25", color: "purple" },
];

const sqlQueries = [
  "Find all players who represent India",
  "Matches played in the last 30 days",
  "Top 10 highest run scorers in ODI",
  "Venues with seating capacity over 50,000",
  "Matches won by each team",
  "Players by playing role",
  "Highest individual score by format",
  "Series started in the year 2024",
  "All-rounders with 1000+ runs and 50+ wickets",
  "Last 20 completed matches",
  "Performance across different formats",
  "Home vs away team performance",
  "Batting partnerships over 100 runs",
  "Bowling performance by venue",
  "Players in close matches",
  "Year-over-year batting performance",
  "Toss win advantage analysis",
  "Most economical limited-overs bowlers",
  "Most consistent batsmen",
  "Matches and batting average by format",
  "Comprehensive player ranking system",
  "Head-to-head match prediction analysis",
  "Recent player form and momentum",
  "Successful batting partnerships",
  "Quarterly performance evolution",
];

function Sparkline({ color = "#c7f36b", bars = false }: { color?: string; bars?: boolean }) {
  if (bars) {
    return (
      <div className="mini-bars" aria-label="Trend bars">
        {[38, 52, 32, 62, 48, 76, 54, 88, 72, 92, 64, 100].map((height, index) => (
          <span key={index} style={{ height: `${height}%`, background: index > 8 ? color : "#334150" }} />
        ))}
      </div>
    );
  }
  return (
    <svg className="sparkline" viewBox="0 0 180 52" role="img" aria-label="Trend line">
      <path d="M2 43 C17 38, 20 31, 34 34 S51 44, 66 29 S80 22, 94 27 S110 35, 122 20 S138 12, 148 18 S165 8, 178 10" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M2 43 C17 38, 20 31, 34 34 S51 44, 66 29 S80 22, 94 27 S110 35, 122 20 S138 12, 148 18 S165 8, 178 10 V52 H2 Z" fill={color} opacity=".08" />
    </svg>
  );
}

function BrandMark() {
  return (
    <div className="brand-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

function Sidebar({ activePage, onNavigate, collapsed, onClose }: { activePage: PageKey; onNavigate: (page: PageKey) => void; collapsed: boolean; onClose: () => void }) {
  return (
    <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>
      <div className="sidebar-topline">
        <div className="brand-lockup">
          <BrandMark />
          <div>
            <div className="brand-name">Cricbuzz</div>
            <div className="brand-subtitle">LIVESTATS <span>///</span></div>
          </div>
        </div>
        <button className="icon-button close-menu" onClick={onClose} aria-label="Close navigation">
          <X size={18} />
        </button>
      </div>

      <div className="workspace-pill">
        <div className="workspace-avatar">AN</div>
        <div className="workspace-copy"><span>Workspace</span><strong>Analytics team</strong></div>
        <ChevronDown size={15} />
      </div>

      <div className="nav-label">Workspace</div>
      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.key} className={`nav-item ${activePage === item.key ? "active" : ""}`} onClick={() => { onNavigate(item.key); onClose(); }}>
              <Icon size={18} strokeWidth={activePage === item.key ? 2.4 : 1.8} />
              <span>{item.label}</span>
              {item.count && <em>{item.count}</em>}
            </button>
          );
        })}
      </nav>

      <div className="nav-label nav-label-spaced">System</div>
      <nav className="main-nav">
        <button className="nav-item" onClick={() => onNavigate("data")}><Settings2 size={18} /><span>Settings</span></button>
        <button className="nav-item" onClick={() => onNavigate("sql")}><ShieldCheck size={18} /><span>API status</span><i className="status-dot" /></button>
      </nav>

      <div className="sidebar-footer">
        <div className="plan-card">
          <div className="plan-icon"><Sparkles size={16} /></div>
          <div><span>Pro workspace</span><strong>2.4k records synced</strong></div>
          <ArrowUpRight size={15} />
        </div>
        <div className="sidebar-user">
          <div className="user-avatar">AK</div>
          <div><strong>Arjun Kapoor</strong><span>Owner</span></div>
          <MoreHorizontal size={17} />
        </div>
      </div>
    </aside>
  );
}

function Topbar({ pageTitle, onMenu, onRefresh, refreshLabel, theme, onToggleTheme, onOpenLive }: { pageTitle: string; onMenu: () => void; onRefresh: () => void; refreshLabel: string; theme: "navy" | "matchday"; onToggleTheme: () => void; onOpenLive: () => void }) {
  return (
    <header className="topbar">
      <div className="topbar-left"><button className="icon-button mobile-menu" onClick={onMenu} aria-label="Open navigation"><Menu size={20} /></button><span className="breadcrumb-muted">Workspace</span><span className="breadcrumb-slash">/</span><strong>{pageTitle}</strong></div>
      <div className="topbar-actions">
        <div className="topbar-search"><Search size={16} /><span>Search anything</span><kbd>⌘ K</kbd></div>
        <button className={`theme-switch ${theme === "matchday" ? "selected" : ""}`} onClick={onToggleTheme} aria-label="Toggle Matchday theme"><Sun size={14} /><span>{theme === "matchday" ? "Matchday" : "Navy"}</span></button>
        {pageTitle !== "Live center" && <button className="live-dashboard-button" onClick={onOpenLive}><span className="live-dashboard-pulse" />Live dashboard</button>}
        <button className="icon-button notification-button" aria-label="Notifications"><Bell size={18} /><i /></button>
        <button className="refresh-button" onClick={onRefresh}><RefreshCw size={15} /><span>{refreshLabel}</span></button>
      </div>
    </header>
  );
}

function StatCard({ label, value, detail, trend, icon: Icon, accent = "lime" }: { label: string; value: string; detail: string; trend: string; icon: typeof Activity; accent?: string }) {
  return (
    <div className={`stat-card accent-${accent}`}>
      <div className="stat-card-header"><span>{label}</span><span className="stat-icon"><Icon size={16} /></span></div>
      <div className="stat-value-row"><strong>{value}</strong><span className="positive-chip"><ArrowUpRight size={12} />{trend}</span></div>
      <div className="stat-card-footer"><span>{detail}</span><span className="live-line" /></div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, action, onAction }: { eyebrow?: string; title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="section-header">
      <div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h2>{title}</h2></div>
      {action && <button className="text-button" onClick={onAction}>{action}<ArrowUpRight size={14} /></button>}
    </div>
  );
}

function MatchRow({ match, onOpen }: { match: typeof matches[number]; onOpen: () => void }) {
  return (
    <button className="match-row" onClick={onOpen}>
      <div className={`match-pulse ${match.statusTone}`}><span /></div>
      <div className="match-meta"><span className={`format-tag ${match.accent}`}>{match.format}</span><strong>{match.title}</strong><span>{match.note}</span></div>
      <div className="match-scores"><div><span>{match.teams[0]}</span><strong>{match.scores[0]}</strong><em>{match.overs[0]} ov</em></div><div><span>{match.teams[1]}</span><strong>{match.scores[1]}</strong><em>{match.overs[1]} ov</em></div></div>
      <div className={`match-status ${match.statusTone}`}>{match.status}</div>
      <ArrowUpRight className="match-arrow" size={16} />
    </button>
  );
}

function TrendChart() {
  return (
    <div className="trend-chart-wrap">
      <div className="chart-y-labels"><span>1.2k</span><span>900</span><span>600</span><span>300</span><span>0</span></div>
      <svg className="trend-chart" viewBox="0 0 720 250" preserveAspectRatio="none" role="img" aria-label="Runs scored trend from April to September">
        <defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#c7f36b" stopOpacity=".22" /><stop offset="100%" stopColor="#c7f36b" stopOpacity="0" /></linearGradient></defs>
        {[24, 74, 124, 174, 224].map((y) => <line key={y} x1="0" y1={y} x2="720" y2={y} stroke="#263342" strokeDasharray="3 7" />)}
        <path d="M0 197 C38 190, 43 160, 86 172 S126 183, 160 135 S206 156, 242 132 S286 96, 323 122 S364 152, 400 103 S454 112, 484 72 S532 89, 566 54 S620 76, 646 35 S692 42, 720 17 V250 H0 Z" fill="url(#chartFill)" />
        <path d="M0 197 C38 190, 43 160, 86 172 S126 183, 160 135 S206 156, 242 132 S286 96, 323 122 S364 152, 400 103 S454 112, 484 72 S532 89, 566 54 S620 76, 646 35 S692 42, 720 17" fill="none" stroke="#c7f36b" strokeWidth="3" strokeLinecap="round" />
        <circle cx="566" cy="54" r="5" fill="#0d131a" stroke="#c7f36b" strokeWidth="3" /><circle cx="720" cy="17" r="5" fill="#c7f36b" />
      </svg>
      <div className="chart-x-labels"><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span></div>
    </div>
  );
}

function Overview({ onNavigate, onOpenMatch }: { onNavigate: (page: PageKey) => void; onOpenMatch: () => void }) {
  return (
    <div className="page-content">
      <div className="page-heading">
        <div><div className="eyebrow">SATURDAY · 12 SEP 2026 <span className="eyebrow-live"><i /> DATA STREAMING</span></div><h1>Cricket, in the <em>moment.</em></h1><p>One workspace for the score, the story, and the signal behind every innings.</p></div>
        <div className="heading-actions"><button className="date-button"><CalendarDays size={16} />12 Sep 2026<ChevronDown size={14} /></button><button className="primary-button" onClick={() => onNavigate("live")}><Play size={14} fill="currentColor" />Open live center</button></div>
      </div>

      <div className="stats-grid">
        <StatCard label="Live matches" value="04" detail="Across 3 formats" trend="+1 today" icon={Activity} />
        <StatCard label="Players tracked" value="2,418" detail="Profiles in database" trend="+8.2%" icon={Users} accent="blue" />
        <StatCard label="Queries run" value="1,284" detail="This workspace" trend="+24.6%" icon={Database} accent="purple" />
        <StatCard label="Data freshness" value="42s" detail="Cricbuzz API sync" trend="healthy" icon={Zap} accent="orange" />
      </div>

      <div className="content-grid content-grid-main">
        <section className="panel live-panel"><SectionHeader eyebrow="LIVE NOW" title="Match center" action="View all matches" onAction={() => onNavigate("live")} /><div className="match-list">{matches.map((match) => <MatchRow key={match.id} match={match} onOpen={onOpenMatch} />)}</div><div className="panel-footer"><span><i className="status-dot" /> Data auto-refreshes every 30 sec</span><button className="text-button" onClick={() => onNavigate("live")}>Scorecards <ArrowUpRight size={14} /></button></div></section>
        <section className="panel momentum-panel"><SectionHeader eyebrow="SIGNAL OF THE DAY" title="Momentum watch" action="Details" onAction={() => onNavigate("players")} /><div className="momentum-main"><div className="momentum-copy"><span>Rohit Sharma</span><strong>+18.4%</strong><p>Batting momentum <b>vs. 10 match avg.</b></p></div><div className="momentum-badge"><Gauge size={16} /><span>HOT</span></div></div><Sparkline /><div className="momentum-divider" /><div className="momentum-split"><div><span>Current form</span><strong>842 <small>runs</small></strong></div><div><span>Strike rate</span><strong>148.6 <small>SR</small></strong></div></div><div className="insight-note"><Sparkles size={14} /><span>Scored 50+ in <strong>4 of last 5</strong> innings</span></div></section>
      </div>

      <div className="content-grid content-grid-bottom">
        <section className="panel chart-panel"><SectionHeader eyebrow="PERFORMANCE OVERVIEW" title="Runs scored across formats" action="Last 6 months" /><div className="chart-legend"><span><i className="legend-dot lime" /> ODI</span><span><i className="legend-dot blue" /> T20</span><span className="chart-total"><strong>8,742</strong> total runs</span></div><TrendChart /></section>
        <section className="panel players-panel"><SectionHeader eyebrow="TOP PERFORMERS" title="In form right now" action="Player stats" onAction={() => onNavigate("players")} /><div className="player-list">{players.slice(0, 3).map((player, index) => <button className="player-row" key={player.name} onClick={() => onNavigate("players")}><span className={`rank rank-${index + 1}`}>{String(index + 1).padStart(2, "0")}</span><span className="player-avatar">{player.name.split(" ").map((word) => word[0]).join("")}</span><span className="player-copy"><strong>{player.name}</strong><small>{player.role} · {player.team}</small></span><span className="player-stat"><strong>{player.runs}</strong><small>runs</small></span><span className="trend-up"><ArrowUpRight size={13} />{player.trendValue}</span></button>)}</div><button className="full-width-button" onClick={() => onNavigate("players")}>Explore all player insights <ArrowUpRight size={14} /></button></section>
      </div>
    </div>
  );
}

function LivePage({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  const [selected, setSelected] = useState(0);
  const match = matches[selected];
  return <div className="page-content"><div className="page-heading compact"><div><div className="eyebrow"><span className="eyebrow-live"><i /> LIVE CENTER</span> · AUTO-REFRESH ON</div><h1>Every ball. <em>In context.</em></h1><p>Follow live scorecards, required run rates, and venue conditions across the feed.</p></div><div className="heading-actions"><button className="date-button"><Filter size={16} />All formats<ChevronDown size={14} /></button></div></div><div className="live-page-grid"><section className="panel live-detail-panel"><div className="live-detail-top"><div><span className="format-tag lime">{match.format}</span><h2>{match.title}</h2><p>Rajiv Gandhi International Stadium · Hyderabad</p></div><div className="live-status-pill"><i />{match.status === "LIVE" ? "LIVE SCORE" : "COMPLETED"}</div></div><div className="score-hero"><div className="score-team"><div className="team-crest crest-mumbai">MF</div><span>{match.teams[0]}</span><strong>{match.scores[0]}</strong><small>{match.overs[0]} overs</small></div><div className="score-vs"><span>VS</span><em>INNINGS 2</em></div><div className="score-team right"><div className="team-crest crest-delhi">DS</div><span>{match.teams[1]}</span><strong>{match.scores[1]}</strong><small>{match.overs[1]} overs</small></div></div><div className="required-rate"><span>REQUIRED RUN RATE</span><strong>9.78</strong><div className="rate-progress"><i style={{ width: "68%" }} /></div><span>113 runs needed from 68 balls</span></div><div className="score-table"><div className="table-caption"><span>Delhi Strikers batting</span><button className="text-button">Full scorecard <ArrowUpRight size={13} /></button></div><div className="table-row table-head"><span>Batter</span><span>R</span><span>B</span><span>4s</span><span>6s</span><span>SR</span></div>{[["A. Patel", "42", "28", "4", "2", "150.00"], ["S. Yadav", "18", "16", "1", "1", "112.50"], ["R. Singh", "9", "6", "1", "0", "150.00"]].map((row) => <div className="table-row" key={row[0]}><strong>{row[0]}</strong>{row.slice(1).map((cell, i) => <span key={i} className={i === 5 ? "highlight-cell" : ""}>{cell}</span>)}</div>)}</div></section><aside className="live-side-column"><section className="panel mini-panel"><SectionHeader eyebrow="OTHER MATCHES" title="Live feed" /><div className="mini-match-list">{matches.map((item, index) => <button key={item.id} className={`mini-match ${selected === index ? "selected" : ""}`} onClick={() => setSelected(index)}><span className={`mini-dot ${item.statusTone}`} /><span><strong>{item.teams[0]}</strong><small>{item.scores[0]}</small></span><span className="mini-vs">—</span><span><strong>{item.teams[1]}</strong><small>{item.scores[1]}</small></span></button>)}</div></section><section className="panel mini-panel commentary-panel"><SectionHeader eyebrow="BALL-BY-BALL" title="Latest commentary" /><div className="commentary-list">{[["08.4", "FOUR", "S. Yadav opens the face and finds the gap behind point. Pure timing."], ["08.3", "1 run", "Good length on middle, worked away to deep square leg."], ["08.2", "WIDE", "Drifts down the leg side. Keeper collects cleanly."], ["08.1", "DOT", "Banged in short, batter ducks under it." ]].map(([ball, type, copy]) => <div className="commentary-item" key={ball}><span>{ball}</span><div><b>{type}</b><p>{copy}</p></div></div>)}</div></section></aside></div><button className="back-link" onClick={() => onNavigate("overview")}>← Back to overview</button></div>;
}

function PlayersPage({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  const [format, setFormat] = useState("All formats");
  return <div className="page-content"><div className="page-heading compact"><div><div className="eyebrow">PLAYER INTELLIGENCE · UPDATED 42 SEC AGO</div><h1>Find the next <em>edge.</em></h1><p>SQL-backed performance signals across role, format, venue, and recent form.</p></div><div className="heading-actions"><button className="primary-button" onClick={() => onNavigate("sql")}><Database size={14} />Run a custom query</button></div></div><div className="filter-row"><div className="segmented-control">{["All formats", "Test", "ODI", "T20I"].map((item) => <button key={item} className={format === item ? "selected" : ""} onClick={() => setFormat(item)}>{item}</button>)}</div><div className="filter-spacer" /><button className="date-button"><Filter size={16} />Advanced filters<ChevronDown size={14} /></button></div><div className="player-stat-tiles"><div className="player-stat-tile"><span>Top run scorer</span><strong>Rohit Sharma</strong><b>842 runs</b><Sparkline color="#c7f36b" /></div><div className="player-stat-tile"><span>Best strike rate</span><strong>Jake Fraser</strong><b>187.4 SR</b><Sparkline color="#83b9ff" /></div><div className="player-stat-tile"><span>Most wickets</span><strong>Jasprit Bumrah</strong><b>28 wickets</b><Sparkline color="#c395ff" /></div></div><section className="panel players-table-panel"><div className="table-panel-header"><SectionHeader eyebrow={`${format.toUpperCase()} LEADERBOARD`} title="Top player performance" /><button className="icon-button"><MoreHorizontal size={18} /></button></div><div className="data-table"><div className="data-table-row data-table-head"><span>Player</span><span>Role</span><span>Team</span><span>Runs</span><span>Average</span><span>Trend</span></div>{players.map((player, index) => <div className="data-table-row" key={player.name}><span className="table-player"><span className={`rank rank-${index + 1}`}>{String(index + 1).padStart(2, "0")}</span><span className="player-avatar">{player.name.split(" ").map((word) => word[0]).join("")}</span><strong>{player.name}</strong></span><span>{player.role}</span><span><span className="team-tag">{player.team.slice(0, 3).toUpperCase()}</span>{player.team}</span><strong>{player.runs}</strong><span>{player.average}</span><span className={player.trend === "up" ? "table-trend up" : "table-trend down"}>{player.trend === "up" ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{player.trendValue}</span></div>)}</div></section><button className="back-link" onClick={() => onNavigate("overview")}>← Back to overview</button></div>;
}

function SqlPage({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  const [activeQuery, setActiveQuery] = useState(3);
  const [search, setSearch] = useState("");
  const filteredQueries = useMemo(() => sqlQueries.map((query, index) => ({ query, index })).filter(({ query }) => query.toLowerCase().includes(search.toLowerCase())), [search]);
  return <div className="page-content"><div className="page-heading compact"><div><div className="eyebrow">QUERY WORKBENCH · POSTGRESQL READY</div><h1>Ask the <em>database.</em></h1><p>25 production-shaped practice queries for cricket analytics, from SELECTs to window functions.</p></div><div className="heading-actions"><button className="primary-button" onClick={() => onNavigate("data")}><Play size={14} fill="currentColor" />Run query</button></div></div><div className="sql-layout"><aside className="panel query-list-panel"><div className="query-list-header"><div><span className="eyebrow">LIBRARY</span><strong>25 queries</strong></div><button className="icon-button"><Plus size={16} /></button></div><div className="query-search"><Search size={15} /><input aria-label="Search queries" placeholder="Search queries" value={search} onChange={(event) => setSearch(event.target.value)} /></div><div className="query-groups">{queryGroups.map((group) => <div className="query-group" key={group.label}><div className="query-group-title"><span className={`group-dot ${group.color}`} />{group.label}<small>{group.range}</small></div>{filteredQueries.filter(({ index }) => index >= Number(group.range.split("—")[0]) - 1 && index <= Number(group.range.split("—")[1]) - 1).map(({ query, index }) => <button key={query} className={`query-item ${activeQuery === index ? "active" : ""}`} onClick={() => setActiveQuery(index)}><span>{String(index + 1).padStart(2, "0")}</span>{query}</button>)}</div>)}</div></aside><section className="sql-workspace"><div className="panel sql-editor-panel"><div className="editor-topline"><div><span className="eyebrow">QUERY {String(activeQuery + 1).padStart(2, "0")} · {activeQuery < 8 ? "BEGINNER" : activeQuery < 16 ? "INTERMEDIATE" : "ADVANCED"}</span><h2>{sqlQueries[activeQuery]}</h2></div><button className="date-button"><Database size={15} />PostgreSQL<ChevronDown size={14} /></button></div><div className="code-editor"><div className="code-line-numbers">{Array.from({ length: 11 }, (_, index) => <span key={index}>{String(index + 1).padStart(2, "0")}</span>)}</div><pre><code><span className="code-keyword">SELECT</span> p.full_name, p.playing_role, p.batting_style,<br />       p.bowling_style<br /><span className="code-keyword">FROM</span> players p<br /><span className="code-keyword">WHERE</span> p.country = <span className="code-string">'India'</span><br /><span className="code-keyword">ORDER BY</span> p.full_name <span className="code-keyword">ASC</span>;<br /><br /><span className="code-comment">-- Returns 68 rows · indexed on country</span></code></pre></div><div className="editor-footer"><span><i className="status-dot" /> No syntax errors</span><span>Last run 2 min ago</span></div></div><div className="panel results-panel"><div className="results-header"><div><span className="eyebrow">RESULTS</span><h2>India player profiles <span>· 68 rows</span></h2></div><button className="text-button">Export CSV <ArrowUpRight size={14} /></button></div><div className="results-table"><div className="results-row results-head"><span>Full name</span><span>Playing role</span><span>Batting style</span><span>Bowling style</span></div>{[["Rohit Sharma", "Batsman", "Right-hand bat", "Right-arm offbreak"], ["Jasprit Bumrah", "Bowler", "Right-hand bat", "Right-arm fast"], ["Ravindra Jadeja", "All-rounder", "Left-hand bat", "Left-arm orthodox"], ["Rishabh Pant", "Wicket-keeper", "Left-hand bat", "—"]].map((row) => <div className="results-row" key={row[0]}>{row.map((cell, index) => <span key={cell} className={index === 0 ? "result-name" : ""}>{cell}</span>)}</div>)}</div><div className="results-footer"><span>Showing 1—4 of 68</span><div><button className="pagination-button">‹</button><button className="pagination-button active">1</button><button className="pagination-button">2</button><button className="pagination-button">3</button><button className="pagination-button">›</button></div></div></div></section></div><button className="back-link" onClick={() => onNavigate("overview")}>← Back to overview</button></div>;
}

function DataPage({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  const [records, setRecords] = useState([["PL-001", "Rohit Sharma", "India", "Batsman", "842"], ["PL-002", "Jasprit Bumrah", "India", "Bowler", "28"], ["PL-003", "Harry Brook", "England", "Batsman", "778"], ["PL-004", "Rashid Khan", "Afghanistan", "All-rounder", "34"]]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const addRecord = () => { if (!name.trim()) return; setRecords((current) => [[`PL-${String(current.length + 1).padStart(3, "0")}`, name.trim(), "India", "Batsman", "0"], ...current]); setName(""); setShowForm(false); };
  return <div className="page-content"><div className="page-heading compact"><div><div className="eyebrow">ADMINISTRATION · CRUD OPERATIONS</div><h1>Keep the data <em>useful.</em></h1><p>Manage player records with a clean, database-agnostic workflow for the analytics team.</p></div><div className="heading-actions"><button className="primary-button" onClick={() => setShowForm((value) => !value)}><Plus size={15} />Add player</button></div></div>{showForm && <div className="panel add-record-panel"><div><span className="eyebrow">NEW RECORD</span><h2>Add a player profile</h2></div><div className="record-form"><input placeholder="Full name" aria-label="Full name" value={name} onChange={(event) => setName(event.target.value)} /><select aria-label="Role"><option>Batsman</option><option>Bowler</option><option>All-rounder</option><option>Wicket-keeper</option></select><button className="primary-button" onClick={addRecord}>Create record</button></div></div>}<div className="crud-summary"><div className="crud-summary-card"><Database size={17} /><span>Total records</span><strong>2,418</strong><small>Synced from SQL database</small></div><div className="crud-summary-card"><ShieldCheck size={17} /><span>Data quality</span><strong>99.2%</strong><small>Validated last sync</small></div><div className="crud-summary-card"><RefreshCw size={17} /><span>Last mutation</span><strong>14:32</strong><small>By Arjun Kapoor</small></div></div><section className="panel crud-panel"><div className="crud-toolbar"><div><span className="eyebrow">PLAYERS TABLE</span><h2>Active records <span>· {records.length} shown</span></h2></div><div className="crud-actions"><div className="topbar-search"><Search size={15} /><span>Filter records</span></div><button className="icon-button"><MoreHorizontal size={18} /></button></div></div><div className="data-table crud-table"><div className="data-table-row data-table-head"><span>ID</span><span>Full name</span><span>Country</span><span>Role</span><span>Runs / wkts</span><span>Actions</span></div>{records.map((row) => <div className="data-table-row" key={row[0]}><span className="mono-text">{row[0]}</span><strong>{row[1]}</strong><span>{row[2]}</span><span><span className="role-pill">{row[3]}</span></span><strong>{row[4]}</strong><span className="row-actions"><button aria-label={`Edit ${row[1]}`}><Settings2 size={15} /></button><button aria-label={`Delete ${row[1]}`}><X size={15} /></button></span></div>)}</div><div className="crud-footer"><span><i className="status-dot" /> Changes are saved to your local workspace</span><button className="text-button" onClick={() => onNavigate("sql")}>View schema <ArrowUpRight size={14} /></button></div></section><button className="back-link" onClick={() => onNavigate("overview")}>← Back to overview</button></div>;
}

export default function Home() {
  const [activePage, setActivePage] = useState<PageKey>("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [theme, setTheme] = useState<"navy" | "matchday">("navy");
  const pageTitles: Record<PageKey, string> = { overview: "Overview", live: "Live center", players: "Player stats", sql: "SQL lab", data: "Data manager" };
  const refreshLabel = refreshCount > 0 ? `Synced ${refreshCount}×` : "Refresh data";
  const navigate = (page: PageKey) => { setActivePage(page); setMenuOpen(false); };
  return <div className={`app-shell theme-${theme}`}><Sidebar activePage={activePage} onNavigate={navigate} collapsed={!menuOpen} onClose={() => setMenuOpen(false)} /><div className="app-main"><Topbar pageTitle={pageTitles[activePage]} onMenu={() => setMenuOpen(true)} onRefresh={() => setRefreshCount((count) => count + 1)} refreshLabel={refreshLabel} theme={theme} onToggleTheme={() => setTheme((current) => current === "navy" ? "matchday" : "navy")} onOpenLive={() => navigate("live")} />{activePage === "overview" && <Overview onNavigate={navigate} onOpenMatch={() => navigate("live")} />}{activePage === "live" && <LivePage onNavigate={navigate} />}{activePage === "players" && <PlayersPage onNavigate={navigate} />}{activePage === "sql" && <SqlPage onNavigate={navigate} />}{activePage === "data" && <DataPage onNavigate={navigate} />}</div></div>;
}
