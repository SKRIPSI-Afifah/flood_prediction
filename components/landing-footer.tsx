export function LandingFooter() {
  return (
    <footer className="bg-surface border-t border-border/40 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>waves</span>
              <span className="font-heading text-sm font-black tracking-tighter text-primary uppercase">Flood Risk Aceh</span>
            </div>
            <p className="text-sm text-on-surface-variant/70 leading-relaxed font-sans font-light">
              Portal GIS analisis presisi tinggi untuk pemantauan dan mitigasi risiko bencana banjir secara terintegrasi di Provinsi Aceh.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-primary uppercase tracking-wider mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><a href="/login" className="text-xs font-bold uppercase tracking-wider text-on-surface-variant/60 hover:text-primary transition-colors font-sans font-light">Peta Pemantauan GIS</a></li>
              <li><a href="/login" className="text-xs font-bold uppercase tracking-wider text-on-surface-variant/60 hover:text-primary transition-colors font-sans font-light">Prediksi Risiko ML</a></li>
              <li><a href="/login" className="text-xs font-bold uppercase tracking-wider text-on-surface-variant/60 hover:text-primary transition-colors font-sans font-light">Peringatan Dini</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-primary uppercase tracking-wider mb-6">Otoritas Terkait</h4>
            <ul className="space-y-4">
              <li><span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant/60 font-sans font-light">BPBA Aceh</span></li>
              <li><span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant/60 font-sans font-light">BMKG Provinsi</span></li>
              <li><span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant/60 font-sans font-light">Dinas Pengairan Aceh</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-primary uppercase tracking-wider mb-6">Status Sistem</h4>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-bold text-on-surface-variant font-sans">Sistem Aktif & Normal</span>
            </div>
            <p className="text-[10px] text-on-surface-variant/40 font-sans uppercase tracking-[0.1em]">
              Pembaruan Terakhir: Real-time Sync
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-on-surface-variant/50 font-sans uppercase tracking-wider">
            © 2026 BPBA Aceh. Dikembangkan dengan GIS Flood Risk Intelligence.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[10px] font-bold text-on-surface-variant/50 hover:text-primary transition-colors font-sans uppercase tracking-wider">Kebijakan Privasi</a>
            <a href="#" className="text-[10px] font-bold text-on-surface-variant/50 hover:text-primary transition-colors font-sans uppercase tracking-wider">Ketentuan Layanan</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
