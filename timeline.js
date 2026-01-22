const timeline = document.getElementById("timeline")
const countdown = document.getElementById("countdown")
const buttons = document.querySelectorAll(".filters button")

fetch("timeline.json")
  .then(res => res.json())
  .then(data => {
    data.sort((a, b) => new Date(a.date) - new Date(b.date))
    renderTimeline(data)
    setupCountdown(data)
    setupFilters(data)
  })

function renderTimeline(data) {
  timeline.innerHTML = ""
  data.forEach(item => {
    const div = document.createElement("div")
    div.className = "timeline-item"
    div.dataset.grade = item.grade
    div.innerHTML = `
      <div class="timeline-card">
        <span>${formatDate(item.date)} • ${item.grade.toUpperCase()}</span>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    `
    timeline.appendChild(div)
  })
}

function setupCountdown(data) {
  const today = new Date()
  const next = data.find(item => new Date(item.date) >= today)
  if (!next) {
    countdown.textContent = "All deadlines completed"
    return
  }
  const diff = Math.ceil((new Date(next.date) - today) / (1000 * 60 * 60 * 24))
  countdown.textContent = `Next deadline in ${diff} days`
}

function setupFilters(data) {
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"))
      btn.classList.add("active")
      const filter = btn.dataset.filter
      const filtered =
        filter === "all" ? data : data.filter(i => i.grade === filter)
      renderTimeline(filtered)
    })
  })
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  })
}
