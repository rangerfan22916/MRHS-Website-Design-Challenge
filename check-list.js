// ===== TASK STORAGE =====
let tasks = JSON.parse(localStorage.getItem("tasks")) || [
  { text: "Create Common App account", date: "2025-08-01", done: false },
  { text: "Build college list", date: "2025-09-01", done: false },
  { text: "Request teacher recommendations", date: "2025-09-15", done: false },
  { text: "Take / retake SAT or ACT", date: "2025-10-01", done: false },
  { text: "Complete FAFSA", date: "2025-10-01", done: false },
  { text: "Submit Early Action / Early Decision", date: "2025-11-01", done: false },
  { text: "Submit Regular Decision applications", date: "2026-01-01", done: false },
  { text: "Commit to a college 🎉", date: "2026-05-01", done: false }
];

let filter = "all";
const checklist = document.getElementById("checklist");

// ===== SAVE TO LOCALSTORAGE =====
function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===== LOAD CHECKLIST =====
function loadChecklist() {
  checklist.innerHTML = "";
  const today = new Date();

  // Filter tasks
  let displayTasks = [...tasks];
  if (filter === "overdue") {
    displayTasks = displayTasks.filter(t => new Date(t.date) < today && !t.done);
  }
  if (filter === "completed") {
    displayTasks = displayTasks.filter(t => t.done);
  }

  // Sort by date
  displayTasks.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Render tasks
  displayTasks.forEach(task => {
    const overdue = new Date(task.date) < today && !task.done;

    const li = document.createElement("li");
    li.classList.add("checklist-item");
    if (task.done) li.classList.add("completed");
    if (overdue) li.classList.add("overdue");

    li.innerHTML = `
      <input type="checkbox" class="checklist-input" ${task.done ? "checked" : ""}>
      <label>
        <span>${task.text}</span>
        <span class="deadline ${overdue ? "overdue" : ""}">Due: ${new Date(task.date).toLocaleDateString()}</span>
      </label>
    `;

    // Checkbox listener
    li.querySelector("input").addEventListener("change", () => {
      task.done = !task.done;
      save();
      loadChecklist();
    });

    checklist.appendChild(li);
  });

  updateProgress();
}

// ===== UPDATE PROGRESS BAR =====
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
}

// ===== FILTER =====
function setFilter(type) {
  filter = type;
  loadChecklist();
}

// ===== ADD TASK =====
function addTask() {
  const text = document.getElementById("new-task").value.trim();
  const date = document.getElementById("new-date").value;

  if (!text || !date) return alert("Please enter both task and date!");

  tasks.push({ text, date, done: false });
  save();
  loadChecklist();

  document.getElementById("new-task").value = "";
  document.getElementById("new-date").value = "";
}

// ===== INIT =====
loadChecklist();
