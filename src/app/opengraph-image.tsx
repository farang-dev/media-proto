import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: 'linear-gradient(90deg, #A868D8, #C488E8, #D480A0)',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px 80px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #A868D8, #C488E8)',
              borderRadius: 16,
            }}
          >
            <span style={{ color: '#0f0f1a', fontSize: 36, fontWeight: 900, fontFamily: 'serif' }}>
              推
            </span>
          </div>
        </div>
        <h1
          style={{
            fontSize: 72,
            fontWeight: 900,
            fontFamily: 'serif',
            color: '#ffffff',
            margin: 0,
            letterSpacing: '0.02em',
          }}
        >
          OshiHos
        </h1>
        <p
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: '#A868D8',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            margin: '8px 0 0 0',
          }}
        >
          KABUKICHO HOST
        </p>
        <p
          style={{
            fontSize: 20,
            color: '#8888aa',
            margin: '24px 0 0 0',
            maxWidth: 700,
          }}
        >
          Discover, rate, and match with top hosts in Tokyo's legendary nightlife district
        </p>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          right: 40,
          fontSize: 14,
          color: '#555577',
          letterSpacing: '0.1em',
        }}
      >
        oshi-hos.xyz
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: 40,
          fontSize: 14,
          color: '#555577',
        }}
      >
        🇯🇵 推しホス
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
