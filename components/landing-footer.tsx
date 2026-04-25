export function LandingFooter() {
  return (
    <footer className="bg-white border-t border-border/40 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-[#242424] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>waves</span>
              <span className="font-heading text-sm font-semibold tracking-tighter text-[#242424] uppercase">Sentinel Hydro</span>
            </div>
            <p className="text-sm text-[#898989] leading-relaxed font-sans font-light">
              High-precision GIS analytical gateway for regional flood risk assessment and real-time monitoring across the Aceh region.
            </p>
          </div>
          
          <div>
            <h4 className="text-[12px] font-semibold text-[#242424] uppercase tracking-wider mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-[#898989] hover:text-[#242424] transition-colors font-sans font-light">GIS Monitoring</a></li>
              <li><a href="#" className="text-sm text-[#898989] hover:text-[#242424] transition-colors font-sans font-light">Predictive Models</a></li>
              <li><a href="#" className="text-sm text-[#898989] hover:text-[#242424] transition-colors font-sans font-light">Early Warning System</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-semibold text-[#242424] uppercase tracking-wider mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-[#898989] hover:text-[#242424] transition-colors font-sans font-light">Documentation</a></li>
              <li><a href="#" className="text-sm text-[#898989] hover:text-[#242424] transition-colors font-sans font-light">API Reference</a></li>
              <li><a href="#" className="text-sm text-[#898989] hover:text-[#242424] transition-colors font-sans font-light">Dataset Catalog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-semibold text-[#242424] uppercase tracking-wider mb-6">Status</h4>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-medium text-[#242424] font-sans">System Operational</span>
            </div>
            <p className="text-[10px] text-[#898989] font-sans uppercase tracking-[0.1em]">
              Last update: April 25, 2026 - 16:46 (GMT+7)
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[12px] text-[#898989] font-sans">
            © 2026 BPBA Aceh. Infrastructure provided by Sentinel Hydro GIS.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[12px] text-[#898989] hover:text-[#242424] transition-colors font-sans">Privacy Policy</a>
            <a href="#" className="text-[12px] text-[#898989] hover:text-[#242424] transition-colors font-sans">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
