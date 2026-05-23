import { doc, getDoc } from "firebase/firestore/lite";
import { firebaseDb } from "@/firebase/firebase";

export async function resolveUidByHandle(handle: string): Promise<string | null> {
  const normalized = handle.trim().toLowerCase();
  if (!/^[a-z0-9_-]{3,20}$/.test(normalized)) return null;
  const ref = doc(firebaseDb, "handles", normalized);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const uid = snap.get("uid");
  return typeof uid === "string" && uid.length > 0 ? uid : null;
}

