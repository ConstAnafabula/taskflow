const emptyState = document.querySelectorAll('.empty-state')
const toDoCards = document.getElementById('todo-cards')
const inProgressCards = document.getElementById('in-progress-cards')
const doneCards = document.getElementById('done-cards')
const collapseBtn = document.getElementById("collapseButton");
const currentPage = document.getElementById('current-page')
const boardTitle = document.getElementById('board-title')
const badgeVisibility = document.getElementById('badge-visibility')
const boardDesc = document.getElementById('board-description')
const boardCreated = document.getElementById('board-created')
const boardUpdated = document.getElementById('board-updated')
const ownerName = document.getElementById('owner-name')
const visibilityDetail = document.getElementById('visibility-detail')
const joinCode = document.getElementById('join-code')
const createdDetail = document.getElementById('created_at-detail')
const sideBarUsername = document.querySelector('.sidebar-user-name')
const memberNumber = document.getElementById('member-number')
const totalTasks = document.getElementById('total-tasks')
const totalCompleted = document.getElementById('total-completed')
const totalInProgress = document.getElementById('total-in-progress')
const totalOverdue = document.getElementById('total-overdue')
const completionRate = document.getElementById('completion-rate')
const toDoCount = document.getElementById('to-do-count')
const inProgressCount = document.getElementById('in-progress-count')
const inReviewCount = document.getElementById('in-review-count')
const doneCount = document.getElementById('done-count')

async function init() {
  const url = window.location.pathname.split('/')
  const id = Number(url[2])

  const [board, members, tasks] = await Promise.all([
    getBoard(id),
    getMembers(id),
    getTasks(id)
  ])
  if (!board.success) {
    return alert(board.message)
  }
  if (!members.success) {
    return alert(members.message)
  }
  if (!tasks.success) {
    return alert(tasks.message)
  }
  collapseBtnHandler()
  buttonHandler(board.data)
  displayData(board.data, members.data, tasks.data)  
  displayToDoCards(tasks.data)
  displayDoneCards(tasks.data)
}
function collapseBtnHandler() {
  collapseBtn.addEventListener("click", () => {
    document.querySelectorAll(".side-card-title").forEach((title) => {
      title.style.display = 'none';
    });
  });
}

