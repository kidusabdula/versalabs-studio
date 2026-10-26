import { ImageResponse } from 'next/og';
import type { Project } from '@/content/schema';
import { KIND_LABEL } from '@/content/labels';
import { SITE_NAME } from '@/lib/site';

export const OG_SIZE = { width: 1200, height: 630 };

// The social card for a case study: monochrome, with the facts that matter in
// a link preview (title, one line on what it is, type, status and year).
// Generated at build time from the project file, like the page itself.
export function projectOgImage(project: Project | undefined) {
  const title = project?.title ?? SITE_NAME;
  const subtitle = project?.subtitle ?? '';
  const facts = project ? [KIND_LABEL[project.kind], project.status, project.year].join('  ·  ') : '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#0A0A0C',
          color: '#FFFFFF',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, color: '#A1A1AA', letterSpacing: 1 }}>{SITE_NAME}</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: title.length > 24 ? 76 : 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>
            {title}
          </div>
          {subtitle && (
            <div style={{ display: 'flex', marginTop: 24, fontSize: 36, color: '#D4D4D8', lineHeight: 1.3, maxWidth: 980 }}>
              {subtitle}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#A1A1AA' }}>{facts}</div>
      </div>
    ),
    OG_SIZE,
  );
}
