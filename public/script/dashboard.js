const createTaskBtn = document.getElementById("createTask");
const newTaskName = document.getElementById("new-task-name");
const newTaskBoard = document.getElementById("new-task-board");
const newTaskDue = document.getElementById("new-task-due");
const newTaskAssignee = document.getElementById("new-task-assignee");
const newTaskStatus = document.getElementById('new-task-status')
const newTaskPriority = document.getElementById('new-task-priority')
const newTaskNotes = document.getElementById("new-task-notes");

async function getBoardNames() {
  const result = await getBoards();
  if (!result.success) {
    console.log(result.message);

    return alert(result.message);
  }
  if (!result.data || result.data.length === 0) {
    newTaskBoard.disabled = true;
    newTaskAssignee.disabled = true;
    createTaskBtn.disabled = true;

    newTaskBoard.innerHTML = `<option value="">No boards available</option>`;
    newTaskAssignee.innerHTML = `<option value="">Select a board first</option>`;
    return;
  }
  displayBoardNames(result.data);
  await getAssignee(newTaskBoard.value);
  selectHandler(result.data);
  createTaskBtnHandler();
}
async function getAssignee(boardID) {
  const result = await getMembers(boardID);
  if (!result.success) {
    return alert(result.message);
  }
  displayMembers(result.data);
}
async function createNewTask(data) {
  const result = await postTask(data)
  if (!result.success) {
    return alert(result.message)
  }
  alert(result.message)
  return window.location.reload()
}
function dueDateHandler() {
  const selectedDate = new Date(newTaskDue.value);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  if (selectedDate < today) {
    return alert("The selected date is in the past");
  } else {
    return selectedDate;
  }
}

function displayBoardNames(board) {
  const option = board
    .map((b) => {
      return `
        <option value="${b.id}">${b.name}</option>
        `;
    })
    .join("");
  newTaskBoard.innerHTML = option;
}
function displayMembers(users) {
  const assignee = users
    .map((u) => {
      return `
        <option value="${u.id}">${u.fullname}</option>
        `;
    })
    .join("");
  newTaskAssignee.innerHTML = assignee;
}
function selectHandler(board) {
  newTaskBoard.addEventListener("change", async () => {
    const boardID = newTaskBoard.value;
    await getAssignee(boardID);
  });
}
function createTaskBtnHandler() {
  createTaskBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (!newTaskName.value?.trim()) {
      alert("Please enter ask name");
      return newTaskName.focus();
    } else if (!newTaskBoard.value?.trim()) {
      alert("Please select a board");
      return newTaskBoard.focus();
    } else if (!newTaskDue.value?.trim()) {
      alert('Please enter a due date')
      return newTaskDue.focus()
    } else if (!newTaskStatus.value?.trim()) {
      alert('Please select a status')
      return newTaskStatus.focus()
    } else if (!newTaskPriority.value?.trim()) {
      alert('Please select a priority')
    } else if (!newTaskAssignee.value?.trim()) {
      alert("Please select a assignee");
      return newTaskAssignee.focus();
    } else if (!newTaskNotes.value?.trim()) {
      alert("Please enter notes");
      return newTaskNotes.focus();
    }
    const date = dueDateHandler();
    const boardID = Number(newTaskBoard.value)
    const assigneeID = Number(newTaskAssignee.value)
    const data = {
      boardID: boardID,
      assigneeID: assigneeID,
      title: newTaskName.value.trim(),
      description: newTaskNotes.value,
      status: newTaskStatus.value.trim(),
      priority: newTaskPriority.value.trim(),
      due: newTaskDue.value
    }
    await createNewTask(data)
  });
}
getBoardNames();