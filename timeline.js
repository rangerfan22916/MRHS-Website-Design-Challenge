fetch("timeline.json")
    .then(res => res.json())
    .then(data => {
        const timelineContainer = document.querySelector('.timeline-container');

        // Clear existing content
        timelineContainer.innerHTML = '';

        // Icon mapping for different task types
        const getIcon = (title) => {
            const lowerTitle = title.toLowerCase();

            if (lowerTitle.includes('counselor')) return 'fa-users';
            if (lowerTitle.includes('college interest') || lowerTitle.includes('research')) return 'fa-search';
            if (lowerTitle.includes('sat') || lowerTitle.includes('act') || lowerTitle.includes('preparation')) return 'fa-pen';
            if (lowerTitle.includes('register')) return 'fa-clipboard';
            if (lowerTitle.includes('ap exam')) return 'fa-certificate';
            if (lowerTitle.includes('letter') || lowerTitle.includes('recommendation')) return 'fa-envelope';
            if (lowerTitle.includes('visit') || lowerTitle.includes('college')) return 'fa-map-pin';
            if (lowerTitle.includes('common app') || lowerTitle.includes('account')) return 'fa-laptop';
            if (lowerTitle.includes('essay')) return 'fa-pen-fancy';
            if (lowerTitle.includes('financial') || lowerTitle.includes('fafsa') || lowerTitle.includes('css')) return 'fa-dollar-sign';
            if (lowerTitle.includes('submit') || lowerTitle.includes('application')) return 'fa-paper-plane';
            if (lowerTitle.includes('decision') || lowerTitle.includes('deposit')) return 'fa-check-circle';
            if (lowerTitle.includes('interview')) return 'fa-handshake';
            if (lowerTitle.includes('profile')) return 'fa-user';
            if (lowerTitle.includes('transcript') || lowerTitle.includes('grade')) return 'fa-file-alt';
            if (lowerTitle.includes('scholarship')) return 'fa-trophy';

            return 'fa-star'; // default icon
        };

        // Timeline
        ['junior', 'senior'].forEach(year => {
            const yearDiv = document.createElement('div');
            yearDiv.id = year;
            yearDiv.classList.add('timeline-container');
            if (year === 'junior') yearDiv.style.display = 'flex';

            // Filter data by grade
            const yearItems = data.filter(item => item.grade === year);

            yearItems.forEach((item, index) => {
                const tItem = document.createElement('div');
                tItem.classList.add('timeline-item');
                const icon = getIcon(item.title);
                tItem.innerHTML = `
                <div class="timeline-marker">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="timeline-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>`;
                yearDiv.appendChild(tItem);
            });

            timelineContainer.appendChild(yearDiv);
        });
    });

// Tabs
document.querySelectorAll('.tab-button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.timeline-container').forEach(tc => {
            tc.style.display = tc.id === btn.dataset.target ? 'flex' : 'none';
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
        })
    });
});

