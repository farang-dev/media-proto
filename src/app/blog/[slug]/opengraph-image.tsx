import { ImageResponse } from 'next/og';
import { getArticle } from '@/data/blog';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function BlogOGImage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const article = getArticle(slug);

  const title = article?.title || 'OshiHos';
  const category = article?.category || '';
  const truncatedTitle = title.length > 60 ? title.slice(0, 57) + '...' : title;

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)',
        position: 'relative',
        padding: 60,
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
      {category && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: '#A868D8',
              background: 'rgba(168,104,216,0.15)',
              padding: '6px 16px',
              borderRadius: 20,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            {category}
          </span>
        </div>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <h1
          style={{
            fontSize: 48,
            fontWeight: 900,
            fontFamily: 'serif',
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.2,
            maxWidth: 900,
          }}
        >
          {truncatedTitle}
        </h1>
        {article?.description && (
          <p
            style={{
              fontSize: 18,
              color: '#8888aa',
              margin: '20px 0 0 0',
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            {article.description.length > 120
              ? article.description.slice(0, 117) + '...'
              : article.description}
          </p>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #A868D8, #C488E8)',
              borderRadius: 10,
            }}
          >
            <span style={{ color: '#0f0f1a', fontSize: 20, fontWeight: 900, fontFamily: 'serif' }}>
              推
            </span>
          </div>
          <span style={{ fontSize: 16, color: '#8888aa', fontWeight: 600 }}>OshiHos</span>
        </div>
        <span style={{ fontSize: 14, color: '#555577', letterSpacing: '0.1em' }}>
          oshi-hos.xyz
        </span>
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
