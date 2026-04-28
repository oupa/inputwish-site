export interface Project {
  slug: string;
  title: string;
  year: number;
  platforms: string[];
  tags: string[];
  client: string | null;
  description: string;  // plain text fallback for cards
  blocks: Block[];
  images: string[];
  videoSlug: string | null;
}

export type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; caption?: string }
  | { type: 'link'; label: string; url: string };

export interface NewsPost {
  slug: string;
  title: string;
  date: string;
  content: string;   // plain text fallback for index previews
  blocks: Block[];
  images: string[];
}

export interface About {
  headline: string;
  body: string;
  location: string;
  founded: number;
}

export interface Contact {
  company: string;
  address: string[];
  email: { business: string; support: string };
  legal: { id: string; vatId: string };
}
