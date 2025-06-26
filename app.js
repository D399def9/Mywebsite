// app.js
import { db, doc, getDoc, query, collection, where, getDocs } from './firebase.js';

const titleEl = document.getElementById('lesson-title');
const videoEl = document.getElementById('video');
const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

// Get lesson ID from URL
const params = new URLSearchParams(window.location.search);
const lessonId = params.get('id') || 'lesson1';

async function loadLesson(id) {
  const docRef = doc(db, "lessons", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    titleEl.textContent = data.title;
    videoEl.src = data.videoUrl;
    editor.value = data.defaultCode;
  } else {
    titleEl.textContent = "Lesson not found.";
  }
}

window.runCode = function () {
  const html = editor.value;
  const doc = preview.contentDocument || preview.contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();
};

loadLesson(lessonId);
setDoc(doc(db, "users", user.uid, "completedLessons", lessonId), {
  completed: true,
  timestamp: serverTimestamp()
});