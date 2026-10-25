const invitationBoardName = document.getElementById("invitationBoardName");
const invitationBoardNameDisplay = document.getElementById(
  "invitationBoardNameDisplay",
);
const invitationBoardDescription = document.getElementById(
  "invitationBoardDescription",
);
const invitationBoardOwner = document.getElementById("invitationBoardOwner");
const visibilityTag = document.querySelector(".visibility-tag");
const invitationBoardMembers = document.getElementById(
  "invitationBoardMembers",
);
const joinBoardBtn = document.getElementById("joinBoardBtn");

async function getABoard() {
  const url = window.location.pathname.split("/");
  const id = url[3];
  const result = await getJoinBoard(id);
  if (!result.success) {
    return alert(result.message);
  }
  console.log(result.data);
  
  displayInviteBoard(result.data);
  joinBtnHandler(result.data)
}
async function joinABoard(boardID) {
  const url = window.location.pathname.split("/");
  const code = url[3];
  const result = await joinBoard(boardID, code)
  if (!result.success) {
    alert(result.message)
    return window.location.href = '/boards'
  }
  alert(result.message)
  return window.location.href = '/boards' 
}
function getInitials(fullname) {
  const parts = fullname.trim().split(/\s+/);
  const firstInitial = parts[0][0];
  const lastInitial = parts[parts.length - 1][0];
  const initial = (firstInitial + lastInitial).toUpperCase();
  return initial;
}
function displayInviteBoard(board) {
  const initial = getInitials(board.fullname);
  invitationBoardName.textContent = board.name;
  invitationBoardNameDisplay.textContent = board.name;
  invitationBoardDescription.textContent = board.description;
  invitationBoardOwner.innerHTML = `
                                    <span class="avatar avatar--xs" aria-hidden="true" id="avatar">${initial}</span>
                                    ${board.fullname}
                                    `;
  visibilityTag.classList.add(`visibility-tag--${board.visibility}`);
  visibilityTag.textContent =
    board.visibility.charAt(0).toUpperCase() + board.visibility.slice(1);
  if (board.memberNum === 1) {
    invitationBoardMembers.textContent = `${board.memberNum} member`;
  } else {
    invitationBoardMembers.textContent = `${board.memberNum} members`;
  }
}
function joinBtnHandler(board) {
  joinBoardBtn.addEventListener("click", async () => {
    const boardID = { boardID: Number(board.id) }
    await joinABoard(boardID)
  });
}
getABoard();
