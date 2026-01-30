fetch("timeline.json")
    .then(res => res.json())
    .then(data => {
        const timelineContainer = document.getElementById('timeline-content');
        let isFullTimeline = true; // Track current view state

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

        // Render combined timeline
        const renderFullTimeline = () => {
            timelineContainer.innerHTML = '';
            const fullTimeline = document.createElement('div');
            fullTimeline.id = 'full-timeline';
            fullTimeline.classList.add('timeline-container');
            fullTimeline.style.display = 'flex';

            // Combine all items and sort by date
            const allItems = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

            allItems.forEach((item, index) => {
                const tItem = document.createElement('div');
                tItem.classList.add('timeline-item');
                tItem.classList.add(`grade-${item.grade}`);
                const icon = getIcon(item.title);
                tItem.innerHTML = `
                <div class="timeline-marker unfilled">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="timeline-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>`;
                tItem.addEventListener('click', () => separateTimeline());
                fullTimeline.appendChild(tItem);
            });

            timelineContainer.appendChild(fullTimeline);
        };

        // Render separated timeline by year
        const renderSeparatedTimeline = () => {
            timelineContainer.innerHTML = '';
            document.getElementById('page-nav').style.display = 'flex';

            ['junior', 'senior'].forEach(year => {
                const yearDiv = document.createElement('div');
                yearDiv.id = year;
                yearDiv.classList.add('timeline-container');
                if (year === 'junior') yearDiv.style.display = 'flex';
                else yearDiv.style.display = 'none';

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
                    tItem.addEventListener('click', () => renderFullTimeline());
                    yearDiv.appendChild(tItem);
                });

                timelineContainer.appendChild(yearDiv);
            });

            // Re-attach tab button listeners after rendering
            setupTabButtonListeners();
        };

        // Separate timeline (show tabs and separated view)
        const separateTimeline = () => {
            isFullTimeline = false;
            renderSeparatedTimeline();
        };

        // Setup tab button listeners
        const setupTabButtonListeners = () => {
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    // If viewing full timeline, separate first
                    if (isFullTimeline) {
                        renderSeparatedTimeline();
                    }

                    document.querySelectorAll('.timeline-container').forEach(tc => {
                        if (tc.id !== 'full-timeline') {
                            tc.style.display = tc.id === btn.dataset.target ? 'flex' : 'none';
                        }
                    });
                });
            });
        };

        // Initial render - show full combined timeline
        renderFullTimeline();
        setupTabButtonListeners();
    });

