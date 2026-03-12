"use client"

import { Plus, Layout } from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-64 border-r bg-card/30 hidden md:flex flex-col h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">My Apps</h2>
        <div className="space-y-2">
          {/* Mock recent app entry */}
          <button className="w-full text-left p-3 rounded-lg bg-secondary/50 border border-border transition-colors hover:bg-secondary">
            <div className="font-medium text-sm text-foreground">CloudCoder Next App</div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Live • just now
            </div>
          </button>
        </div>
      </div>
      
      <div className="mt-auto p-4 border-t border-border/50">
        <button className="w-full flex items-center justify-center gap-2 bg-transparent hover:bg-secondary border border-dashed border-border text-foreground hover:text-accent font-medium py-2 rounded-lg transition-colors text-sm">
          <Plus className="w-4 h-4" />
          New App
        </button>
      </div>
    </div>
  )
}
