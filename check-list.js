// ================================
// TASK DATA
// ================================
let tasks = JSON.parse(localStorage.getItem("tasks")) || [
  { text: "Meet with school counselor about graduation requirements", date: "2026-01-15", done: false, userAdded: false },
  { text: "Discuss GPA, testing plans, and college goals with counselor", date: "2026-01-15", done: false, userAdded: false },
  { text: "Create college interest list - research colleges", date: "2026-02-01", done: false, userAdded: false },
  { text: "Research colleges by location, size, majors, and requirements", date: "2026-02-01", done: false, userAdded: false },
  { text: "Begin SAT / ACT test preparation", date: "2026-03-01", done: false, userAdded: false },
  { text: "Set up test prep resources (books, online tools, or tutoring)", date: "2026-03-01", done: false, userAdded: false },
  { text: "Register for Spring SAT / ACT test date", date: "2026-04-01", done: false, userAdded: false },
  { text: "Secure preferred test location and date", date: "2026-04-01", done: false, userAdded: false },
  { text: "Take AP Exams", date: "2026-05-15", done: false, userAdded: false },
  { text: "Request letters of recommendation from teachers", date: "2026-06-01", done: false, userAdded: false },
  { text: "Ask teachers before summer break for recommendations", date: "2026-06-01", done: false, userAdded: false },
  { text: "Visit colleges (virtual or in-person)", date: "2026-06-15", done: false, userAdded: false },
  { text: "Explore campuses to refine college list", date: "2026-06-15", done: false, userAdded: false },
  { text: "Create Common App account", date: "2026-07-01", done: false, userAdded: false },
  { text: "Familiarize yourself with Common App sections and requirements", date: "2026-07-01", done: false, userAdded: false },
  { text: "Start college essays - draft personal statements", date: "2026-08-01", done: false, userAdded: false },
  { text: "Draft supplemental essays for colleges", date: "2026-08-01", done: false, userAdded: false },
  { text: "Finalize college list before senior year", date: "2026-09-01", done: false, userAdded: false },
  { text: "Confirm deadlines for each college on your list", date: "2026-09-01", done: false, userAdded: false },
  { text: "FAFSA Opens - submit financial aid forms", date: "2026-10-01", done: false, userAdded: false },
  { text: "Complete CSS Profile if required by colleges", date: "2026-10-01", done: false, userAdded: false },
  { text: "Early Decision / Early Action application deadline", date: "2026-10-15", done: false, userAdded: false },
  { text: "Submit early applications if applicable", date: "2026-10-15", done: false, userAdded: false },
  { text: "Begin scholarship applications", date: "2026-11-01", done: false, userAdded: false },
  { text: "Apply for local, state, and national scholarships", date: "2026-11-01", done: false, userAdded: false },
  { text: "Confirm all recommendations submitted to colleges", date: "2026-12-01", done: false, userAdded: false },
  { text: "Verify official transcripts have been sent to colleges", date: "2026-12-01", done: false, userAdded: false },
  { text: "Regular Decision application deadline", date: "2027-01-01", done: false, userAdded: false },
  { text: "Submit remaining college applications", date: "2027-01-01", done: false, userAdded: false },
  { text: "Monitor college portals for admission decisions", date: "2027-03-15", done: false, userAdded: false },
  { text: "Review acceptance letters and financial aid offers", date: "2027-03-15", done: false, userAdded: false },
  { text: "Make final college decision", date: "2027-05-01", done: false, userAdded: false },
  { text: "Submit enrollment deposit", date: "2027-05-01", done: false, userAdded: false },
  { text: "Commit to a college 🎉", date: "2027-05-01", done: false, userAdded: false }
];

let filter = "all";

const checklist = document.getElementById("checklist");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

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

  // Auto-sort by date
  displayTasks.sort((a,b) => new Date(a.date) - new Date(b.date));

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
  const text = document.getElementById("new-task").value.trim();
  const date = document.getElementById("new-date").value;
  if (!text || !date) return;

  // Add task as userAdded
  tasks.push({ text, date, done: false, userAdded: true });
  save();
  loadChecklist();

  // Clear inputs
  document.getElementById("new-task").value = "";
  document.getElementById("new-date").value = "";
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
