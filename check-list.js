const tasks = [
  { text: "Create Common App account", date: "2025-08-01" },
  { text: "Build college list", date: "2025-09-01" },
  { text: "Request teacher recommendations", date: "2025-09-15" },
  { text: "Take / retake SAT or ACT", date: "2025-10-01" },
  { text: "Write personal statement", date: "2025-10-15" },
  { text: "Complete FAFSA", date: "2025-10-01" },
  { text: "Submit Early Action / Early Decision apps", date: "2025-11-01" },
  { text: "Send official test scores", date: "2025-11-15" },
  { text: "Submit Regular Decision applications", date: "2026-01-01" },
  { text: "Submit scholarships", date: "2026-02-01" },
  { text: "Review financial aid offers", date: "2026-04-01" },
  { text: "Commit to a college 🎉", date: "2026-05-01" }
];

const checklist = document.getElementById("checklist");

function loadChecklist() {
  checklist.innerHTML = "";

  const saved = JSON.parse(localStorage.getItem("collegeChecklist")) || [];
  const today = new Date();

  tasks.forEach((task, index) => {
    const checked = saved.includes(index);
    const deadlineDate = new Date(task.date);
    const overdue = today > deadlineDate && !checked;

    const li = document.createElement("li");

    li.innerHTML = `
      <input type="checkbox" ${checked ? "checked" : ""} />
      <label>
        ${task.text}<br>
        <span class="deadline ${overdue ? "overdue" : ""}">
          Deadline: ${deadlineDate.toLocaleDateString()}
        </span>
      </label>
    `;

    li.querySelector("input").addEventListener("change", () => {
      updateStorage(index);
      loadChecklist();
      updateProgress();
    });

    checklist.appendChild(li);
  });

  updateProgress();
}

function updateStorage(index) {
  let saved = JSON.parse(localStorage.getItem("collegeChecklist")) || [];

  if (saved.includes(index)) {
    saved = saved.filter(i => i !== index);
  } else {
    saved.push(index);
  }

  localStorage.setItem("collegeChecklist", JSON.stringify(saved));
}

function updateProgress() {
  const saved = JSON.parse(localStorage.getItem("collegeChecklist")) || [];
  const percent = (saved.length / tasks.length) * 100;
  document.getElementById("progress-bar").style.width = percent + "%";
}

loadChecklist();
