'use client';

import { useEffect, useRef, useState } from 'react';
import { Linkedin, Mail } from 'lucide-react';
import type React from 'react';

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

export default function FoundersSection() {
  const [foundersRef, foundersInView] = useInView();

  return (
    <section
      style={{
        padding: '72px 0',
        borderBottom: '0.5px solid var(--vyaptix-border)',
      }}
    >
      <div className="container-main">
        <p
          style={{
            fontSize: '10px',
            letterSpacing: '0.18em',
            color: 'var(--vyaptix-cyan)',
            fontWeight: 600,
            textTransform: 'uppercase',
            marginBottom: '10px',
          }}
        >
          The People Building This
        </p>
        <h2
          style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.3px',
            marginBottom: '6px',
            fontFamily: "'Syne', sans-serif",
          }}
        >
          You&apos;re not hiring an agency.{' '}
          <span style={{ color: 'var(--vyaptix-cyan)' }}>You&apos;re working with founders</span>{' '}
          who built this themselves.
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--vyaptix-muted)', marginBottom: '40px' }}>
          Real people. Real backgrounds. Reachable directly.
        </p>

        <div
          ref={foundersRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{
            opacity: foundersInView ? 1 : 0,
            transform: foundersInView ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          {/* Ajeet */}
          <div
            style={{
              background: 'var(--vyaptix-bg2)',
              border: '0.5px solid var(--vyaptix-border)',
              borderRadius: '12px',
              padding: '32px',
            }}
          >
            {/* Replace with <img src="/team/ajeet-headshot.jpg" width={64} height={64} style={{ borderRadius: '50%', border: '2px solid var(--vyaptix-cyan)' }} alt="Ajeet Singh" /> when photo is available */}
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--vyaptix-cyan-10)',
                border: '2px solid var(--vyaptix-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 800,
                color: 'var(--vyaptix-cyan)',
                marginBottom: '14px',
                fontFamily: "'Syne', sans-serif",
              }}
            >
              AS
            </div>
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 800,
                marginBottom: '4px',
                letterSpacing: '-0.2px',
                fontFamily: "'Syne', sans-serif",
              }}
            >
              Ajeet Singh
            </h3>
            <p
              style={{
                fontSize: '11px',
                color: 'var(--vyaptix-cyan)',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '14px',
              }}
            >
              Co-Founder &amp; CEO
            </p>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--vyaptix-muted)',
                lineHeight: 1.7,
                marginBottom: '20px',
              }}
            >
              Before VyaptIX, I spent 7 years as a Solution Architect building enterprise-grade
              systems on Adobe Experience Manager for large organisations. I saw firsthand what
              happens when AI is built right — teams move faster, errors disappear, revenue goes up.
              I also saw how inaccessible that quality of engineering was for smaller businesses. A
              restaurant owner in Gurgaon has the same workflow problems a Fortune 500 company has.
              That&apos;s why I started VyaptIX.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <a
                href="https://www.linkedin.com/in/ajeet-singh-vyaptix/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '11px',
                  color: 'var(--vyaptix-cyan)',
                  border: '0.5px solid var(--vyaptix-cyan-20)',
                  padding: '5px 12px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <Linkedin className="w-3 h-3" /> LinkedIn
              </a>
              <a
                href="mailto:ajeet@vyaptix.com"
                style={{
                  fontSize: '11px',
                  color: 'var(--vyaptix-cyan)',
                  border: '0.5px solid var(--vyaptix-cyan-20)',
                  padding: '5px 12px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <Mail className="w-3 h-3" /> ajeet@vyaptix.com
              </a>
            </div>
          </div>

          {/* Manish */}
          <div
            style={{
              background: 'var(--vyaptix-bg2)',
              border: '0.5px solid var(--vyaptix-border)',
              borderRadius: '12px',
              padding: '32px',
            }}
          >
            {/* Replace with <img src="/team/manish-headshot.jpg" width={64} height={64} style={{ borderRadius: '50%', border: '2px solid var(--vyaptix-cyan)' }} alt="Manish Singh" /> when photo is available */}
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--vyaptix-cyan-10)',
                border: '2px solid var(--vyaptix-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 800,
                color: 'var(--vyaptix-cyan)',
                marginBottom: '14px',
                fontFamily: "'Syne', sans-serif",
              }}
            >
              MS
            </div>
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 800,
                marginBottom: '4px',
                letterSpacing: '-0.2px',
                fontFamily: "'Syne', sans-serif",
              }}
            >
              Manish Singh
            </h3>
            <p
              style={{
                fontSize: '11px',
                color: 'var(--vyaptix-cyan)',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '14px',
              }}
            >
              Co-Founder &amp; CTO
            </p>
            {/* ⚠️ MANISH — Please review and update this bio before publishing */}
            <p
              style={{
                fontSize: '13px',
                color: 'var(--vyaptix-muted)',
                lineHeight: 1.7,
                marginBottom: '20px',
              }}
            >
              Manish brings deep engineering expertise in building production-grade backend systems,
              cloud-native architecture, and AI integrations. He&apos;s the reason our systems are
              reliable from day one — not prototype-quality code that needs rebuilding once a client
              scales. When Ajeet promises a working automation in 7 days, Manish is the one who
              makes it true.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <a
                href="https://www.linkedin.com/in/vyaptix-manish/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '11px',
                  color: 'var(--vyaptix-cyan)',
                  border: '0.5px solid var(--vyaptix-cyan-20)',
                  padding: '5px 12px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <Linkedin className="w-3 h-3" /> LinkedIn
              </a>
              <a
                href="mailto:manish@vyaptix.com"
                style={{
                  fontSize: '11px',
                  color: 'var(--vyaptix-cyan)',
                  border: '0.5px solid var(--vyaptix-cyan-20)',
                  padding: '5px 12px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <Mail className="w-3 h-3" /> manish@vyaptix.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
