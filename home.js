let tab = "all";
let alldata = [];
const btnTab = (btn, btnName) => {
    const buttons = document.querySelectorAll('#tab-container button')
    buttons.forEach(e => {
        e.classList.remove('btn-primary')
    });
    btn.classList.add('btn-primary');
    tab = btnName;
    displayissues(alldata);
}
const loadAllissues = async () => {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    alldata = data.data;
    displayissues(alldata);
}
loadAllissues();
const displayissues = (issues) => {
    const displayContainer = document.getElementById('issue-container');
    displayContainer.innerHTML = " ";
    let numberOfissues = 0;
    const filteredIssues = issues.filter(issue => {

        if (tab === "all") return true;
        else if (tab === issue.status) {
            return true;
        }
    })

    filteredIssues.forEach(issue => {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div class="card bg-base-100 w-full shadow-sm">
                <!-- status and badge -->
                <div class="flex justify-between px-7 mt-6">
                    <img src="assets/${issue.status == 'open'?Open-Status.png:Closed-Status.png}" alt="">
                    <div class="badge badge-error badge-soft py-1 px-6">${issue.priority}</div>
                </div>
                <div class="card-body">
                    <h2 class="card-title">
                        ${issue.title}
                    </h2>
                    <p class="line-clamp-2">${issue.description}</p>
                    <div class="card-actions justify-start">
                        <div class="badge badge-error badge-soft font-semibold"><img src="assets/BugDroid.png" alt="">${issue.labels[0]}</div>
                        <div class="badge bg-yellow-100 font-semibold badge-warning badge-soft"><img src="assets/Lifebuoy.png" alt="">${issue.labels[1]}</div>
                    </div>
                </div>
                <hr class="text-gray-300">
                <!-- id, name and date section -->
                <div class="text-[#64748B] text-[12px] p-4">
                    <p>${issue.id} by ${issue.author}</p>
                    <p>${issue.createdAt}</p>
                </div>
            </div>
            `
        displayContainer.append(newDiv);
        numberOfissues++;
    });
    const numberOfissuesContainer = document.getElementById('numberOfissues');
    numberOfissuesContainer.innerHTML = `${numberOfissues} issues`;
}