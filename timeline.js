// Load timeline from JSON
fetch('timeline.json')
.then(res => res.json())
.then(data => {
    const timelineContainer = document.getElementById('timeline-content');
    const checklistContainer = document.getElementById('checklist-content');
    const termsContainer = document.getElementById('terms-content');

    // Timeline
    ['junior','senior'].forEach(year => {
        const yearDiv = document.createElement('div');
        yearDiv.id = year;
        yearDiv.classList.add('timeline-container');
        if(year === 'junior') yearDiv.classList.add('active');

        data.timeline[year].forEach((item,index)=>{
            const tItem = document.createElement('div');
            tItem.classList.add('timeline-item');
            tItem.innerHTML = `
                <div class="marker">${index+1}</div>
                <div class="content">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                    <div class="checklist-item">
                        <input type="checkbox" id="${year}-${index}">
                        <label for="${year}-${index}">Task Completed</label>
                    </div>
                </div>`;
            yearDiv.appendChild(tItem);
        });

        timelineContainer.appendChild(yearDiv);
    });

    // Checklist
    data.checklist.forEach(item=>{
        const cItem = document.createElement('div');
        cItem.className = 'checklist-item';
        cItem.innerHTML = `<input type="checkbox"><label>${item}</label>`;
        checklistContainer.appendChild(cItem);
    });

    // Terms
    data.terms.forEach(term=>{
        const tCard = document.createElement('div');
        tCard.className = 'term-card';
        tCard.innerHTML = `<h4>${term.title}</h4><p>${term.desc}</p>`;
        termsContainer.appendChild(tCard);
    });
});

// Tabs
document.querySelectorAll('.tab-button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        document.querySelectorAll('.tab-button').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.timeline-container').forEach(tc=>{
            tc.style.display = tc.id===btn.dataset.target?'flex':'none';
        });
    });
});
