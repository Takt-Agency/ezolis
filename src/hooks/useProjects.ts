import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export type Project = {
  id: string;
  title: string;
  category: string;
  location?: string;
  description?: string;
  images: string[];
  createdAt?: Timestamp;
};

function normalize(id: string, data: Record<string, unknown>): Project {
  const legacy = data.imageData as string | undefined;
  const imgs = (data.images as string[] | undefined) ?? (legacy ? [legacy] : []);
  return {
    id,
    title: (data.title as string) ?? "",
    category: (data.category as string) ?? "",
    location: data.location as string | undefined,
    description: data.description as string | undefined,
    images: imgs,
    createdAt: data.createdAt as Timestamp | undefined,
  };
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setProjects(snap.docs.map((d) => normalize(d.id, d.data())));
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );
    return unsub;
  }, []);

  return { projects, loading, error };
}

export function useProject(id: string | undefined) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setNotFound(true);
      return;
    }
    let cancelled = false;
    async function load() {
      try {
        const snap = await getDoc(doc(db, "projects", id!));
        if (cancelled) return;
        if (!snap.exists()) {
          setNotFound(true);
        } else {
          setProject(normalize(snap.id, snap.data()));
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
  }, [id]);

  return { project, loading, notFound };
}
