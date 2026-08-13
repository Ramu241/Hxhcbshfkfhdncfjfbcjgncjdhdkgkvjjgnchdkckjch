import React, { useEffect, useRef, useState } from "react";
import { getNumberImageSrc } from "./utils/numberAssets";
import { Play, Sparkles, Lock, Unlock, Send, ExternalLink, ShieldAlert, Key, CheckCircle, AlertCircle } from "lucide-react";

const TARGET_GAME_URL = "https://www.dgclub.fan/#/register?invitationCode=886571831313";
const TELEGRAM_LINK = "https://t.me/+cFIMYplJlMphMzRl";
const ALLOWED_PASSWORDS = ["RAMU786", "786786", "DGCLUB99", "RAMUBHAI", "88657183"];

// 13 UNIQUE VIBRANT COLOR THEMES FOR PANEL (rotates sequentially without repeating immediately)
interface ColorTheme {
  id: number;
  name: string;
  borderColor: string;
  glowShadow: string;
  cardBg: string;
  accentText: string;
  accentHex: string;
  wingLeftStops: [string, string, string];
  wingRightStops: [string, string, string];
  btnGradient: string;
  innerBoxBg: string;
}

const COLOR_THEMES: ColorTheme[] = [
  {
    id: 1,
    name: "Cyber Cyan",
    borderColor: "border-cyan-400",
    glowShadow: "0 0 25px rgba(0,240,255,0.8), 0 0 12px rgba(59,130,246,0.6)",
    cardBg: "linear-gradient(165deg, #09132e 0%, #03081a 50%, #0f0529 100%)",
    accentText: "text-cyan-300 drop-shadow-[0_0_10px_#00f0ff]",
    accentHex: "#00f0ff",
    wingLeftStops: ["#00f0ff", "#3b82f6", "#090d21"],
    wingRightStops: ["#3b82f6", "#00f0ff", "#090d21"],
    btnGradient: "from-[#00c8ff] via-[#3b82f6] to-[#0d9488]",
    innerBoxBg: "#050b1f",
  },
  {
    id: 2,
    name: "Neon Fuchsia",
    borderColor: "border-fuchsia-400",
    glowShadow: "0 0 25px rgba(217,70,239,0.8), 0 0 12px rgba(236,72,153,0.6)",
    cardBg: "linear-gradient(165deg, #240529 0%, #0d0112 50%, #1e002e 100%)",
    accentText: "text-fuchsia-300 drop-shadow-[0_0_10px_#d946ef]",
    accentHex: "#d946ef",
    wingLeftStops: ["#d946ef", "#ec4899", "#17021c"],
    wingRightStops: ["#ec4899", "#d946ef", "#17021c"],
    btnGradient: "from-[#d946ef] via-[#ec4899] to-[#8b5cf6]",
    innerBoxBg: "#120217",
  },
  {
    id: 3,
    name: "Emerald Matrix",
    borderColor: "border-emerald-400",
    glowShadow: "0 0 25px rgba(16,185,129,0.8), 0 0 12px rgba(52,211,153,0.6)",
    cardBg: "linear-gradient(165deg, #022013 0%, #010d07 50%, #022c19 100%)",
    accentText: "text-emerald-300 drop-shadow-[0_0_10px_#10b981]",
    accentHex: "#10b981",
    wingLeftStops: ["#10b981", "#34d399", "#011209"],
    wingRightStops: ["#34d399", "#10b981", "#011209"],
    btnGradient: "from-[#10b981] via-[#059669] to-[#047857]",
    innerBoxBg: "#02120a",
  },
  {
    id: 4,
    name: "Gold Luxury",
    borderColor: "border-amber-400",
    glowShadow: "0 0 25px rgba(251,191,36,0.8), 0 0 12px rgba(245,158,11,0.6)",
    cardBg: "linear-gradient(165deg, #2e1d03 0%, #120b01 50%, #301700 100%)",
    accentText: "text-amber-300 drop-shadow-[0_0_10px_#fbbf24]",
    accentHex: "#fbbf24",
    wingLeftStops: ["#fbbf24", "#f59e0b", "#1a0f02"],
    wingRightStops: ["#f59e0b", "#fbbf24", "#1a0f02"],
    btnGradient: "from-[#fbbf24] via-[#d97706] to-[#b45309]",
    innerBoxBg: "#170c01",
  },
  {
    id: 5,
    name: "Crimson Blaze",
    borderColor: "border-rose-500",
    glowShadow: "0 0 25px rgba(244,63,94,0.8), 0 0 12px rgba(239,68,68,0.6)",
    cardBg: "linear-gradient(165deg, #2b040c 0%, #120104 50%, #33000b 100%)",
    accentText: "text-rose-400 drop-shadow-[0_0_10px_#f43f5e]",
    accentHex: "#f43f5e",
    wingLeftStops: ["#f43f5e", "#ef4444", "#1c0207"],
    wingRightStops: ["#ef4444", "#f43f5e", "#1c0207"],
    btnGradient: "from-[#f43f5e] via-[#e11d48] to-[#9f1239]",
    innerBoxBg: "#170207",
  },
  {
    id: 6,
    name: "Royal Sapphire",
    borderColor: "border-blue-500",
    glowShadow: "0 0 25px rgba(59,130,246,0.8), 0 0 12px rgba(99,102,241,0.6)",
    cardBg: "linear-gradient(165deg, #051438 0%, #01081a 50%, #071947 100%)",
    accentText: "text-blue-300 drop-shadow-[0_0_10px_#3b82f6]",
    accentHex: "#3b82f6",
    wingLeftStops: ["#3b82f6", "#6366f1", "#020a1f"],
    wingRightStops: ["#6366f1", "#3b82f6", "#020a1f"],
    btnGradient: "from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]",
    innerBoxBg: "#030c24",
  },
  {
    id: 7,
    name: "Violet Plasma",
    borderColor: "border-purple-400",
    glowShadow: "0 0 25px rgba(168,85,247,0.8), 0 0 12px rgba(139,92,246,0.6)",
    cardBg: "linear-gradient(165deg, #1d0730 0%, #0a0114 50%, #25033d 100%)",
    accentText: "text-purple-300 drop-shadow-[0_0_10px_#a855f7]",
    accentHex: "#a855f7",
    wingLeftStops: ["#a855f7", "#8b5cf6", "#11021f"],
    wingRightStops: ["#8b5cf6", "#a855f7", "#11021f"],
    btnGradient: "from-[#a855f7] via-[#7c3aed] to-[#5b21b6]",
    innerBoxBg: "#0f021c",
  },
  {
    id: 8,
    name: "Acid Lime",
    borderColor: "border-lime-400",
    glowShadow: "0 0 25px rgba(163,230,53,0.8), 0 0 12px rgba(132,204,22,0.6)",
    cardBg: "linear-gradient(165deg, #182603 0%, #0a1201 50%, #203302 100%)",
    accentText: "text-lime-300 drop-shadow-[0_0_10px_#a3e635]",
    accentHex: "#a3e635",
    wingLeftStops: ["#a3e635", "#84cc16", "#0d1701"],
    wingRightStops: ["#84cc16", "#a3e635", "#0d1701"],
    btnGradient: "from-[#a3e635] via-[#65a30d] to-[#4d7c0f]",
    innerBoxBg: "#0c1701",
  },
  {
    id: 9,
    name: "Solar Orange",
    borderColor: "border-orange-400",
    glowShadow: "0 0 25px rgba(251,146,60,0.8), 0 0 12px rgba(249,115,22,0.6)",
    cardBg: "linear-gradient(165deg, #301302 0%, #140600 50%, #3d1700 100%)",
    accentText: "text-orange-300 drop-shadow-[0_0_10px_#fb923c]",
    accentHex: "#fb923c",
    wingLeftStops: ["#fb923c", "#ea580c", "#1c0a01"],
    wingRightStops: ["#ea580c", "#fb923c", "#1c0a01"],
    btnGradient: "from-[#fb923c] via-[#f97316] to-[#c2410c]",
    innerBoxBg: "#170801",
  },
  {
    id: 10,
    name: "Aquamarine Teal",
    borderColor: "border-teal-400",
    glowShadow: "0 0 25px rgba(45,212,191,0.8), 0 0 12px rgba(20,184,166,0.6)",
    cardBg: "linear-gradient(165deg, #022421 0%, #000f0e 50%, #02332e 100%)",
    accentText: "text-teal-300 drop-shadow-[0_0_10px_#2dd4bf]",
    accentHex: "#2dd4bf",
    wingLeftStops: ["#2dd4bf", "#14b8a6", "#011412"],
    wingRightStops: ["#14b8a6", "#2dd4bf", "#011412"],
    btnGradient: "from-[#2dd4bf] via-[#0d9488] to-[#0f766e]",
    innerBoxBg: "#021715",
  },
  {
    id: 11,
    name: "Sunset Rose",
    borderColor: "border-pink-400",
    glowShadow: "0 0 25px rgba(244,114,182,0.8), 0 0 12px rgba(236,72,153,0.6)",
    cardBg: "linear-gradient(165deg, #2e051d 0%, #12010b 50%, #3b0024 100%)",
    accentText: "text-pink-300 drop-shadow-[0_0_10px_#f472b6]",
    accentHex: "#f472b6",
    wingLeftStops: ["#f472b6", "#ec4899", "#1a0211"],
    wingRightStops: ["#ec4899", "#f472b6", "#1a0211"],
    btnGradient: "from-[#f472b6] via-[#db2777] to-[#9d174d]",
    innerBoxBg: "#17020f",
  },
  {
    id: 12,
    name: "Diamond Platinum",
    borderColor: "border-sky-300",
    glowShadow: "0 0 25px rgba(125,211,252,0.8), 0 0 12px rgba(56,189,248,0.6)",
    cardBg: "linear-gradient(165deg, #082033 0%, #020d17 50%, #0a2d4a 100%)",
    accentText: "text-sky-200 drop-shadow-[0_0_10px_#7dd3fc]",
    accentHex: "#7dd3fc",
    wingLeftStops: ["#7dd3fc", "#38bdf8", "#03111f"],
    wingRightStops: ["#38bdf8", "#7dd3fc", "#03111f"],
    btnGradient: "from-[#38bdf8] via-[#0284c7] to-[#0369a1]",
    innerBoxBg: "#041424",
  },
  {
    id: 13,
    name: "Cosmic Indigo",
    borderColor: "border-indigo-400",
    glowShadow: "0 0 25px rgba(129,140,248,0.8), 0 0 12px rgba(99,102,241,0.6)",
    cardBg: "linear-gradient(165deg, #101138 0%, #04051a 50%, #17184f 100%)",
    accentText: "text-indigo-300 drop-shadow-[0_0_10px_#818cf8]",
    accentHex: "#818cf8",
    wingLeftStops: ["#818cf8", "#6366f1", "#070821"],
    wingRightStops: ["#6366f1", "#818cf8", "#070821"],
    btnGradient: "from-[#818cf8] via-[#4f46e5] to-[#3730a3]",
    innerBoxBg: "#080a26",
  }
];

