import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #A868D8, #C488E8)',
        borderRadius: 8,
      }}
    >
      <span style={{ color: '#1a1a2e', fontSize: 18, fontWeight: 900, fontFamily: 'serif' }}>
        推
      </span>
    </div>,
    { width: 32, height: 32 },
  );
}
