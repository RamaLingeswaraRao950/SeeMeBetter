import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore/lite";
import { firebaseDb } from "@/firebase/firebase";
import type { ResponseAnswer, ResponseDoc } from "@/types/firestore";

export async function createResponse(input: {
  uid: string;
  handle: string;
  anonymousId: string;
  answers: ResponseAnswer[];
}): Promise<{ responseId: string }> {
  const payload: ResponseDoc = {
    createdAt: serverTimestamp(),
    anonymousId: input.anonymousId,
    source: "web",
    formHandle: input.handle,
    answers: input.answers
  };
  const ref = await addDoc(collection(firebaseDb, "users", input.uid, "responses"), payload);
  return { responseId: ref.id };
}

export async function appendThreeWords(input: {
  uid: string;
  responseId: string;
  threeWords: string;
}) {
  const ref = doc(firebaseDb, "users", input.uid, "responses", input.responseId);
  await updateDoc(ref, {
    answers: arrayUnion({
      questionId: "__three_words",
      questionTitle: "Describe me in 3 words",
      type: "text",
      answer: input.threeWords
    })
  } as unknown as Partial<ResponseDoc>);
}
