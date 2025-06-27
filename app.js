// app.js
import { db } from './firebase.js';
import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const lessonTitleEl = document.getElementById("lesson-title");
const videoEl = document.getElementById("video");
const editorEl = document.getElementById("editor");
const nextBtn = document.getElementById("next-lesson-btn");

let currentLessonNumber = 1;
const lessonId = new URLSearchParams(window.location.search).get("id") || "lesson1";

console.log("🔁 Starting app.js, lessonId =", lessonId);

async function loadLesson() {
  console.log("Loading lesson:", lessonId);
  const docRef = doc(db, "lessons", lessonId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    const data = docSnap.data();
    console.log("✅ Data received:", data);

    lessonTitleEl.textContent = data.title;
    videoEl.src = data.videoUrl;
    editorEl.value = data.code || data.defaultCode || "";
    currentLessonNumber = data.lessonNumber || 1;

    console.log("📌 Editor content set to:", editorEl.value);

  } else {
    console.error("❌ Lesson document not found:", lessonId);
    lessonTitleEl.textContent = "Lesson not found.";
  }
}

window.runCode = () => {
  console.log("▶️ Running code:", editorEl.value);
  document.getElementById("preview").srcdoc = editorEl.value;
};

if (nextBtn) {
  nextBtn.addEventListener("click", async () => {
    console.log("➡️ Next button clicked from lesson", currentLessonNumber);
    const q = query(
      collection(db, "lessons"),
      where("lessonNumber", "==", currentLessonNumber + 1)
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      const nextDoc = snap.docs[0];
      console.log("➡️ Next lesson found:", nextDoc.id);
      window.location.href = `lesson.html?id=${nextDoc.id}`;
    } else {
      alert("This was the last lesson!");
    }
  });
}

loadLesson();