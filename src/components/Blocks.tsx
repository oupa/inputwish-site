import type { Block } from '../types';

export function renderBlock(block: Block, key: number) {
  if (block.type === 'paragraph') {
    return <p key={key} className="news-paragraph">{block.text}</p>;
  }
  if (block.type === 'image') {
    return (
      <figure key={key} className="news-figure">
        <img src={block.src} alt={block.caption ?? ''} loading="lazy" />
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
    );
  }
  if (block.type === 'link') {
    return (
      <a key={key} href={block.url} className="news-link-btn" target="_blank" rel="noopener noreferrer">
        {block.label} →
      </a>
    );
  }
  return null;
}
