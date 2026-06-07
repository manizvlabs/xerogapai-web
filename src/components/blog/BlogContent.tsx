import React from 'react';
import type { BlogContentBlock } from '@/src/lib/blog';

interface Props {
  blocks: BlogContentBlock[];
}

const CTA_RE = /(https?:\/\/[\w./?=#%&-]*vyaptix\.(?:ai|com)[\w./?=#%&-]*|[\w.-]*vyaptix\.(?:ai|com)[\w./?=#%&-]*|\+91[\s\d]{10,15}|\b9959844010\b|[\w.]+@vyaptix\.com)/g;

function renderText(text: string): React.ReactNode[] {
  const boldParts = text.split(/(\*\*[^*]+\*\*)/g);
  const nodes: React.ReactNode[] = [];
  boldParts.forEach((part, bi) => {
    if (bi % 2 === 1) {
      nodes.push(
        <strong key={`b${bi}`} className="text-white font-semibold">
          {part.slice(2, -2)}
        </strong>,
      );
      return;
    }
    const ctaParts = part.split(CTA_RE);
    ctaParts.forEach((cp, ci) => {
      if (ci % 2 === 0) {
        if (cp) nodes.push(cp);
        return;
      }
      const isEmail = cp.includes('@');
      const isPhone = !cp.includes('vyaptix') && !cp.includes('@');
      const href = isEmail
        ? `mailto:${cp.trim()}`
        : isPhone
          ? `tel:${cp.replace(/\s/g, '')}`
          : cp.startsWith('http')
            ? cp
            : `https://${cp}`;
      nodes.push(
        <a
          key={`l${bi}-${ci}`}
          href={href}
          target={isEmail || isPhone ? undefined : '_blank'}
          rel={isEmail || isPhone ? undefined : 'noopener noreferrer'}
          className="text-[#06CEFF] font-semibold hover:underline"
        >
          {cp}
        </a>,
      );
    });
  });
  return nodes;
}

export function BlogContent({ blocks }: Props) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        if (typeof block === 'string') {
          return (
            <p key={i} className="text-slate-100 leading-[1.85]">
              {renderText(block)}
            </p>
          );
        }

        if (block.type === 'h2') {
          return (
            <h2 key={i} className="text-2xl font-bold text-white mt-12 mb-4">
              {renderText(block.text)}
            </h2>
          );
        }

        if (block.type === 'h3') {
          return (
            <h3 key={i} className="text-xl font-bold text-white mt-9 mb-3">
              {renderText(block.text)}
            </h3>
          );
        }

        if (block.type === 'callout') {
          return (
            <blockquote
              key={i}
              className="border-l-4 border-[#06CEFF]/40 bg-[#06CEFF]/5 py-3 px-5 rounded-r-xl"
            >
              <p className="text-white/85 font-medium leading-relaxed not-italic">{block.text}</p>
            </blockquote>
          );
        }

        if (block.type === 'image') {
          return (
            <figure key={i} className="my-8">
              <img
                src={block.src}
                alt={block.alt}
                className="w-full rounded-xl border border-white/10"
              />
              {block.caption && (
                <figcaption className="mt-2 text-center text-sm text-slate-300">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        if (block.type === 'table') {
          return (
            <div key={i} className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    {block.headers.map((h, hi) => (
                      <th
                        key={hi}
                        className="bg-[#06CEFF]/10 text-[#06CEFF] px-4 py-3 text-left font-semibold border border-white/10"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-4 py-3 border border-white/10 text-slate-200">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.type === 'steps') {
          return (
            <ol key={i} className="space-y-4 my-6">
              {block.items.map((item, si) => (
                <li key={si} className="flex gap-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#06CEFF]/20 border border-[#06CEFF]/30 text-[#06CEFF] text-xs font-bold flex items-center justify-center mt-0.5">
                    {si + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-white mb-1">{item.title}</p>
                    {item.description && (
                      <p className="text-slate-200 text-sm leading-relaxed">{item.description}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          );
        }

        if (block.type === 'highlights') {
          return (
            <div key={i} className="grid sm:grid-cols-2 gap-4 my-6">
              {block.items.map((item, hi) => (
                <div
                  key={hi}
                  className="rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <p className="font-semibold text-white mb-1">{item.title}</p>
                  <p className="text-slate-200 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
