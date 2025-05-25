export interface Blog {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  content: Content[];
  author: string;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface Content {
  type: string;
  data: string;
}

export interface Project {
  _id?: string;
  title: string;
  slug: string;
  short: string;
  full: Content[];
  tech: string[];
  demo: string;
  github: string;
  tags: string[];
  thumbnail: string;
  createdAt?: string;
  updatedAt?: string;
}
