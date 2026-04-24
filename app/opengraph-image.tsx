import { ImageResponse } from 'next/og';

import { SITE_DESCRIPTION, SITE_NAME, siteOrigin } from '@/lib/site';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

const OpenGraphImage = () =>
  new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          padding: '64px',
          background:
            'linear-gradient(135deg, #121212 0%, #1f1f1f 54%, #2a2a2a 100%)',
          color: '#f6f3ee',
          fontFamily: 'Inter, Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            border: '1px solid rgba(248, 245, 239, 0.12)',
            borderRadius: '36px',
            padding: '52px',
            backgroundColor: '#171717',
            boxShadow: '0 36px 80px rgba(0, 0, 0, 0.28)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                maxWidth: '760px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '26px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#b89555',
                }}
              >
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '9999px',
                    background: '#b89555',
                  }}
                />
                Casa Film & Music
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                <div
                  style={{
                    fontSize: '82px',
                    lineHeight: '0.94',
                    letterSpacing: '-0.05em',
                    fontWeight: 600,
                    maxWidth: '860px',
                  }}
                >
                  Photo, video and music production in Europe
                </div>
                <div
                  style={{
                    fontSize: '30px',
                    lineHeight: 1.35,
                    color: 'rgba(246,243,238,0.84)',
                    maxWidth: '760px',
                  }}
                >
                  {SITE_DESCRIPTION}
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '22px',
                color: 'rgba(246,243,238,0.7)',
              }}
            >
              <span>Film, photography, music, and event storytelling</span>
              <span style={{ color: '#b89555' }}>{siteOrigin.replace(/^https?:\/\//, '')}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );

export default OpenGraphImage;
