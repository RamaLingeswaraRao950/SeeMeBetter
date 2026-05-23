import { collection, getDocs, orderBy, query, where } from "firebase/firestore/lite";
import { firebaseDb } from "@/firebase/firebase";
import type { QuestionDoc } from "@/types/firestore";

export async function fetchActiveQuestionsForUser(uid: string): Promise<QuestionDoc[]> {
  const q = query(
    collection(firebaseDb, "users", uid, "questions"),
    where("active", "==", true),
    where("isDeleted", "==", false),
    orderBy("order", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as QuestionDoc);
}
