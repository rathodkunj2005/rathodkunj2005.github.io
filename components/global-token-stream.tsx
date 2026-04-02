"use client"

import { useEffect, useRef } from "react"

export function GlobalTokenStream() {
   const canvasRef = useRef<HTMLCanvasElement>(null)

   useEffect(() => {
      let active = true;
      let animationId = 0;
      
      import("@chenglou/pretext").then((m) => {
         if (!active || !canvasRef.current) return
         const ctx = canvasRef.current.getContext('2d')
         if (!ctx) return
         
         const tokens = "[BOS] attention(Q, K, V) = softmax(QK^T/sqrt(d))V \\n d_model=512 \\n h=8 \\n d_k=64 \\n [CLS] x_i W_Q K^T V \\n MLP(LN(x)) \\n residual_stream += attn_out \\n dropout(0.1) \\n W_in \\n W_out \\n \\n ".repeat(150);
         const font = "14px monospace";
         
         const prepared = m.prepareWithSegments(tokens, font)
         
         let optimalWidth = 0
         m.walkLineRanges(prepared, 400, (line) => {
            if (line.width > optimalWidth) optimalWidth = line.width
         })

         const { lines } = m.layoutWithLines(prepared, optimalWidth + 20, 24)

         let yOffset = 0;
         
         const render = () => {
            if (!canvasRef.current) return
            const dpr = window.devicePixelRatio || 1;
            const rect = canvasRef.current.getBoundingClientRect();
            if (canvasRef.current.width !== rect.width * dpr || canvasRef.current.height !== rect.height * dpr) {
               canvasRef.current.width = rect.width * dpr;
               canvasRef.current.height = rect.height * dpr;
               ctx.scale(dpr, dpr);
            } else {
               ctx.clearRect(0,0, rect.width, rect.height)
            }
            
            ctx.font = font;
            const isDark = document.documentElement.classList.contains("dark")
            
            const gradient = ctx.createLinearGradient(0, 0, 0, rect.height);
            gradient.addColorStop(0, isDark ? "rgba(139, 92, 246, 0.0)" : "rgba(139, 92, 246, 0.0)");
            gradient.addColorStop(0.2, isDark ? "rgba(139, 92, 246, 0.1)" : "rgba(139, 92, 246, 0.15)");
            gradient.addColorStop(0.5, isDark ? "rgba(139, 92, 246, 0.15)" : "rgba(139, 92, 246, 0.2)");
            gradient.addColorStop(0.8, isDark ? "rgba(139, 92, 246, 0.1)" : "rgba(139, 92, 246, 0.15)");
            gradient.addColorStop(1, isDark ? "rgba(139, 92, 246, 0.0)" : "rgba(139, 92, 246, 0.0)");
            ctx.fillStyle = gradient;
            
            yOffset -= 0.5;
            if (yOffset < -24 * 100) yOffset = 0;
            
            for (let i = 0; i < lines.length; i++) {
               const y = i * 24 + yOffset
               // Only draw if within screen limits vertically
               if (y > -24 && y < rect.height + 24) {
                 // Right stream
                 ctx.fillText(lines[i].text, rect.width - optimalWidth - 40, y)
                 // Left stream
                 ctx.fillText(lines[i].text, 40, y - 500)
               }
            }
            animationId = requestAnimationFrame(render)
         }
         render()
      })
      
      return () => { 
         active = false;
         cancelAnimationFrame(animationId)
      }
   }, [])
   
   return (
     <canvas 
       ref={canvasRef} 
       style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }}
       className="pointer-events-none z-[0]" 
     />
   )
}
