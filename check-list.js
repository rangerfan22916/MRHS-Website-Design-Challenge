// ================================
// TASK DATA
// ================================
let tasks = JSON.parse(localStorage.getItem("tasks")) || [
  { text: "Create Common App account", date: "2025-08-01", done: false, userAdded: false },
  { text: "Build college list", date: "2025-09-01", done: false, userAdded: false },
  { text: "Request teacher recommendations", date: "2025-09-15", done: false, userAdded: false },
  { text: "Take / retake SAT or ACT", date: "2025-10-01", done: false, userAdded: false },
  { text: "Complete FAFSA", date: "2025-10-01", done: false, userAdded: false },
  { text: "Submit Early Action / Early Decision", date: "2025-11-01", done: false, userAdded: false },
  { text: "Submit Regular Decision applications", date: "2026-01-01", done: false, userAdded: false },
  { text: "Commit to a college 🎉", date: "2026-05-01", done: false, userAdded: false }
];

let filter = "all";

const checklist = document.getElementById("taskList");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const autoSort = document.getElementById("autoSortToggle");

// ================================
// SAVE TASKS TO LOCALSTORAGE
// ================================
function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ================================
// LOAD CHECKLIST
// ================================
function loadChecklist() {
  checklist.innerHTML = "";
  const today = new Date();

  let displayTasks = [...tasks];

  // Apply filter
  if (filter === "overdue") displayTasks = displayTasks.filter(t => new Date(t.date) < today && !t.done);
  if (filter === "completed") displayTasks = displayTasks.filter(t => t.done);

  // Auto-sort
  if (autoSort.checked) displayTasks.sort((a,b) => new Date(a.date) - new Date(b.date));

  displayTasks.forEach(task => {
    const li = document.createElement("li");
    const taskDate = new Date(task.date);
    const diffDays = Math.ceil((taskDate - today) / (1000*60*60*24));

    // Add classes for styling
    if (task.done) li.classList.add("completed");
    else if (taskDate < today) li.classList.add("overdue");
    else if (diffDays <= 7) li.classList.add("due-soon");

    // Show delete button only for user-added tasks
    li.innerHTML = `
      <input type="checkbox" ${task.done ? "checked" : ""}>
      <span>${task.text} — Due: ${taskDate.toLocaleDateString()}</span>
      ${task.userAdded ? '<button class="delete-btn">🗑️</button>' : ''}
    `;

    // Checkbox toggle
    li.querySelector("input").addEventListener("change", () => {
      task.done = !task.done;
      save();
      loadChecklist();
      updateProgress();
    });

    // Delete button
    if (task.userAdded) {
      li.querySelector(".delete-btn").addEventListener("click", () => {
        tasks = tasks.filter(t => t !== task);
        save();
        loadChecklist();
        updateProgress();
      });
    }

    checklist.appendChild(li);
  });

  updateProgress();
}

// ================================
// PROGRESS BAR
// ================================
function updateProgress() {
  const completed = tasks.filter(t => t.done).length;
  const percent = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);
  
  const bar = document.getElementById("progress-bar");
  const text = document.getElementById("progress-text");

  if (bar) {
    bar.style.width = percent + "%";
    
    // Remove all progress classes
    bar.classList.remove("progress-25", "progress-50", "progress-75", "progress-100");
    
    // Add appropriate class based on percentage
    if (percent > 0 && percent <= 25) {
      bar.classList.add("progress-25");
    } else if (percent > 25 && percent <= 50) {
      bar.classList.add("progress-50");
    } else if (percent > 50 && percent <= 75) {
      bar.classList.add("progress-75");
    } else if (percent === 100) {
      bar.classList.add("progress-100");
    }
  }
  
  if (text) text.textContent = `${percent}% completed`;
  progressBar.style.width = percent + "%";
  progressText.textContent = percent + "% completed";
}

// ================================
// FILTER
// ================================
function setFilter(type) {
  filter = type;
  loadChecklist();
}

// ================================
// ADD TASK
// ================================
function addTask() {
  const text = document.getElementById("taskInput").value.trim();
  const date = document.getElementById("dateInput").value;
  if (!text || !date) return;

  // Add task as userAdded
  tasks.push({ text, date, done: false, userAdded: true });
  save();
  loadChecklist();

  // Clear inputs
  document.getElementById("taskInput").value = "";
  document.getElementById("dateInput").value = "";
}

// ================================
// EXPORT PDF
// ================================
function exportPDF() {
  const element = document.querySelector(".checklist-card");
  html2pdf().set({ margin:0.5, filename:'Checklist.pdf', html2canvas:{scale:2} }).from(element).save();
}

// ================================
// INITIALIZE
// ================================
loadChecklist();
