fetch("timeline.json")
.then(res => res.json())
.then(data => {
    const timelineContent = document.getElementById("timeline-content");

    function render(year) {
        timelineContent.innerHTML = "";

        const container = document.createElement("div");
        container.className = "timeline-container";

        data.timeline[year].forEach((item, index) => {
            const el = document.createElement("div");
            el.className = "timeline-item";
            el.innerHTML = `
                <div class="marker">${index + 1}</div>
                <div class="content">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                </div>
            `;
            container.appendChild(el);
        });

        timelineContent.appendChild(container);
    }

    render("junior");

    document.querySelectorAll(".tab-button").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".tab-button")
                .forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            render(btn.dataset.target);
        });
    });
});
