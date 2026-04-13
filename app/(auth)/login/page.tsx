"use client";

import { Waves, Mail, Lock, ArrowRight, MapPin, ShieldCheck, Globe } from "lucide-react";
import { GlassPanel } from "@/components/sentinel/GlassPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-start overflow-hidden bg-[#f6fafe]">
      {/* Background Hero Section */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover object-center"
          alt="Cinematic aerial view of the lush coastal landscape and river deltas of Aceh"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl79upPaxR6KZay69FuulGgx70cV5OQYqWI_BLDHc-pGoQ48olPa6IHSnJquS1HYAzv2cO4Dvp3tgPU6XmceDwVEkyOBGODEh7RO6EsgWjnCpswYVGi72nUYVA4Ygp6X4iSc35GfU7Bk84DQf_gfKXQ45p-ba2DVwM8jUqko_aLp2jaQCkkADQYkTa8mT7ZBzMarIKA0FvxPZnpHI_iXsrSdpE6Oi1S9mufDEh_2THAam3BOIIIt14lRif0AzConis4x39uI60CmA"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent"></div>
      </div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-2xl px-8 md:px-24 flex flex-col justify-center py-12">
        {/* Branding Header */}
        <div className="mb-12 animate-in slide-in-from-left duration-700">
          <div className="flex items-center gap-3 mb-2">
            <Waves className="w-10 h-10 text-primary" />
            <h1 className="text-3xl font-black tracking-tighter text-primary uppercase">
              Sentinel Hydro
            </h1>
          </div>
          <div className="h-1 w-12 bg-tertiary rounded-full"></div>
          <p className="mt-6 text-muted-foreground font-medium leading-relaxed max-w-sm">
            FloodGuard Aceh: High-precision GIS analytical gateway for regional flood risk assessment and real-time monitoring.
          </p>
        </div>

        {/* Login Card */}
        <GlassPanel className="p-10 rounded-2xl shadow-2xl border-white/40 max-w-md animate-in zoom-in-95 duration-700 delay-200">
          <div className="mb-8">
            <h2 className="text-xl font-bold tracking-tight text-foreground">Secure Access</h2>
            <p className="text-sm text-muted-foreground mt-1">Authorized personnel only.</p>
          </div>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Work Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="email"
                  placeholder="analyst@aceh.gov.id"
                  className="pl-12 py-6 bg-white border-none rounded-xl"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Security Code
                </label>
                <Link href="#" className="text-xs font-semibold text-primary hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="password"
                  placeholder="••••••••••••"
                  className="pl-12 py-6 bg-white border-none rounded-xl"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2 px-1">
                <input type="checkbox" id="remember" className="rounded border-border text-primary focus:ring-primary" />
                <label htmlFor="remember" className="text-xs text-muted-foreground font-medium cursor-pointer">
                    Remember session for 24 hours
                </label>
            </div>

            <Button asChild className="w-full py-7 bg-gradient-to-r from-primary to-primary/80 rounded-xl font-bold text-sm tracking-wide shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
              <Link href="/">
                AUTHORIZE ACCESS <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </form>
        </GlassPanel>

        {/* Footer Info */}
        <div className="mt-12 flex flex-wrap items-center gap-6 text-[10px] font-bold text-muted-foreground/80 tracking-widest uppercase animate-in fade-in duration-1000 delay-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            SYSTEM ONLINE
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3" />
            ACEH REGION (GIS-1)
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3 h-3" />
            SSL SECURED
          </div>
        </div>
      </div>

      {/* Decorative Coordinates */}
      <div className="absolute top-12 right-12 z-20 hidden lg:block text-right animate-in fade-in slide-in-from-right duration-1000">
        <div className="text-[10px] font-mono text-primary/60 font-bold tracking-tighter leading-tight">
          LAT: 5.5483° N<br />
          LONG: 95.3238° E<br />
          ALT: 4.2m MSL
        </div>
        <div className="mt-4 h-16 w-[1px] bg-primary/20 ml-auto"></div>
      </div>
    </main>
  );
}
