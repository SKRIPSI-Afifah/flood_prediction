import fs from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const ROOT = path.resolve("wireframes")
const DETAIL_DIR = path.join(ROOT, "detail")
const REPORT_DIR = path.join(ROOT, "report")
await fs.mkdir(DETAIL_DIR, { recursive: true })
await fs.mkdir(REPORT_DIR, { recursive: true })

const PAGE_W = 1600
const PAGE_H = 1200

const COLORS = {
  bg: "#f5f5f3",
  paper: "#ffffff",
  ink: "#1f2937",
  mute: "#6b7280",
  line: "#202938",
  soft: "#d7dde5",
  panel: "#f8fafc",
  alt: "#eef2f7",
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function svgStart(width, height, title, style = "detail") {
  const bg = style === "report" ? "#fafaf9" : COLORS.bg
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#000" flood-opacity="0.08" />
      </filter>
      <style>
        .t { font-family: Arial, Helvetica, sans-serif; fill: ${COLORS.ink}; }
        .title { font-size: 34px; font-weight: 800; letter-spacing: -0.03em; }
        .subtitle { font-size: 15px; font-weight: 500; fill: ${COLORS.mute}; }
        .section { font-size: 18px; font-weight: 800; letter-spacing: -0.01em; }
        .small { font-size: 12px; font-weight: 700; fill: ${COLORS.mute}; letter-spacing: 0.08em; text-transform: uppercase; }
        .micro { font-size: 11px; font-weight: 600; fill: ${COLORS.mute}; }
        .label { font-size: 12px; font-weight: 700; fill: ${COLORS.ink}; }
        .chip { font-size: 11px; font-weight: 800; fill: ${COLORS.ink}; letter-spacing: 0.12em; text-transform: uppercase; }
      </style>
    </defs>
    <rect width="100%" height="100%" fill="${bg}" />
    <text x="48" y="50" class="t small">${esc(title)}</text>
  `
}

function svgEnd() {
  return `</svg>`
}

function rect(x, y, w, h, opts = {}) {
  const rx = opts.rx ?? 16
  const fill = opts.fill ?? COLORS.paper
  const stroke = opts.stroke ?? COLORS.line
  const sw = opts.sw ?? 2
  const dash = opts.dash ? ` stroke-dasharray="${opts.dash}"` : ""
  const filter = opts.shadow ? ` filter="url(#shadow)"` : ""
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash}${filter} />`
}

function text(x, y, value, cls = "micro", anchor = "start", fill) {
  const color = fill ? ` fill="${fill}"` : ""
  return `<text x="${x}" y="${y}" class="t ${cls}" text-anchor="${anchor}"${color}>${esc(value)}</text>`
}

function line(x1, y1, x2, y2, opts = {}) {
  const stroke = opts.stroke ?? COLORS.line
  const sw = opts.sw ?? 2
  const dash = opts.dash ? ` stroke-dasharray="${opts.dash}"` : ""
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"${dash} />`
}

function circle(cx, cy, r, opts = {}) {
  const fill = opts.fill ?? COLORS.paper
  const stroke = opts.stroke ?? COLORS.line
  const sw = opts.sw ?? 2
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />`
}

function pill(x, y, w, label, opts = {}) {
  const fill = opts.fill ?? COLORS.alt
  const stroke = opts.stroke ?? COLORS.line
  const sw = opts.sw ?? 1.8
  return `${rect(x, y, w, 34, { rx: 17, fill, stroke, sw })}${text(x + w / 2, y + 22, label, "micro", "middle")}`
}

function numberedBadge(x, y, n, fill = COLORS.paper) {
  return `${circle(x, y, 16, { fill, stroke: COLORS.line, sw: 2 })}${text(x, y + 5, String(n), "micro", "middle")}`
}

function listBlock(x, y, items, width, rowH = 36) {
  let out = ""
  items.forEach((item, i) => {
    const yy = y + i * rowH
    out += circle(x + 7, yy - 5, 4.5, { fill: COLORS.line, stroke: COLORS.line, sw: 1 })
    out += text(x + 20, yy, item, "micro")
    out += line(x + 20, yy + 8, x + width, yy + 8, { stroke: COLORS.soft, sw: 2, dash: "4 5" })
  })
  return out
}

function appSidebar(x, y, w, h, active) {
  const items = ["Beranda", "Manajemen Pengguna", "Prediksi", "Peta GIS", "Riwayat"]
  let out = ""
  out += rect(x, y, w, h, { rx: 24, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
  out += rect(x + 16, y + 16, w - 32, 82, { rx: 18, fill: COLORS.panel, stroke: COLORS.line, sw: 2 })
  out += circle(x + 42, y + 57, 18, { fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
  out += text(x + 72, y + 52, "Sentinel Hydro", "section")
  out += text(x + 72, y + 76, "Flood Intelligence", "micro")
  items.forEach((item, i) => {
    const yy = y + 120 + i * 72
    const isActive = active === item
    out += rect(x + 14, yy, w - 28, 52, {
      rx: 14,
      fill: isActive ? "#eef4ff" : COLORS.paper,
      stroke: isActive ? "#2563eb" : COLORS.line,
      sw: isActive ? 2 : 1.6,
      dash: isActive ? "" : "7 6",
    })
    out += text(x + 32, yy + 32, item, "micro")
  })
  out += rect(x + 16, y + h - 120, w - 32, 88, { rx: 16, fill: COLORS.panel, stroke: COLORS.line, sw: 2 })
  out += circle(x + 40, y + h - 75, 16, { fill: COLORS.alt, stroke: COLORS.line, sw: 2 })
  out += text(x + 70, y + h - 78, "User / Admin", "micro")
  out += text(x + 70, y + h - 56, "logout menu", "micro")
  return out
}

function topBar(x, y, w, withControls = true) {
  let out = ""
  out += rect(x, y, w, 92, { rx: 20, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
  out += pill(x + 18, y + 29, 130, "Breadcrumb")
  if (withControls) {
    out += rect(x + w - 252, y + 24, 186, 40, { rx: 14, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += text(x + w - 160, y + 50, "Search / theme / user", "micro", "middle")
  }
  return out
}

function shellWithSidebar(title, active, bodyBuilder) {
  const shellX = 48
  const shellY = 88
  const sidebarW = 330
  const contentX = shellX + sidebarW + 24
  const contentW = PAGE_W - contentX - 48
  let out = svgStart(PAGE_W, PAGE_H, title, "detail")
  out += appSidebar(shellX, shellY, sidebarW, PAGE_H - shellY - 48, active)
  out += rect(contentX, shellY, contentW, PAGE_H - shellY - 48, { rx: 24, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
  out += topBar(contentX, shellY, contentW, true)
  out += bodyBuilder(contentX, shellY + 110, contentW, PAGE_H - shellY - 158)
  out += svgEnd()
  return out
}

function shellNoSidebar(title, bodyBuilder, mode = "detail") {
  let out = svgStart(PAGE_W, PAGE_H, title, mode)
  out += rect(64, 74, PAGE_W - 128, PAGE_H - 128, { rx: 26, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
  out += bodyBuilder(64, 74, PAGE_W - 128, PAGE_H - 128)
  out += svgEnd()
  return out
}

function landingPage(style) {
  const bgTitle = "Landing Page"
  return shellNoSidebar(bgTitle, (x, y, w, h) => {
    let out = ""
    out += topBar(x, y, w, false)
    out += rect(x + 28, y + 118, w - 56, 322, { rx: 24, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += pill(x + 50, y + 148, 220, "System Active: Aceh")
    out += text(x + 50, y + 244, "Peta Risiko Banjir", "title")
    out += text(x + 50, y + 286, "Aceh Interaktif", "title")
    out += text(x + 50, y + 340, "Masuk portal untuk membuka peta GIS interaktif Aceh.", "subtitle")
    out += text(x + 50, y + 372, "Akses peta, panel analisis, dan fitur prediksi tersedia setelah login.", "subtitle")
    out += rect(x + 50, y + 386, 170, 50, { rx: 15, fill: COLORS.line, stroke: COLORS.line, sw: 2 })
    out += text(x + 135, y + 418, "Masuk Portal", "micro", "middle", "#fff")
    out += rect(x + 232, y + 386, 180, 50, { rx: 15, fill: COLORS.paper, stroke: COLORS.line, sw: 2, dash: "7 6" })
    out += text(x + 322, y + 418, "Secondary", "micro", "middle")
    out += rect(x + w - 460, y + 154, 366, 230, { rx: 18, fill: COLORS.alt, stroke: COLORS.line, sw: 2, dash: "10 6" })
    out += text(x + w - 277, y + 274, "Hero visual / map preview", "section", "middle")
    out += rect(x + 28, y + 470, w - 56, 120, { rx: 18, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += text(x + 50, y + 510, "Authority / trust bar", "small")
    out += ["BPBA", "BMKG", "Dinas Pengairan", "BNPB"].map((item, i) => pill(x + 180 + i * 220, y + 500, 180, item)).join("")
    out += rect(x + 28, y + 616, w - 56, 258, { rx: 20, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += text(x + 50, y + 650, "Kapabilitas Platform", "section")
    const cards = [
      { title: "Peta GIS Presisi", num: 1 },
      { title: "Faktor Risiko Dinamis", num: 2 },
      { title: "Pemberitahuan Cepat", num: 3 },
    ]
    cards.forEach((card, i) => {
      const cx = x + 50 + i * 338
      out += rect(cx, y + 690, 310, 170, { rx: 18, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
      out += numberedBadge(cx + 28, y + 724, card.num)
      out += text(cx + 54, y + 728, card.title, "section")
      out += listBlock(cx + 24, y + 756, ["Point utama 1", "Point utama 2", "Point utama 3"], 260, 28)
    })
    out += rect(x + 28, y + 910, w - 56, 220, { rx: 20, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += rect(x + 52, y + 944, 430, 150, { rx: 16, fill: COLORS.alt, stroke: COLORS.line, sw: 2, dash: "10 6" })
    out += text(x + 267, y + 1018, "GIS preview / iframe", "section", "middle")
    out += pill(x + 520, y + 944, 210, "Eksplorasi Interaktif")
    out += text(x + 520, y + 1008, "Pahami Risiko Tanpa Membaca Data Mentah", "section")
    out += listBlock(x + 520, y + 1046, ["Kode warna poligon", "Filter curah hujan / elevasi", "Integrasi data historis"], 450, 34)
    out += rect(x + 28, y + 1154, w - 56, 76, { rx: 16, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += text(x + 52, y + 1200, "Footer / links / status", "micro")
    return out
  }, style)
}

function loginPage(style) {
  return shellNoSidebar("Login Page", (x, y, w, h) => {
    const leftW = Math.floor((w - 18) * 0.58)
    const rightW = w - 18 - leftW
    let out = ""
    out += rect(x + 18, y + 18, leftW, h - 36, { rx: 24, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += rect(x + 18 + leftW + 18, y + 18, rightW, h - 36, { rx: 24, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += pill(x + 40, y + 40, 185, "Secure Access Portal")
    out += text(x + 40, y + 130, "Sentinel Hydro", "title")
    out += text(x + 40, y + 182, "Masuk untuk mengakses dashboard prediksi, peta risiko, dan log simulasi banjir.", "subtitle")
    out += rect(x + 40, y + h - 176, 118, 80, { rx: 16, fill: COLORS.alt, stroke: COLORS.line, sw: 2 })
    out += rect(x + 170, y + h - 176, 118, 80, { rx: 16, fill: COLORS.alt, stroke: COLORS.line, sw: 2 })
    out += rect(x + 300, y + h - 176, 118, 80, { rx: 16, fill: COLORS.alt, stroke: COLORS.line, sw: 2 })
    out += text(x + 99, y + h - 126, "Live", "micro", "middle")
    out += text(x + 229, y + h - 126, "Secure", "micro", "middle")
    out += text(x + 359, y + h - 126, "Active", "micro", "middle")
    out += text(x + 18 + leftW + rightW / 2, y + 86, "Authorize Access", "section", "middle")
    out += rect(x + 18 + leftW + 36, y + 136, rightW - 72, 54, { rx: 14, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += rect(x + 18 + leftW + 36, y + 212, rightW - 72, 54, { rx: 14, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += rect(x + 18 + leftW + 36, y + 290, rightW - 72, 54, { rx: 14, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += rect(x + 18 + leftW + 36, y + 382, rightW - 72, 54, { rx: 14, fill: COLORS.line, stroke: COLORS.line, sw: 2 })
    out += text(x + 18 + leftW + rightW / 2 + 18, y + 416, "Login", "micro", "middle", "#fff")
    out += text(x + 18 + leftW + 36, y + 476, "Forgot password / request access", "micro")
    out += rect(x + 18 + leftW + 36, y + 520, rightW - 72, 98, { rx: 18, fill: COLORS.panel, stroke: COLORS.line, sw: 2 })
    out += text(x + 18 + leftW + 54, y + 556, "Form notes", "small")
    out += listBlock(x + 18 + leftW + 54, y + 586, ["Email wajib", "Password wajib", "Tidak ada sidebar di layar ini"], rightW - 120, 28)
    return out
  }, style)
}

function registerPage(style) {
  return shellNoSidebar("Register Page", (x, y, w, h) => {
    const leftW = Math.floor((w - 18) * 0.58)
    const rightW = w - 18 - leftW
    let out = ""
    out += rect(x + 18, y + 18, leftW, h - 36, { rx: 24, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += rect(x + 18 + leftW + 18, y + 18, rightW, h - 36, { rx: 24, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += pill(x + 40, y + 40, 175, "Request Access")
    out += text(x + 40, y + 130, "Sentinel Hydro", "title")
    out += text(x + 40, y + 182, "Daftarkan akun untuk mendapatkan akses ke dashboard analisis, histori prediksi, dan layer GIS Aceh.", "subtitle")
    out += rect(x + 40, y + h - 176, 118, 80, { rx: 16, fill: COLORS.alt, stroke: COLORS.line, sw: 2 })
    out += rect(x + 170, y + h - 176, 118, 80, { rx: 16, fill: COLORS.alt, stroke: COLORS.line, sw: 2 })
    out += rect(x + 300, y + h - 176, 118, 80, { rx: 16, fill: COLORS.alt, stroke: COLORS.line, sw: 2 })
    out += text(x + 99, y + h - 126, "Email", "micro", "middle")
    out += text(x + 229, y + h - 126, "Role", "micro", "middle")
    out += text(x + 359, y + h - 126, "Approved", "micro", "middle")
    out += text(x + 18 + leftW + rightW / 2, y + 86, "Request Access", "section", "middle")
    ;["Full Name", "Work Email", "Security Code", "Verify Code"].forEach((label, i) => {
      const yy = y + 136 + i * 76
      out += rect(x + 18 + leftW + 36, yy, rightW - 72, 54, { rx: 14, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
      out += text(x + 18 + leftW + 54, yy + 34, `${label} field`, "micro")
    })
    out += rect(x + 18 + leftW + 36, y + 452, rightW - 72, 54, { rx: 14, fill: COLORS.line, stroke: COLORS.line, sw: 2 })
    out += text(x + 18 + leftW + rightW / 2 + 18, y + 486, "Submit Application", "micro", "middle", "#fff")
    out += text(x + 18 + leftW + 36, y + 548, "Verification info", "small")
    out += listBlock(x + 18 + leftW + 54, y + 580, ["Confirmation via email", "Account approval flow", "No sidebar on auth pages"], rightW - 120, 28)
    return out
  }, style)
}

function dashboardHome(style) {
  return shellWithSidebar("Dashboard Home", "Beranda", (x, y, w) => {
    let out = ""
    out += rect(x, y, w, 160, { rx: 22, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += text(x + 24, y + 42, "Dashboard FloodRisk Aceh", "title")
    out += text(x + 24, y + 84, "Ringkasan prediksi kerawanan banjir yang dibaca dari Supabase.", "subtitle")
    out += rect(x + w - 288, y + 28, 120, 42, { rx: 14, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += rect(x + w - 156, y + 28, 120, 42, { rx: 14, fill: COLORS.line, stroke: COLORS.line, sw: 2 })
    out += text(x + w - 228, y + 56, "History", "micro", "middle")
    out += text(x + w - 96, y + 56, "Run", "micro", "middle", "#fff")
    for (let i = 0; i < 4; i++) {
      const xx = x + i * ((w - 36) / 4)
      out += rect(xx, y + 182, (w - 36) / 4 - 12, 170, { rx: 18, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
      out += text(xx + 18, y + 216, `Metric ${i + 1}`, "small")
      out += text(xx + 18, y + 292, `${(i + 1) * 12}`, "title")
    }
    out += rect(x, y + 374, w, 240, { rx: 22, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += text(x + 24, y + 414, "Charts / distribution", "section")
    out += rect(x + 24, y + 448, w - 48, 142, { rx: 16, fill: COLORS.alt, stroke: COLORS.line, sw: 2, dash: "10 6" })
    out += rect(x, y + 634, w, 260, { rx: 22, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += text(x + 24, y + 674, "Map summary", "section")
    out += rect(x + 24, y + 708, w - 48, 176, { rx: 16, fill: COLORS.alt, stroke: COLORS.line, sw: 2, dash: "10 6" })
    out += rect(x, y + 918, w, 246, { rx: 22, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += text(x + 24, y + 958, "Latest assessments table", "section")
    out += line(x + 24, y + 992, x + w - 24, y + 992, { stroke: COLORS.soft, sw: 2 })
    for (let i = 0; i < 4; i++) {
      out += line(x + 24, y + 1030 + i * 36, x + w - 24, y + 1030 + i * 36, { stroke: "#e6e9ef", sw: 2 })
    }
    return out
  }, style)
}

function predictionPage(style) {
  return shellWithSidebar("Prediction Page", "Prediksi", (x, y, w) => {
    const left = Math.floor(w * 0.52)
    const right = w - left - 18
    let out = ""
    out += rect(x, y, left, 520, { rx: 22, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += rect(x + left + 18, y, right, 520, { rx: 22, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += text(x + 24, y + 40, "Parameter Pengujian", "section")
    ;[72, 146, 220, 294].forEach((yy) => {
      out += rect(x + 24, y + yy, left - 48, 54, { rx: 14, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    })
    out += rect(x + 24, y + 378, left - 48, 58, { rx: 14, fill: COLORS.line, stroke: COLORS.line, sw: 2 })
    out += text(x + left / 2, y + 414, "Mulai Prediksi", "micro", "middle", "#fff")
    out += text(x + left + 42, y + 40, "Keluaran Prediksi", "section")
    out += rect(x + left + 42, y + 72, right - 84, 132, { rx: 16, fill: COLORS.alt, stroke: COLORS.line, sw: 2 })
    out += text(x + left + right / 2 + 18, y + 148, "Result summary", "section", "middle")
    out += rect(x + left + 42, y + 224, (right - 96) / 2, 120, { rx: 16, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += rect(x + left + 54 + (right - 96) / 2, y + 224, (right - 96) / 2, 120, { rx: 16, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += rect(x + left + 42, y + 360, right - 84, 140, { rx: 16, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += rect(x, y + 556, w, 180, { rx: 22, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += text(x + 24, y + 596, "Parameter Wilayah", "section")
    out += rect(x + 24, y + 628, (w - 72) / 3, 86, { rx: 16, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += rect(x + 36 + (w - 72) / 3, y + 628, (w - 72) / 3, 86, { rx: 16, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += rect(x + 48 + 2 * (w - 72) / 3, y + 628, (w - 72) / 3, 86, { rx: 16, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += rect(x, y + 758, w, 332, { rx: 22, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += text(x + 24, y + 798, "Peta Spasial", "section")
    out += rect(x + 24, y + 834, w - 48, 242, { rx: 16, fill: COLORS.alt, stroke: COLORS.line, sw: 2, dash: "10 6" })
    return out
  }, style)
}

function historyPage(style) {
  return shellWithSidebar("History Page", "Riwayat", (x, y, w) => {
    let out = ""
    out += rect(x, y, w, 152, { rx: 22, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    for (let i = 0; i < 4; i++) {
      out += rect(x + i * ((w - 36) / 4), y + 174, (w - 36) / 4 - 12, 146, { rx: 18, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    }
    out += rect(x, y + 348, w, 244, { rx: 22, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += text(x + 24, y + 388, "Filter Riwayat", "section")
    for (let i = 0; i < 5; i++) {
      const yy = y + 426 + Math.floor(i / 3) * 84
      const xx = x + 24 + (i % 3) * Math.floor((w - 72) / 3)
      out += rect(xx, yy, Math.floor((w - 72) / 3) - 12, 54, { rx: 14, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    }
    out += rect(x, y + 618, w, 464, { rx: 22, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += text(x + 24, y + 660, "Tabel Riwayat", "section")
    out += line(x + 24, y + 694, x + w - 24, y + 694, { stroke: COLORS.soft, sw: 2 })
    for (let i = 0; i < 6; i++) {
      out += line(x + 24, y + 730 + i * 58, x + w - 24, y + 730 + i * 58, { stroke: "#e6e9ef", sw: 2 })
    }
    out += rect(x + w - 258, y + 1110, 236, 44, { rx: 14, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += text(x + w - 140, y + 1139, "Pagination", "micro", "middle")
    return out
  }, style)
}

function gisMapPage(style) {
  return shellWithSidebar("GIS Map Page", "Peta GIS", (x, y, w) => {
    let out = ""
    out += rect(x, y, w, 900, { rx: 22, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += rect(x + 20, y + 20, w - 40, 860, { rx: 18, fill: COLORS.alt, stroke: COLORS.line, sw: 2, dash: "10 6" })
    out += rect(x + 34, y + 34, 334, 224, { rx: 18, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += rect(x + 34, y + 682, 334, 170, { rx: 18, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += rect(x + w - 420, y + 34, 386, 610, { rx: 18, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += text(x + w - 388, y + 76, "Panel Analisis", "section")
    out += line(x + w - 388, y + 110, x + w - 54, y + 110, { stroke: COLORS.soft, sw: 2 })
    out += listBlock(x + w - 388, y + 146, ["Risk score", "Total banjir", "Faktor pemicu", "Deploy warning"], 300, 48)
    out += rect(x + w - 388, y + 398, 300, 56, { rx: 14, fill: COLORS.line, stroke: COLORS.line, sw: 2 })
    out += text(x + w - 238, y + 434, "Deploy Warning", "micro", "middle", "#fff")
    out += rect(x + 386, y + 124, 630, 550, { rx: 18, fill: COLORS.paper, stroke: COLORS.line, sw: 2, dash: "10 6" })
    out += text(x + 701, y + 406, "Interactive GIS map", "section", "middle")
    out += rect(x + 386, y + 698, 630, 120, { rx: 18, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += text(x + 701, y + 768, "Legend / factor filters", "micro", "middle")
    return out
  }, style)
}

function userManagementPage(style) {
  return shellWithSidebar("User Management Page", "Manajemen Pengguna", (x, y, w) => {
    let out = ""
    out += rect(x, y, w, 118, { rx: 22, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += rect(x + 24, y + 28, 280, 52, { rx: 16, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += rect(x + 320, y + 28, 180, 52, { rx: 16, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += rect(x + w - 220, y + 28, 196, 52, { rx: 16, fill: COLORS.line, stroke: COLORS.line, sw: 2 })
    out += text(x + w - 122, y + 61, "Tambah Pengguna", "micro", "middle", "#fff")
    out += rect(x, y + 142, w, 690, { rx: 22, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += text(x + 24, y + 184, "Tabel Pengguna", "section")
    out += line(x + 24, y + 220, x + w - 24, y + 220, { stroke: COLORS.soft, sw: 2 })
    for (let i = 0; i < 5; i++) {
      const yy = y + 258 + i * 96
      out += line(x + 24, yy + 68, x + w - 24, yy + 68, { stroke: "#e6e9ef", sw: 2 })
      out += circle(x + 54, yy + 34, 18, { fill: COLORS.alt, stroke: COLORS.line, sw: 2 })
      out += rect(x + w - 212, yy + 16, 76, 36, { rx: 12, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
      out += rect(x + w - 126, yy + 16, 76, 36, { rx: 12, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    }
    out += text(x + 84, y + 292, "Nama user / avatar", "micro")
    out += text(x + 420, y + 292, "Role", "micro")
    out += text(x + 680, y + 292, "Created", "micro")
    out += text(x + w - 212, y + 292, "Edit", "micro")
    out += text(x + w - 126, y + 292, "Delete", "micro")
    return out
  }, style)
}

function settingsPage(style) {
  return shellWithSidebar("Settings Page", "Beranda", (x, y, w) => {
    let out = ""
    out += rect(x, y, w, 154, { rx: 22, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += text(x + 24, y + 42, "System Settings", "title")
    out += text(x + 24, y + 86, "Kelola API, parameter model, preferensi tampilan, dan kontrol sistem.", "subtitle")
    out += rect(x, y + 180, w, 720, { rx: 22, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    out += text(x + w / 2, y + 360, "Workspace", "small", "middle")
    out += text(x + w / 2, y + 406, "Settings coming soon", "section", "middle")
    out += rect(x + w / 2 - 148, y + 458, 296, 54, { rx: 16, fill: COLORS.alt, stroke: COLORS.line, sw: 2, dash: "10 6" })
    out += text(x + w / 2, y + 492, "API keys / model config / theme", "micro", "middle")
    return out
  }, style)
}

const variants = [
  {
    dir: DETAIL_DIR,
    style: "detail",
    pages: [
      ["01-landing", landingPage("detail")],
      ["02-login", loginPage("detail")],
      ["03-register", registerPage("detail")],
      ["04-dashboard", dashboardHome("detail")],
      ["05-prediction", predictionPage("detail")],
      ["06-history", historyPage("detail")],
      ["07-gis-map", gisMapPage("detail")],
      ["08-user-management", userManagementPage("detail")],
      ["09-settings", settingsPage("detail")],
    ],
  },
  {
    dir: REPORT_DIR,
    style: "report",
    pages: [
      ["01-landing", landingPage("report")],
      ["02-login", loginPage("report")],
      ["03-register", registerPage("report")],
      ["04-dashboard", dashboardHome("report")],
      ["05-prediction", predictionPage("report")],
      ["06-history", historyPage("report")],
      ["07-gis-map", gisMapPage("report")],
      ["08-user-management", userManagementPage("report")],
      ["09-settings", settingsPage("report")],
    ],
  },
]

async function toPng(svg) {
  return sharp(Buffer.from(svg)).png().toBuffer()
}

async function makeContactSheet(pages, style, label) {
  const thumbW = 480
  const thumbH = 330
  const cols = 2
  const rows = Math.ceil(pages.length / cols)
  const width = 48 + cols * thumbW + (cols - 1) * 28 + 48
  const height = 124 + rows * thumbH + (rows - 1) * 28 + 48
  let sheet = svgStart(width, height, label, style)
  sheet += text(48, 76, label, "title")
  sheet += text(48, 112, style === "report" ? "Versi siap masuk laporan / skripsi" : "Versi lebih detail per komponen", "subtitle")

  for (let i = 0; i < pages.length; i++) {
    const col = i % cols
    const row = Math.floor(i / cols)
    const x = 48 + col * (thumbW + 28)
    const y = 144 + row * (thumbH + 28)
    const png = await toPng(pages[i][1])
    sheet += rect(x, y, thumbW, thumbH, { rx: 18, fill: COLORS.paper, stroke: COLORS.line, sw: 2 })
    sheet += `<image href="data:image/png;base64,${png.toString("base64")}" x="${x + 10}" y="${y + 10}" width="${thumbW - 20}" height="${thumbH - 42}" preserveAspectRatio="xMidYMid meet" />`
    sheet += text(x + 16, y + thumbH - 16, pages[i][0], "micro")
  }
  sheet += svgEnd()
  return sheet
}

for (const variant of variants) {
  for (const [name, svg] of variant.pages) {
    await sharp(Buffer.from(svg)).png().toFile(path.join(variant.dir, `${name}.png`))
  }
  const contactSheet = await makeContactSheet(variant.pages, variant.style, variant.style === "report" ? "Wireframe Report Set" : "Wireframe Detail Set")
  await sharp(Buffer.from(contactSheet)).png().toFile(path.join(variant.dir, `00-contact-sheet.png`))
}

console.log(`Generated detailed and report wireframes in ${ROOT}`)
