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
    
    issueModalCard.innerHTML = `
   <div class="modal-box px-8 py-8">
            <h3 class="text-2xl font-bold">${issue.title}</h3>
            <div class="flex gap-2 items-center mt-3">
                <div class="badge badge-success">${issue.status}</div>
                <div class="h-1 w-1 bg-gray-500 rounded-full"></div>
                <div class="text-[12px] text-[#64748B]">Opened by </div>
                <div class="h-1 w-1 bg-gray-500 rounded-full"></div>
                <div class="text-[12px] text-[#64748B]">${issue.updatedAt}</div>
            </div>
            <div class="card-actions justify-start mt-5">
                <div class="badge badge-error badge-soft font-semibold"><img src="assets/BugDroid.png" alt="">Bug</div>
                <div class="badge bg-yellow-100 font-semibold badge-warning badge-soft"><img src="assets/Lifebuoy.png"
                        alt="">HELP WANTED
                </div>
            </div>

            <p class="line-clamp-2 py-5 text-[#64748B]">${issue.description}</p>
            <div class="flex bg-base-200 p-4 gap-40 rounded-md">
                <div>
                    <p>Assignee:</p>
                    <p>${issue.assignee}</p>
                </div>
                <div>
                    <p>Priority:</p>
                    <p class="badge bg-red-500 text-white font-semibold badge-soft py-1 px-6">High</p>
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
        const statusImg = issue.status === 'open' ? 'assets/Open-Status.png' : 'assets/Closed-status.png';
        const priority = issue.priority === 'high' ? 'badge-error' :
            issue.priority === 'medium' ? 'badge-warning' :
                'badge-ghost text-[#9CA3AF]';
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div class="card bg-base-100 w-full h-[350px] md:h-[300px] shadow-sm" onclick="issueModal(${issue.id})">
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
                        <div class="badge badge-error badge-soft font-semibold"><img src="assets/BugDroid.png" alt="">${issue.labels[0]}</div>
                        <div class="badge bg-yellow-100 font-semibold badge-warning badge-soft"><img src="assets/Lifebuoy.png" alt="">${issue.labels[1]}
                        </div>
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
    const numberOfissuesContainer = document.getElementById('numberOfissues');
    numberOfissuesContainer.innerHTML = `${numberOfissues} issues`;
}