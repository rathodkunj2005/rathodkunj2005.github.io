import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'Kunj Rathod – AI Engineer & Researcher'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Matches the site's "preprint" palette: warm paper ground, warm ink, oxblood accent.
const PAPER = '#f2ede2'
const INK = '#1d1917'
const OXBLOOD = '#8f2f18'
const MUTED = '#6b625b'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: PAPER,
          padding: '72px 80px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: OXBLOOD,
              marginBottom: 28,
            }}
          >
            § Portfolio
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: INK,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Kunj Rathod
          </div>
          <div style={{ fontSize: 44, color: OXBLOOD, marginTop: 16 }}>
            AI Engineer &amp; Researcher
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              width: '100%',
              height: 3,
              backgroundColor: INK,
              marginBottom: 24,
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ fontSize: 26, color: MUTED, maxWidth: 760 }}>
              Microsoft Fabric (Azure Data) · AI/ML · RAG · Embodied Agents
            </div>
            <div style={{ fontSize: 26, color: INK }}>kunjrathod.com</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
