let tab = "all";
let alldata = [];
const loading = document.getElementById('spinner-container');
function showLoading() {
    loading.classList.remove('hidden');
}
function hideLoading() {
    loading.classList.add('hidden');
}
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
    showLoading();
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    alldata = data.data;
    // console.log(data, alldata);
    displayissues(alldata);
}
loadAllissues();
const issueModalCard = document.getElementById('issueModal');
const issueModal = async (id) => {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    const temp = await res.json();
    const issue = temp.data;
    // console.log(issue.data);
    const statusBg = issue.status === 'open' ? 'bg-green-300' : 'bg-purple-300';
    const priority = issue.priority === 'high' ? 'bg-red-500' :
        issue.priority === 'medium' ? 'bg-yellow-500' :
            'bg-gray-400';
    issueModalCard.innerHTML = `
   <div class="modal-box px-8 py-8">
            <h3 class="text-2xl font-bold">${issue.title}</h3>
            <div class="flex gap-2 items-center mt-3">
                <div class="badge ${statusBg}">${issue.status.toUpperCase()}</div>
                <div class="h-1 w-1 bg-gray-500 rounded-full"></div>
                <div class="text-[12px] text-[#64748B]">Opened by ${issue.assignee === "" ? 'User Not Found' : issue.assignee}</div>
                <div class="h-1 w-1 bg-gray-500 rounded-full"></div>
                <div class="text-[12px] text-[#64748B]">${new Date(issue.updatedAt).toLocaleDateString("en-US")}</div>
            </div>
            <div class="card-actions justify-start mt-5">
                ${issue.labels.map((label) => {
        let badgeStyle = "";
        let img = "";
        if (label === "bug") {
            badgeStyle = "badge-error";
            img = '<img src="assets/BugDroid.png" alt="">';
        }
        else if (label === "help wanted") {
            badgeStyle = "badge-warning";
            img = '<img src="assets/Lifebuoy.png" alt="">';
        }
        else if (label === "enhancement") {
            badgeStyle = "badge-success";
            img = '<img src="assets/Sparkle.png" alt="">';
        }
        else if (label === "good first issue") {
            badgeStyle = "badge-accent";
            img = '<img src="assets/good.png" alt="">';
        }
        else if (label === "documentation") {
            badgeStyle = "badge-neutral";
            img = '<img src="assets/documentation.png" alt="">';
        }

        return `
                            <div class="badge ${badgeStyle} badge-soft font-semibold">${img} ${label.toUpperCase()}</div>
                            `
    }).join(" ")}
            </div>

            <p class="line-clamp-2 py-5 text-[#64748B]">${issue.description}</p>
            <div class="flex bg-base-200 p-4 gap-40 rounded-md">
                <div>
                    <p>Assignee:</p>
                    <p>${issue.assignee === "" ? 'User Not Found' : issue.assignee}</p>
                </div>
                <div>
                    <p>Priority:</p>
                    <p class="badge ${priority} font-semibold text-white py-1 px-6">${issue.priority.toUpperCase()}</p>
                </div>
            </div>
            <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                </form>
            </div>
        </div>`
    issueModalCard.showModal();
}
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
        const statusImg = issue.status === 'open' ? './assets/Open-Status.png' : './assets/Closed-Status.png';
        const priority = issue.priority === 'high' ? 'badge-error' :
            issue.priority === 'medium' ? 'badge-warning' :
                'badge-ghost text-[#9CA3AF]';
        const topBorder = issue.status === 'open' ? 'border-t-green-500' : 'border-t-purple-500';
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div class="card bg-base-100 w-full h-[350px] md:h-[300px] shadow-sm border-t-3 ${topBorder}" onclick="issueModal(${issue.id})">
                <!-- status and badge -->
                <div class="flex justify-between px-7 mt-6">
                    <img src="${statusImg}"  alt="">
                    <div class="badge ${priority} font-semibold badge-soft py-1 px-6">${issue.priority.toUpperCase()}</div>
                </div>
                <div class="card-body">
                    <h2 class="card-title">
                        ${issue.title}
                    </h2>
                    <p class="line-clamp-2">${issue.description}</p>
                    <div class="card-actions justify-start">
                        ${issue.labels.map((label) => {
            let badgeStyle = "";
            let img = "";
            if (label === "bug") {
                badgeStyle = "badge-error";
                img = '<img src="assets/BugDroid.png" alt="">';
            }
            else if (label === "help wanted") {
                badgeStyle = "badge-warning";
                img = '<img src="assets/Lifebuoy.png" alt="">';
            }
            else if (label === "enhancement") {
                badgeStyle = "badge-success";
                img = '<img src="assets/Sparkle.png" alt="">';
            }
            else if (label === "good first issue") {
                badgeStyle = "badge-accent";
                img = '<img src="assets/good.png" alt="">';
            }
            else if (label === "documentation") {
                badgeStyle = "badge-neutral";
                img = '<img src="assets/documentation.png" alt="">';
            }

            return `
                            <div class="badge ${badgeStyle} badge-soft font-semibold">${img} ${label.toUpperCase()}</div>
                            `
        }).join(" ")}
                    </div>
                </div>
                <hr class="text-gray-300">
                <!-- id, name and date section -->
                <div class="text-[#64748B] text-[12px] p-4">
                    <p>#${issue.id} by ${issue.author}</p>
                    <p>${new Date(issue.createdAt).toLocaleDateString("en-US")}</p>
                </div>
            </div>
            `
        displayContainer.append(newDiv);
        numberOfissues++;
    });
    hideLoading();
    const numberOfissuesContainer = document.getElementById('numberOfissues');
    numberOfissuesContainer.innerHTML = `${numberOfissues} issues`;
}

document.getElementById('btn-search').addEventListener('click', async () => {
    const inputValue = document.getElementById('input-search').value;
    showLoading();
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputValue.toLowerCase()}`)
    
    const data = await res.json();
     alldata = data.data;
     hideLoading();
     displayissues(alldata);
})