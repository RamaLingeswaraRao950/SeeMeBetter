import { doc, getDoc } from "firebase/firestore/lite";
import { firebaseDb } from "@/firebase/firebase";
import type { GlobalSettingsDoc } from "@/types/firestore";

export async function fetchGlobalSettings(): Promise<GlobalSettingsDoc> {
  const ref = doc(firebaseDb, "settings", "global");
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    return {
      profileName: "",
      publicMessage: "Your response is anonymous and helps me improve.",
      cooldownHours: 12
    };
  }
  return snap.data() as GlobalSettingsDoc;
}
