import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category?: string;
  tags?: string[];
  published: boolean;
  author?: string;
  readTime?: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

function normalize(id: string, data: Record<string, unknown>): Article {
  return {
    id,
    slug: (data.slug as string) ?? id,
    title: (data.title as string) ?? "",
    excerpt: (data.excerpt as string) ?? "",
    content: (data.content as string) ?? "",
    coverImage: (data.coverImage as string) ?? "",
    category: data.category as string | undefined,
    tags: data.tags as string[] | undefined,
    published: (data.published as boolean) ?? false,
    author: data.author as string | undefined,
    readTime: data.readTime as number | undefined,
    createdAt: data.createdAt as Timestamp | undefined,
    updatedAt: data.updatedAt as Timestamp | undefined,
  };
}

export function useArticles(opts: { publishedOnly?: boolean } = {}) {
  const { publishedOnly = false } = opts;
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "articles"),
      orderBy("createdAt", "desc"),
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs
          .map((d) => normalize(d.id, d.data()))
          .filter((a) => (publishedOnly ? a.published : true));
        setArticles(list);
        setLoading(false);
      },
      () => setLoading(false),
    );
    return unsub;
  }, [publishedOnly]);

  return { articles, loading };
}

export function useArticleBySlug(slug: string | undefined) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setNotFound(true);
      return;
    }
    let cancelled = false;
    async function load() {
      try {
        const q = query(
          collection(db, "articles"),
          where("slug", "==", slug),
          where("published", "==", true),
        );
        const snap = await getDocs(q);
        if (cancelled) return;
        if (snap.empty) {
          setNotFound(true);
        } else {
          const d = snap.docs[0];
          setArticle(normalize(d.id, d.data()));
        }
      } catch {
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { article, loading, notFound };
}

export function useArticleById(id: string | undefined) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    async function load() {
      try {
        const snap = await getDoc(doc(db, "articles", id!));
        if (cancelled) return;
        if (snap.exists()) setArticle(normalize(snap.id, snap.data()));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { article, loading };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .substring(0, 100);
}

export function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