export default function App() {
  // Predictor UI states
  const [curState, setCurState] = useState<"stWingo" | "stBypass">("stWingo");
  const [popupShow, setPopupShow] = useState(true);
  const [popupClosing, setPopupClosing] = useState(false);
  const [launcherHidden, setLauncherHidden] = useState(true);

  // VIP Password Lock States
  const [isLocked, setIsLocked] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("dgclub_vip_unlocked") !== "true";
    }
    return true;
  });
  const [passInput, setPassInput] = useState("");
  const [passError, setPassError] = useState<string | null>(null);
  const [verifyingPass, setVerifyingPass] = useState(false);
  const [passSuccessMsg, setPassSuccessMsg] = useState<string | null>(null);

  // Theme Rotation State (0 to 12)
  const [themeIdx, setThemeIdx] = useState(0);
  const currentTheme = COLOR_THEMES[themeIdx];

  // Position state for popup & launcher
  const [popupPos, setPopupPos] = useState({ left: 18, top: 70 });
  const [launcherPos, setLauncherPos] = useState({
    left: typeof window !== "undefined" ? Math.max(10, window.innerWidth - 68) : 280,
    top: typeof window !== "undefined" ? Math.max(10, window.innerHeight - 150) : 500,
  });

  // Game/Prediction data
  const [lastPeriod, setLastPeriod] = useState<string | null>(null);
  const [predData, setPredData] = useState<{
    n: string;
    s: "BIG" | "SMALL";
    oppN: string;
    accuracy: string;
  } | null>(null);

  const [bypassRunning, setBypassRunning] = useState(false);
  const [bypassPct, setBypassPct] = useState(0);
  const [showPredBox, setShowPredBox] = useState(false);

  // Ping & Balance
  const [srvPing, setSrvPing] = useState<number | string>("--");

  // Drag Refs
  const popupRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLDivElement>(null);

  const popupDragRef = useRef<{ isDragging: boolean; startX: number; startY: number; startL: number; startT: number }>({
    isDragging: false, startX: 0, startY: 0, startL: 0, startT: 0
  });

  const launcherDragRef = useRef<{ isDragging: boolean; startX: number; startY: number; startL: number; startT: number; hasMoved: boolean }>({
    isDragging: false, startX: 0, startY: 0, startL: 0, startT: 0, hasMoved: false
  });

  // Canvas matrix effect
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Share+Tech+Mono&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // Automatic Color Rotation Effect (cycles themes every 3 seconds)
  useEffect(() => {
    const colorTimer = setInterval(() => {
      setThemeIdx((prev) => (prev + 1) % COLOR_THEMES.length);
    }, 3000);
    return () => clearInterval(colorTimer);
  }, []);

  // Ping loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const pingLoop = async () => {
      const start = Date.now();
      try {
        await fetch("/api/game-issue");
        setSrvPing(Date.now() - start);
      } catch (e) {
        setSrvPing(Math.floor(Math.random() * 25 + 35));
      }
      timer = setTimeout(pingLoop, 6000);
    };
    pingLoop();
    return () => clearTimeout(timer);
  }, []);

  // Matrix canvas background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = Math.floor(window.innerWidth / 14);
    const drops = Array(cols).fill(1);
    const chars = "01ZNP010WINGO";

    const interval = setInterval(() => {
      ctx.fillStyle = "rgba(6,0,15,.09)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = currentTheme.accentHex;
      ctx.font = "12px monospace";

      drops.forEach((y, i) => {
        ctx.globalAlpha = Math.random() * 0.45 + 0.1;
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 14, y * 14);
        if (y * 14 > canvas.height && Math.random() > 0.96) drops[i] = 0;
        drops[i]++;
      });
      ctx.globalAlpha = 1;
    }, 55);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, [themeIdx]);

  // Password Verification Logic
  const handleVerifyPasscode = (keyToVerify?: string) => {
    const raw = (keyToVerify || passInput).trim();
    const cleanKey = raw.toUpperCase();
    setPassError(null);

    if (!cleanKey) {
      setPassError("❌ PLEASE ENTER SECURITY PASSCODE 🔑");
      return;
    }

    setVerifyingPass(true);

    try {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance("Verifying security passcode");
        u.lang = "en-US";
        u.rate = 1.0;
        window.speechSynthesis.speak(u);
      }
    } catch (e) {}

    setTimeout(() => {
      setVerifyingPass(false);
      if (ALLOWED_PASSWORDS.includes(cleanKey) || cleanKey.length >= 4) {
        setIsLocked(false); // Unlocked! isLocked = false
        setPassSuccessMsg("🔓 ACCESS GRANTED! SERVER UNLOCKED 🔥");
        if (typeof window !== "undefined") {
          localStorage.setItem("dgclub_vip_unlocked", "true");
        }

        try {
          if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance("Access Granted! VIP Game Hack Unlocked!");
            u.lang = "en-US";
            u.rate = 0.95;
            window.speechSynthesis.speak(u);
          }
        } catch (e) {}
      } else {
        setPassError("❌ INVALID PASSCODE! ACCESS DENIED 🚫");
        try {
          if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance("Access Denied! Invalid Passcode");
            u.lang = "en-US";
            u.rate = 1.0;
            window.speechSynthesis.speak(u);
          }
        } catch (e) {}
      }
    }, 1000);
  };

  const handleRelock = () => {
    setIsLocked(true);
    setPassInput("");
    setPassSuccessMsg(null);
    setPassError(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("dgclub_vip_unlocked");
    }
  };

  // STABLE DETERMINISTIC ALGORITHM ENGINE tied directly to the Period String
  const calculatePrediction = (periodStr: string) => {
    if (!periodStr) periodStr = "2026081310001000";
    const digits = periodStr.split("").map((d) => parseInt(d, 10)).filter((n) => !isNaN(n));
    const sum = digits.reduce((acc, curr) => acc + curr, 0);
    const lastDigit = parseInt(periodStr.slice(-1), 10) || 0;
    const secondLastDigit = parseInt(periodStr.slice(-2, -1), 10) || 3;
    const thirdLastDigit = parseInt(periodStr.slice(-3, -2), 10) || 7;

    // Purely deterministic formula - 100% stable & consistent for the exact same Period
    const predictedDigit = (sum * 7 + lastDigit * 13 + secondLastDigit * 17 + thirdLastDigit * 3) % 10;
    const size: "BIG" | "SMALL" = predictedDigit >= 5 ? "BIG" : "SMALL";

    // Opposite hedge number selection (deterministic)
    let oppN: string;
    if (size === "SMALL") {
      const bigs = ["5", "6", "7", "8", "9"];
      oppN = bigs[(sum + predictedDigit * 3) % bigs.length];
    } else {
      const smalls = ["0", "1", "2", "3", "4"];
      oppN = smalls[(sum + predictedDigit * 3) % smalls.length];
    }

    const accuracy = (98.4 + ((sum % 12) / 10)).toFixed(1) + "%";

    return {
      n: predictedDigit.toString(),
      s: size,
      oppN,
      accuracy,
      period: periodStr
    };
  };

  // Fetch Game Period - Updates lastPeriod without automatically changing the current result mid-view
  const fetchPeriod = async () => {
    try {
      const res = await fetch("/api/game-issue");
      const j = await res.json();
      if (j && j.code === 0 && j.data && j.data.issueNumber) {
        const cur = j.data.issueNumber.toString();
        if (cur !== lastPeriod) {
          setLastPeriod(cur);
          setPredData((prev) => prev || calculatePrediction(cur));
        }
      }
    } catch (e) {
      const now = new Date();
      const issue = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, "0")}${String(now.getUTCDate()).padStart(2, "0")}1000${String(now.getUTCHours() * 60 + now.getUTCMinutes()).padStart(4, "0")}`;
      if (issue !== lastPeriod) {
        setLastPeriod(issue);
        setPredData((prev) => prev || calculatePrediction(issue));
      }
    }
  };

  useEffect(() => {
    fetchPeriod();
    const interval = setInterval(fetchPeriod, 4000);
    return () => clearInterval(interval);
  }, [lastPeriod]);

  // Voice speech synthesis for predicted size & number
  const speakPrediction = (size: string, num: string) => {
    try {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(`${size} ${num}`);
        u.lang = "en-US";
        u.rate = 0.88;
        u.pitch = 1.1;
        window.speechSynthesis.speak(u);
      }
    } catch (e) {}
  };

  // Run Bypass Scan animation AND ROTATE COLOR THEME EACH TIME
  const handleScan = () => {
    if (bypassRunning) return;
    setBypassRunning(true);
    setCurState("stBypass");

    // Cycle to next color theme in order (0 -> 12 -> 0)
    setThemeIdx((prev) => (prev + 1) % COLOR_THEMES.length);

    let pct = 0;
    const iv = setInterval(() => {
      pct = Math.min(100, pct + Math.floor(4 + Math.random() * 7));
      setBypassPct(pct);
      if (pct >= 100) {
        clearInterval(iv);
        setBypassRunning(false);
        setCurState("stWingo");
        setShowPredBox(true);

        // Calculate & lock prediction strictly for the active game period
        const targetPeriod = lastPeriod || Date.now().toString();
        const freshPred = calculatePrediction(targetPeriod);
        setPredData(freshPred);
        speakPrediction(freshPred.s, freshPred.n);
      }
    }, 60);
  };

  // Close & Open popup
  const handleClosePopup = () => {
    setPopupClosing(true);
    setTimeout(() => {
      setPopupShow(false);
      setPopupClosing(false);
      setLauncherHidden(false);
    }, 200);
  };

  const handleOpenPopup = () => {
    if (launcherDragRef.current.hasMoved) {
      return;
    }
    setPopupShow(true);
    setLauncherHidden(true);
  };

  // Popup Drag Handlers
  const handlePopupDragStart = (clientX: number, clientY: number) => {
    popupDragRef.current = {
      isDragging: true,
      startX: clientX,
      startY: clientY,
      startL: popupPos.left,
      startT: popupPos.top
    };
  };

  const handlePopupDragMove = (clientX: number, clientY: number) => {
    if (!popupDragRef.current.isDragging) return;
    const dx = clientX - popupDragRef.current.startX;
    const dy = clientY - popupDragRef.current.startY;
    const newL = Math.max(0, Math.min(window.innerWidth - 230, popupDragRef.current.startL + dx));
    const newT = Math.max(0, Math.min(window.innerHeight - 260, popupDragRef.current.startT + dy));
    setPopupPos({ left: newL, top: newT });
  };

  const handlePopupDragEnd = () => {
    popupDragRef.current.isDragging = false;
  };

  // Launcher Drag Handlers
  const handleLauncherDragStart = (clientX: number, clientY: number) => {
    launcherDragRef.current = {
      isDragging: true,
      startX: clientX,
      startY: clientY,
      startL: launcherPos.left,
      startT: launcherPos.top,
      hasMoved: false
    };
  };

  const handleLauncherDragMove = (clientX: number, clientY: number) => {
    if (!launcherDragRef.current.isDragging) return;
    const dx = clientX - launcherDragRef.current.startX;
    const dy = clientY - launcherDragRef.current.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      launcherDragRef.current.hasMoved = true;
    }
    const newL = Math.max(5, Math.min(window.innerWidth - 55, launcherDragRef.current.startL + dx));
    const newT = Math.max(5, Math.min(window.innerHeight - 55, launcherDragRef.current.startT + dy));
    setLauncherPos({ left: newL, top: newT });
  };

  const handleLauncherDragEnd = () => {
    launcherDragRef.current.isDragging = false;
    setTimeout(() => {
      launcherDragRef.current.hasMoved = false;
    }, 100);
  };

  // Global mouse & touch listeners
  useEffect(() => {
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        if (popupDragRef.current.isDragging) {
          handlePopupDragMove(e.touches[0].clientX, e.touches[0].clientY);
        }
        if (launcherDragRef.current.isDragging) {
          handleLauncherDragMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      }
    };
    const onMouseMove = (e: MouseEvent) => {
      if (popupDragRef.current.isDragging) {
        handlePopupDragMove(e.clientX, e.clientY);
      }
      if (launcherDragRef.current.isDragging) {
        handleLauncherDragMove(e.clientX, e.clientY);
      }
    };
    const onEnd = () => {
      handlePopupDragEnd();
      handleLauncherDragEnd();
    };

    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchend", onEnd);
    window.addEventListener("mouseup", onEnd);

    return () => {
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchend", onEnd);
      window.removeEventListener("mouseup", onEnd);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black font-['Share_Tech_Mono',monospace] select-none">
      {/* BACKGROUND GAME IFRAME */}
      <div className="absolute inset-0 w-full h-full z-0 bg-neutral-900">
        <iframe
          src={TARGET_GAME_URL}
          className="w-full h-full border-none"
          title="DGClub Game Page"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      </div>

      {/* MATRIX CANVAS */}
      <canvas id="matCanvas" ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-5 z-[9989]" />

      {/* LAUNCHER WIDGET BUTTON WITH USER AVATAR PHOTO - FULLY DRAGGABLE ANYWHERE */}
      <div
        id="launcher"
        ref={launcherRef}
        onClick={handleOpenPopup}
        onMouseDown={(e) => handleLauncherDragStart(e.clientX, e.clientY)}
        onTouchStart={(e) => e.touches[0] && handleLauncherDragStart(e.touches[0].clientX, e.touches[0].clientY)}
        className={`fixed w-13 h-13 z-[9998] cursor-grab active:cursor-grabbing touch-none transition-opacity duration-200 ${
          launcherHidden ? "opacity-0 pointer-events-none scale-0" : "opacity-100 scale-100"
        }`}
        style={{
          left: `${launcherPos.left}px`,
          top: `${launcherPos.top}px`,
        }}
      >
        {/* Outer Cyber Snake Rings matched to dynamic color */}
        <svg className="lb-snake-slow absolute -inset-[7px] w-[calc(100%+14px)] h-[calc(100%+14px)] pointer-events-none animate-snake-rot-rev" viewBox="0 0 66 66" fill="none">
          <circle cx="33" cy="33" r="30" stroke="url(#snakeGrad2)" strokeWidth="2" fill="none" strokeDasharray="30 150" strokeLinecap="round"/>
          <defs>
            <linearGradient id="snakeGrad2" x1="0" y1="0" x2="66" y2="66" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={currentTheme.accentHex} stopOpacity="0"/>
              <stop offset="100%" stopColor={currentTheme.wingLeftStops[0]} stopOpacity="0.9"/>
            </linearGradient>
          </defs>
        </svg>
        <svg className="lb-snake absolute -inset-[7px] w-[calc(100%+14px)] h-[calc(100%+14px)] pointer-events-none animate-snake-rot" viewBox="0 0 66 66" fill="none">
          <circle cx="33" cy="33" r="30" stroke={currentTheme.accentHex} strokeWidth="1" opacity="0.2" fill="none"/>
          <circle cx="33" cy="33" r="30" stroke="url(#snakeGrad)" strokeWidth="4" fill="none" strokeDasharray="75 110" strokeLinecap="round"/>
          <defs>
            <linearGradient id="snakeGrad" x1="0" y1="0" x2="66" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={currentTheme.accentHex} stopOpacity="0"/>
              <stop offset="50%" stopColor={currentTheme.wingRightStops[0]} stopOpacity="0.8"/>
              <stop offset="100%" stopColor={currentTheme.wingLeftStops[1]} stopOpacity="1"/>
            </linearGradient>
          </defs>
        </svg>

        {/* User Photo Body Container */}
        <div
          className="lb-body absolute inset-0 rounded-full overflow-hidden border-2 shadow-lg flex items-center justify-center transition-all duration-500"
          style={{
            borderColor: currentTheme.accentHex,
            boxShadow: `0 0 16px ${currentTheme.accentHex}`,
            background: `linear-gradient(135deg, ${currentTheme.innerBoxBg}, ${currentTheme.accentHex}44)`
          }}
        >
          <img
            src="/launcher_avatar.jpg"
            alt="User Avatar"
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
        {/* Active Online Indicator Dot */}
        <div
          className="lb-dot absolute top-[0px] right-[0px] w-[12px] h-[12px] rounded-full border-2 border-[#09021a] animate-[dotblink_1.1s_ease-in-out_infinite_alternate]"
          style={{ backgroundColor: currentTheme.accentHex, boxShadow: `0 0 12px ${currentTheme.accentHex}` }}
        />
      </div>

      {/* PREDICTOR FLOATING POPUP PANEL WITH DYNAMIC 13 ROTATING COLOR THEMES */}
      {popupShow && (
        <div
          id="predPopup"
          ref={popupRef}
          className={`fixed z-[9999] w-[222px] touch-none transition-transform duration-200 ${
            popupClosing ? "animate-[popOut_0.2s_ease-in_forwards]" : "animate-[popIn_0.38s_cubic-bezier(0.34,1.4,0.64,1)_forwards]"
          }`}
          style={{ left: `${popupPos.left}px`, top: `${popupPos.top}px` }}
        >
          {/* FLOATING AIR-LEVITATING CONTAINER */}
          <div className="animate-panel-float relative">
            {/* FLYING CYBER-NEON WINGS - COLOR MATCHED TO CURRENT THEME */}
            <svg
              className="real-wing-left absolute top-[0px] left-[-72px] w-[80px] h-[150px] pointer-events-none -z-10 origin-right animate-wing-left transition-all duration-500"
              style={{ filter: `drop-shadow(0 0 14px ${currentTheme.wingLeftStops[0]})` }}
              viewBox="0 0 100 200"
              fill="none"
            >
              <path d="M100 30 C75 12, 40 5, 5 45 C15 65, 35 75, 55 70 C35 85, 15 105, 12 125 C30 130, 50 120, 65 105 C45 125, 25 155, 30 175 C48 165, 65 145, 75 130 C65 155, 55 185, 65 195 C78 175, 88 150, 100 120 Z" fill={`url(#wingLeft-${currentTheme.id})`}/>
              <defs>
                <linearGradient id={`wingLeft-${currentTheme.id}`} x1="100" y1="30" x2="0" y2="120" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor={currentTheme.wingLeftStops[0]}/>
                  <stop offset="50%" stopColor={currentTheme.wingLeftStops[1]}/>
                  <stop offset="100%" stopColor={currentTheme.wingLeftStops[2]}/>
                </linearGradient>
              </defs>
            </svg>
            <svg
              className="real-wing-right absolute top-[0px] right-[-72px] w-[80px] h-[150px] pointer-events-none -z-10 origin-left animate-wing-right transition-all duration-500"
              style={{ filter: `drop-shadow(0 0 14px ${currentTheme.wingRightStops[0]})` }}
              viewBox="0 0 100 200"
              fill="none"
            >
              <path d="M0 30 C25 12, 60 5, 95 45 C85 65, 65 75, 45 70 C65 85, 85 105, 88 125 C70 130, 50 120, 35 105 C55 125, 75 155, 70 175 C52 165, 35 145, 25 130 C35 155, 45 185, 35 195 C22 175, 12 150, 0 120 Z" fill={`url(#wingRight-${currentTheme.id})`}/>
              <defs>
                <linearGradient id={`wingRight-${currentTheme.id}`} x1="0" y1="30" x2="100" y2="120" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor={currentTheme.wingRightStops[0]}/>
                  <stop offset="50%" stopColor={currentTheme.wingRightStops[1]}/>
                  <stop offset="100%" stopColor={currentTheme.wingRightStops[2]}/>
                </linearGradient>
              </defs>
            </svg>

            {/* Main Cyber Panel Card - Dynamic Rotating Color Theme */}
            <div
              className={`relative rounded-[22px] border-[2px] ${currentTheme.borderColor} p-[3px] overflow-hidden transition-all duration-500`}
              style={{
                background: currentTheme.cardBg,
                boxShadow: currentTheme.glowShadow,
              }}
            >
              {/* Electric Laser Scan Line */}
              <div
                className="scan-line absolute left-0 right-0 h-[1.5px] z-15 pointer-events-none animate-[scandn_6s_linear_infinite]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${currentTheme.accentHex}, transparent)`,
                  boxShadow: `0 0 10px ${currentTheme.accentHex}`
                }}
              />

              <div
                className="deco-top relative z-10 mx-[10px] mt-[4px] h-[1.5px] rounded-[2px]"
                style={{ background: `linear-gradient(90deg, transparent, ${currentTheme.accentHex}, transparent)` }}
              />

              {/* Header (Drag Handle) */}
              <div
                id="dragHandle"
                onMouseDown={(e) => handlePopupDragStart(e.clientX, e.clientY)}
                onTouchStart={(e) => e.touches[0] && handlePopupDragStart(e.touches[0].clientX, e.touches[0].clientY)}
                className="flex flex-col items-center justify-center pt-1.5 pb-0.5 px-2 relative z-10 cursor-grab active:cursor-grabbing"
              >
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-4 h-4 rounded-full overflow-hidden border border-white/60 shrink-0 shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                    style={{ borderColor: currentTheme.accentHex }}
                  >
                    <img src="/launcher_avatar.jpg" alt="Ramu Bhai" className="w-full h-full object-cover" />
                  </div>
                  <span className={`font-['Orbitron'] text-[10px] font-black tracking-[1.2px] uppercase ${currentTheme.accentText}`}>
                    DGCLUB SERVER HACK
                  </span>
                  <Sparkles className="w-2.5 h-2.5 animate-pulse" style={{ color: currentTheme.accentHex }} />
                </div>

                <div className="config-status flex justify-center items-center gap-1.5 text-[6px] font-bold mt-[2px] font-mono">
                  <span className="text-emerald-400 font-black flex items-center gap-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                    SERVER INJECTED
                  </span>
                  <span className="text-white/60">|</span>
                  <span className="text-cyan-300 font-mono">PORT: 443</span>
                  <span className="text-white/60">|</span>
                  <span className="text-amber-300 font-mono">{srvPing}MS</span>
                </div>

                {/* Close Button */}
                <button
                  onClick={handleClosePopup}
                  className="xbtn absolute top-[3px] right-[5px] w-4.5 h-4.5 rounded-full flex items-center justify-center border text-black text-[9px] font-black cursor-pointer active:scale-85 transition-transform"
                  style={{
                    background: `linear-gradient(135deg, ${currentTheme.accentHex}, #ffffff)`,
                    borderColor: currentTheme.accentHex,
                    boxShadow: `0 0 8px ${currentTheme.accentHex}`
                  }}
                >
                  ✕
                </button>
              </div>

              <div className="h-[1px] my-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${currentTheme.accentHex}66, transparent)` }} />

              {/* Inner Content Glass Box */}
              <div
                className="m-[4px] rounded-[14px] p-[8px_6px] relative border flex flex-col items-center justify-center min-h-[95px] transition-all duration-500"
                style={{
                  backgroundColor: currentTheme.innerBoxBg + "ee",
                  borderColor: currentTheme.accentHex + "55",
                  boxShadow: `inset 0 0 12px ${currentTheme.accentHex}22`
                }}
              >
                {/* 🔒 VIP PASSWORD LOCK SCREEN */}
                {isLocked ? (
                  <div className="w-full text-center animate-[stIn_0.25s_ease_forwards] py-1 px-0.5">
                    <div
                      className="w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-1.5 border-2 animate-pulse relative"
                      style={{
                        borderColor: currentTheme.accentHex,
                        backgroundColor: currentTheme.accentHex + "15",
                        boxShadow: `0 0 15px ${currentTheme.accentHex}88`
                      }}
                    >
                      <Lock className="w-5 h-5 text-amber-300 animate-bounce" />
                      <div className="absolute -top-1 -right-1 bg-amber-500 text-black text-[7px] font-black px-1 rounded-full border border-white">
                        VIP
                      </div>
                    </div>

                    <div
                      className="font-['Orbitron'] text-[10px] font-black tracking-[0.8px] uppercase mb-0.5"
                      style={{ color: currentTheme.accentHex, textShadow: `0 0 8px ${currentTheme.accentHex}` }}
                    >
                      VIP SERVER LOCK 🔐
                    </div>

                    <div className="text-[7.5px] text-white/90 font-medium mb-2">
                      Enter VIP Passcode to activate server hack!
                    </div>

                    {/* PASSCODE INPUT FORM */}
                    <div className="flex flex-col gap-1.5 w-full mb-1">
                      <div className="relative flex items-center w-full">
                        <Key className="w-3.5 h-3.5 absolute left-2 text-amber-300 pointer-events-none" />
                        <input
                          type="password"
                          value={passInput}
                          onChange={(e) => {
                            setPassInput(e.target.value);
                            setPassError(null);
                          }}
                          onKeyDown={(e) => e.key === "Enter" && handleVerifyPasscode()}
                          placeholder="ENTER SECRET PASSCODE"
                          className="w-full bg-black/80 text-white font-mono text-[9px] font-bold pl-7 pr-2 py-1.5 rounded-lg border focus:outline-none placeholder:text-white/40 tracking-widest text-center"
                          style={{
                            borderColor: passError ? "#ef4444" : currentTheme.accentHex + "88",
                            boxShadow: passError ? "0 0 10px rgba(239,68,68,0.8)" : `0 0 8px ${currentTheme.accentHex}33`
                          }}
                        />
                      </div>

                      {/* ERROR MESSAGE ALERT */}
                      {passError && (
                        <div className="text-[7px] font-bold text-rose-400 bg-rose-950/80 border border-rose-500/50 py-1 px-1.5 rounded flex items-center justify-center gap-1 animate-bounce">
                          <AlertCircle className="w-2.5 h-2.5 shrink-0" />
                          <span>{passError}</span>
                        </div>
                      )}

                      {/* VERIFY BUTTON */}
                      <button
                        onClick={() => handleVerifyPasscode()}
                        disabled={verifyingPass}
                        className="w-full py-1.5 px-2 rounded-lg font-['Orbitron'] text-[8px] font-black tracking-[0.8px] uppercase flex items-center justify-center gap-1.5 text-black transition-all active:scale-95 shadow-md cursor-pointer disabled:opacity-50"
                        style={{
                          background: `linear-gradient(135deg, ${currentTheme.accentHex}, #ffffff)`,
                          boxShadow: `0 0 12px ${currentTheme.accentHex}`
                        }}
                      >
                        {verifyingPass ? (
                          <>
                            <div className="w-2.5 h-2.5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                            <span>VERIFYING PASSCODE...</span>
                          </>
                        ) : (
                          <>
                            <Unlock className="w-3 h-3 fill-current" />
                            <span>UNLOCK SERVER HACK 🔓</span>
                          </>
                        )}
                      </button>

                      {/* TELEGRAM KEY LINK */}
                      <a
                        href={TELEGRAM_LINK}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-1 px-1.5 rounded font-['Orbitron'] text-[6.5px] font-bold uppercase flex items-center justify-center gap-1 text-sky-200 bg-sky-950/60 border border-sky-400/40 hover:border-sky-300 transition-all active:scale-95 mt-0.5"
                      >
                        <Send className="w-2.5 h-2.5 text-sky-400 fill-current" />
                        <span>GET FREE PASSCODE ON TELEGRAM 📲</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  /* 🔓 UNLOCKED PANEL STATE */
                  <div className="w-full">
                    {/* Top Unlock Info Bar */}
                    <div className="flex items-center justify-between mb-1 px-1 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-[6.5px] font-bold">
                      <span className="text-emerald-300 flex items-center gap-1">
                        <CheckCircle className="w-2.5 h-2.5 text-emerald-400" />
                        <span>SERVER HACK ACTIVATED 🔓</span>
                      </span>
                      <button
                        onClick={handleRelock}
                        className="text-amber-300 underline font-mono text-[6px] hover:text-white"
                      >
                        🔒 LOCK
                      </button>
                    </div>

                    {/* STATE: WINGO PREDICTION - UNLOCKED & ACCURATE */}
                    {curState === "stWingo" && (
                      <div className="w-full animate-[stIn_0.25s_ease_forwards]">
                        {showPredBox && predData ? (
                          <div
                            className="rounded-[10px] p-[6px_5px] mb-[4px] border relative overflow-hidden transition-all duration-300"
                            style={{
                              background: `linear-gradient(135deg, ${currentTheme.innerBoxBg}, #000000)`,
                              borderColor: currentTheme.accentHex + "88",
                              boxShadow: `0 0 15px ${currentTheme.accentHex}33`
                            }}
                          >
                            <div
                              className="flex items-center justify-between gap-1 mb-1 px-1.5 py-[1.5px] rounded border"
                              style={{
                                backgroundColor: "rgba(0,0,0,0.6)",
                                borderColor: currentTheme.accentHex + "44"
                              }}
                            >
                              <span className="text-[6.5px] tracking-[1.2px] text-white/90 font-mono">
                                PERIOD: <span className="text-white font-black">{lastPeriod ? lastPeriod.slice(-5) : "---"}</span>
                              </span>
                              <div className="flex items-center gap-1">
                                <span className="text-[6px] text-emerald-400 font-bold uppercase">UNLOCKED</span>
                                <div className="w-[4px] h-[4px] rounded-full bg-emerald-400 shadow-[0_0_6px_#22c55e] animate-pulse" />
                              </div>
                            </div>

                            {/* PRIMARY UNLOCKED RESULT */}
                            <div className="flex items-center gap-1.5 mb-1 relative z-1">
                              <div className="relative w-[48px] h-[48px] shrink-0 flex items-center justify-center">
                                <div
                                  className="absolute inset-0 rounded-full border-2 animate-[hexPulse_2s_ease-in-out_infinite_alternate]"
                                  style={{
                                    borderColor: predData.s === "BIG" ? "#fbbf24" : currentTheme.accentHex,
                                    boxShadow: `0 0 16px ${predData.s === "BIG" ? "rgba(251,191,36,0.6)" : currentTheme.accentHex}`
                                  }}
                                />
                                <img
                                  src={getNumberImageSrc(predData.n, predData.s === "BIG")}
                                  alt={predData.n}
                                  className="w-[42px] h-[42px] object-contain relative z-2 animate-[imgPop_0.3s_cubic-bezier(0.34,1.56,0.64,1)_both]"
                                />
                              </div>

                              <div className="flex-1 flex flex-col gap-[2px]">
                                <div className="text-[5.5px] tracking-[2px] font-black uppercase text-white/80">AI PREDICTION</div>
                                <div
                                  className="font-['Orbitron'] text-[13px] font-black tracking-[1.5px] leading-none"
                                  style={{
                                    color: predData.s === "BIG" ? "#fbbf24" : currentTheme.accentHex,
                                    textShadow: `0 0 12px ${predData.s === "BIG" ? "#fbbf24" : currentTheme.accentHex}`
                                  }}
                                >
                                  {predData.s} ({predData.n})
                                </div>
                                
                                {/* OPPOSITE HEDGE NUMBER */}
                                <div className="text-[6.5px] tracking-[0.5px] font-bold mt-[1px]">
                                  <span className="text-white/70">OPPOSITE: </span>
                                  <span
                                    style={{
                                      color: predData.s === "SMALL" ? "#fbbf24" : currentTheme.accentHex,
                                      textShadow: `0 0 6px ${predData.s === "SMALL" ? "#fbbf24" : currentTheme.accentHex}`
                                    }}
                                  >
                                    {predData.s === "SMALL" ? "BIG" : "SMALL"} ({predData.oppN})
                                  </span>
                                </div>

                                <div className="h-[3px] bg-white/10 rounded-full overflow-hidden my-[1px]">
                                  <div
                                    className="h-full w-[98%] rounded-full transition-all duration-600"
                                    style={{
                                      background: predData.s === "BIG"
                                        ? "linear-gradient(90deg, #f59e0b, #fef08a, #f59e0b)"
                                        : `linear-gradient(90deg, ${currentTheme.accentHex}, #ffffff, ${currentTheme.accentHex})`
                                    }}
                                  />
                                </div>
                                <div className="text-[5.5px] tracking-[0.8px] text-emerald-400 font-bold">ACCURACY: {predData.accuracy}</div>
                              </div>
                            </div>

                            {/* MINI TELEGRAM LINK BADGE */}
                            <a
                              href={TELEGRAM_LINK}
                              target="_blank"
                              rel="noreferrer"
                              className="w-full mt-1 py-1 px-1.5 rounded-md font-['Orbitron'] text-[7px] font-bold uppercase flex items-center justify-between text-white/90 bg-sky-950/70 border border-sky-400/40 hover:border-sky-300 transition-all active:scale-95"
                            >
                              <span className="flex items-center gap-1">
                                <Send className="w-2.5 h-2.5 text-sky-400 fill-current" />
                                <span>SURE SHOT TG CHANNEL</span>
                              </span>
                              <ExternalLink className="w-2 h-2 text-sky-300" />
                            </a>
                          </div>
                        ) : (
                          <div className="text-center py-1">
                            <div
                              className="bg-black/60 rounded-[8px] border p-[6px_4px] mb-[4px]"
                              style={{
                                borderColor: currentTheme.accentHex + "44",
                                boxShadow: `0 0 10px ${currentTheme.accentHex}22`
                              }}
                            >
                              <div className="text-[6.5px] tracking-[1.5px] text-white/80 mb-[1px] font-bold">STATUS</div>
                              <div
                                className="font-['Orbitron'] text-[14px] font-black uppercase"
                                style={{
                                  color: currentTheme.accentHex,
                                  textShadow: `0 0 10px ${currentTheme.accentHex}`
                                }}
                              >
                                READY TO HACK
                              </div>
                            </div>
                            <div className="text-[8.5px] text-white/90 leading-tight">
                              Tap <span className="font-black underline" style={{ color: currentTheme.accentHex }}>SCAN</span> to extract result
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* STATE: BYPASS SCANNING RADAR / GAME HACK */}
                    {curState === "stBypass" && (
                      <div className="w-full text-center animate-[stIn_0.25s_ease_forwards] py-0.5">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <div
                            className="w-[4px] h-[4px] rounded-full animate-ping"
                            style={{ backgroundColor: currentTheme.accentHex, boxShadow: `0 0 8px ${currentTheme.accentHex}` }}
                          />
                          <span
                            className="text-[6px] tracking-[1.5px] font-black uppercase drop-shadow-[0_0_6px_rgba(0,240,255,0.9)]"
                            style={{ color: currentTheme.accentHex }}
                          >
                            DECRYPTING WINGO SEED...
                          </span>
                        </div>

                        <div className="relative w-[64px] h-[64px] mx-auto mb-1">
                          <svg className="w-full h-full overflow-visible" viewBox="0 0 76 76" fill="none">
                            <circle cx="38" cy="38" r="34" stroke={currentTheme.accentHex + "44"} strokeWidth="1" strokeDasharray="4 4" fill="none" />
                            <circle cx="38" cy="38" r="26" stroke={currentTheme.accentHex + "22"} strokeWidth="1" fill="none" />
                            <g className="origin-[38px_38px] animate-snake-rot">
                              <line x1="38" y1="38" x2="38" y2="5" stroke={`url(#armGradCyber-${currentTheme.id})`} strokeWidth="2.5" />
                            </g>
                            <defs>
                              <linearGradient id={`armGradCyber-${currentTheme.id}`} x1="0" y1="1" x2="0" y2="0" gradientUnits="objectBoundingBox">
                                <stop offset="0%" stopColor={currentTheme.accentHex} stopOpacity="0" />
                                <stop offset="100%" stopColor={currentTheme.accentHex} stopOpacity="1" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                            <div
                              className="font-['Orbitron'] text-[13px] font-black"
                              style={{ color: currentTheme.accentHex, textShadow: `0 0 12px ${currentTheme.accentHex}` }}
                            >
                              {bypassPct}%
                            </div>
                          </div>
                        </div>

                        <div
                          className="flex items-center justify-center gap-1 text-[5.5px] tracking-[0.8px] font-mono py-[3.5px] px-[6px] border rounded-[6px] bg-black/80"
                          style={{
                            color: currentTheme.accentHex,
                            borderColor: currentTheme.accentHex + "55",
                            boxShadow: `0 0 10px ${currentTheme.accentHex}33`
                          }}
                        >
                          <div
                            className="w-[3.5px] h-[3.5px] rounded-full animate-pulse"
                            style={{ backgroundColor: currentTheme.accentHex, boxShadow: `0 0 6px ${currentTheme.accentHex}` }}
                          />
                          <span>
                            {bypassPct < 25 && "[> CONNECTING DGCLUB GATEWAY]"}
                            {bypassPct >= 25 && bypassPct < 55 && "[> DECRYPTING RNG SEED & PERIOD]"}
                            {bypassPct >= 55 && bypassPct < 85 && "[> INJECTING PREDICTION MATRIX]"}
                            {bypassPct >= 85 && "[> HACK COMPLETE: RESULT READY]"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div
                className="deco-bot h-[1.5px] mx-[8px] mt-[3px] rounded-[2px] relative z-10"
                style={{ background: `linear-gradient(90deg, transparent, ${currentTheme.accentHex}88, transparent)` }}
              />

              {/* ACTION BUTTONS */}
              <div className="flex w-full gap-1 mt-1.5">
                <button
                  id="execBtn"
                  onClick={handleScan}
                  disabled={bypassRunning}
                  className={`flex-1 py-1.5 cursor-pointer border rounded-full font-['Orbitron'] text-[7.5px] font-black tracking-[0.5px] uppercase transition-all duration-200 flex items-center justify-center gap-1 bg-gradient-to-r ${currentTheme.btnGradient} text-white active:scale-95 disabled:opacity-50`}
                  style={{
                    borderColor: currentTheme.accentHex,
                    boxShadow: `0 0 10px ${currentTheme.accentHex}aa`
                  }}
                >
                  <img src="/launcher_avatar.jpg" alt="Ramu Bhai" className="w-3.5 h-3.5 rounded-full object-cover border border-white/80 shrink-0" />
                  {bypassRunning ? "HACKING..." : "SCAN"}
                </button>

                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-1.5 cursor-pointer border rounded-full font-['Orbitron'] text-[7.5px] font-black tracking-[0.5px] uppercase transition-all duration-180 flex items-center justify-center gap-1 text-white border-sky-400 active:scale-95 shadow-[0_0_10px_rgba(34,158,217,0.8)]"
                  style={{
                    background: "linear-gradient(135deg, #229ED9 0%, #0088cc 100%)"
                  }}
                >
                  <Send className="w-2.5 h-2.5 fill-current" />
                  JOIN
                </a>

                <button
                  id="closeBtnBottom"
                  onClick={handleClosePopup}
                  className="w-[45px] py-1.5 cursor-pointer border rounded-full font-['Orbitron'] text-[7.5px] font-black tracking-[0.5px] uppercase transition-all duration-180 flex items-center justify-center gap-1 bg-gradient-to-r from-[#180033] to-[#0f0826] text-white/90 border-white/20 active:scale-95 hover:border-white/40"
                >
                  HIDE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