function dueToDate(task) {
  return new Date(task.due_date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  })
}
function buttonHandler(board) {
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var value = `http://localhost:3000/boards/join/${board.board.join_code}`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(value).catch(function () {});
      }
      var original = btn.innerHTML;
      var isIconOnly = btn.classList.contains("copy-btn");
      btn.classList.add("copy-btn--copied");
      if (!isIconOnly) {
        btn.textContent = "Copied!";
      }
      setTimeout(function () {
        btn.classList.remove("copy-btn--copied");
        if (!isIconOnly) {
          btn.innerHTML = original;
        }
      }, 1500);
    });
  });
}
function displayData(board, members, tasks) {
  const created = handleCreatedAt(board.board.created_at)
  const updated = handleUpdatedHour(board.board)
  const completedNumber = tasks.filter(t => t.status === 'done')
  const inProgressNumber = tasks.filter(t => t.status === 'in-progress')
  const toDoNumber = tasks.filter(t => t.status === 'to-do')
  const inReviewNumber = tasks.filter(t => t.status === 'in-review')

  currentPage.textContent = board.board.name
  boardTitle.textContent = board.board.name
  if (board.board.visibility === 'private') {
   badgeVisibility.textContent = 'Private Board'
   visibilityDetail.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke="currentColor" stroke-width="1.9" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="1.9" /></svg>Private` 
  } else if (board.board.visibility === 'shared') {
    badgeVisibility.textContent = 'Shared Board'
    visibilityDetail.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke="currentColor" stroke-width="1.9"/><path d="M9 10.5V7.5a4 4 0 0 1 7-2.8" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>Shared`
  }
  boardDesc.textContent = board.board.description
  boardCreated.textContent = `Created ${created}`
  boardUpdated.textContent = `Updated ${updated} ago`
  ownerName.textContent = board.board.owner_name
  joinCode.textContent = board.board.join_code
  createdDetail.textContent = created
  totalTasks.textContent = tasks.length
  totalCompleted.textContent = completedNumber.length
  totalInProgress.textContent = inProgressNumber.length
  memberNumber.textContent = members.length
  toDoCount.textContent = toDoNumber.length
  inProgressCount.textContent = inProgressNumber.length
  inReviewCount.textContent = inReviewNumber.length
  doneCount.textContent = completedNumber.length
}
function displayToDoCards(tasks) {
  emptyStateHandler(tasks)
  const todoCard = tasks.filter(t => t.status === 'to-do')

  const todo = todoCard.map(task => {
    return `
    <article class="task-card task-card--priority-${task.priority}">
      <span class="drag-handle" aria-hidden="true">
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none"><circle cx="2" cy="2" r="1.4" fill="currentColor" /><circle cx="8" cy="2" r="1.4" fill="currentColor" /><circle cx="2" cy="8" r="1.4" fill="currentColor" /><circle cx="8" cy="8" r="1.4" fill="currentColor" /><circle cx="2" cy="14" r="1.4" fill="currentColor" /><circle cx="8" cy="14" r="1.4" fill="currentColor" /></svg>
      </span>
      <div class="task-card-body">
        <div class="task-card-top">
          <div class="dropdown task-quick-edit">
            <input type="checkbox" id="qe-${task.id}" class="toggle-input" aria-hidden="true" />
            <label for="qe-${task.id}" class="task-menu-btn" aria-label="Quick edit">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="1.6" fill="currentColor" /><circle cx="12" cy="12" r="1.6" fill="currentColor" /><circle cx="19" cy="12" r="1.6" fill="currentColor" /></svg>
            </label>
            <div class="dropdown-panel task-menu-panel">
              <a href="#" class="dropdown-link">Edit task</a>
              <a href="#" class="dropdown-link">Move to…</a>
              <a href="#" class="dropdown-link">Duplicate</a>
              <a href="#" class="dropdown-link dropdown-link--danger">Delete</a>
            </div>
          </div>
        </div>
        <h4>${task.title}</h4>
        <p class="task-desc">${task.description}.</p>
        <div class="task-badges">
          <span class="priority-badge priority-badge--${task.priority}">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority</span>
          <span class="task-due">Due ${dueToDate(task)}</span>
        </div>
        <div class="task-footer">
          <div class="task-footer-left">
            <span class="task-stat" title="Checklist progress">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
              1/3
            </span>
            <span class="task-stat" title="Comments">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M4 5H20V16H8L4 19.5V5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" /></svg>
              2
            </span>
            <span class="task-stat" title="Estimated time">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.7" /><path d="M12 8V12L14.5 13.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" /></svg>
              30m
            </span>
          </div>
          <span class="avatar avatar--xs">JC</span>
        </div>
      </div>
    </article>
    `
  }).join('')
  toDoCards.innerHTML = todo
}
function displayInProgressCards(tasks) {
  const inProgressCard = tasks.filter(t => t.status === 'in-progress')

  const inProgress = inProgressCard.map(task => {
    return `
    <article class="task-card task-card--priority-${task.priority}">
      <span class="drag-handle" aria-hidden="true">
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none"><circle cx="2" cy="2" r="1.4" fill="currentColor" /><circle cx="8" cy="2" r="1.4" fill="currentColor" /><circle cx="2" cy="8" r="1.4" fill="currentColor" /><circle cx="8" cy="8" r="1.4" fill="currentColor" /><circle cx="2" cy="14" r="1.4" fill="currentColor" /><circle cx="8" cy="14" r="1.4" fill="currentColor" /></svg>
      </span>
      <div class="task-card-body">
        <div class="task-card-top">
          <div class="dropdown task-quick-edit">
            <input type="checkbox" id="qe-${task.id}" class="toggle-input" aria-hidden="true" />
            <label for="qe-${task.id}" class="task-menu-btn" aria-label="Quick edit">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="1.6" fill="currentColor" /><circle cx="12" cy="12" r="1.6" fill="currentColor" /><circle cx="19" cy="12" r="1.6" fill="currentColor" /></svg>
            </label>
            <div class="dropdown-panel task-menu-panel">
              <a href="#" class="dropdown-link">Edit task</a>
              <a href="#" class="dropdown-link">Move to…</a>
              <a href="#" class="dropdown-link">Duplicate</a>
              <a href="#" class="dropdown-link dropdown-link--danger">Delete</a>
            </div>
          </div>
        </div>
        <h4>${task.title}</h4>
        <p class="task-desc">${task.description}</p>
        <div class="task-badges">
          <span class="priority-badge priority-badge--${task.priority}">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority</span>
          <span class="task-due">Due ${dueToDate(task)}</span>
        </div>
        <div class="task-footer">
          <div class="task-footer-left">
            <span class="task-stat" title="Checklist progress">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
              1/3
            </span>
            <span class="task-stat" title="Comments">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M4 5H20V16H8L4 19.5V5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" /></svg>
              2
            </span>
            <span class="task-stat" title="Estimated time">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.7" /><path d="M12 8V12L14.5 13.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" /></svg>
              30m
            </span>
          </div>
          <span class="avatar avatar--xs">JC</span>
        </div>
      </div>
    </article>
    `
  }).join('')  
  inProgressCards.innerHTML = inProgress
}
function displayInReviewCards(tasks) {
  const inReviewCard = tasks.filter(t => t.status === 'in-review')
}
function displayDoneCards(tasks) {
  const doneCard = tasks.filter(t => t.status === 'done')
  const done = doneCard.map(task => {
    return `
    <article class="task-card task-card--priority-${task.priority}">
      <span class="drag-handle" aria-hidden="true">
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none"><circle cx="2" cy="2" r="1.4" fill="currentColor" /><circle cx="8" cy="2" r="1.4" fill="currentColor" /><circle cx="2" cy="8" r="1.4" fill="currentColor" /><circle cx="8" cy="8" r="1.4" fill="currentColor" /><circle cx="2" cy="14" r="1.4" fill="currentColor" /><circle cx="8" cy="14" r="1.4" fill="currentColor" /></svg>
      </span>
      <div class="task-card-body">
        <div class="task-card-top">
          <div class="dropdown task-quick-edit">
            <input type="checkbox" id="qe-${task.id}" class="toggle-input" aria-hidden="true" />
            <label for="qe-${task.id}" class="task-menu-btn" aria-label="Quick edit">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="1.6" fill="currentColor" /><circle cx="12" cy="12" r="1.6" fill="currentColor" /><circle cx="19" cy="12" r="1.6" fill="currentColor" /></svg>
            </label>
            <div class="dropdown-panel task-menu-panel">
              <a href="#" class="dropdown-link">Edit task</a>
              <a href="#" class="dropdown-link">Move to…</a>
              <a href="#" class="dropdown-link">Duplicate</a>
              <a href="#" class="dropdown-link dropdown-link--danger">Delete</a>
            </div>
          </div>
        </div>
        <h4>${task.title}</h4>
        <p class="task-desc">${task.description}.</p>
        <div class="task-badges">
          <span class="priority-badge priority-badge--${task.priority}">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority</span>
          <span class="task-due">Due ${dueToDate(task)}</span>
        </div>
        <div class="task-footer">
          <div class="task-footer-left">
            <span class="task-stat" title="Checklist progress">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
              1/3
            </span>
            <span class="task-stat" title="Comments">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M4 5H20V16H8L4 19.5V5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" /></svg>
              2
            </span>
            <span class="task-stat" title="Estimated time">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.7" /><path d="M12 8V12L14.5 13.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" /></svg>
              30m
            </span>
          </div>
          <span class="avatar avatar--xs">JC</span>
        </div>
      </div>
    </article>
    `
  }).join('')  
  doneCards.innerHTML = done
}
function handleCreatedAt(board) {
  return new Date(board).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}
function handleUpdatedHour(board) {
  if (board.created_at === board.updated_at) {
    return '—'
  }
  const updateDate = new Date(board.updated_at)
  const now = new Date

  const diffMs = now - updateDate
  const diffSecs = Math.floor(diffMs / (1000))
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffSecs < 60) {
    return `${diffSecs} second/s`
  } else if (diffMins < 60) {
    return `${diffMins} minute/s`
  } else if (diffHours < 23) {
    return `${diffHours} hour/s`
  } else {
    return `${diffDays} day/s`
  }
}
function emptyStateHandler(tasks) {
  if (tasks.length === 0) {
    return emptyState.forEach(e => {
      e.style.display = 'flex'
    })
  }
  return emptyState.forEach(e => {
    e.style.display = 'none'
  })
}
init()