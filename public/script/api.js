async function postAccount(data) {
  const result = await fetch("/register/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await result.json();
}
async function userLogin(data) {
  const result = await fetch("/login/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await result.json();
}
async function getBoards() {
  const result = await fetch("/boards/api");
  return await result.json();
}
async function postBoard(data) {
  const result = await fetch("/boards/new/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await result.json();
}
async function getBoard(id) {
  const result = await fetch(`/boards/${id}/api`);
  return await result.json();
}
async function getMembers(boardID) {
  const result = await fetch(`/users/api?boardID=${boardID}`);
  return await result.json();
}
async function postTask(data) {
  const result = await fetch("/tasks/new/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await result.json();
}
async function getTasks(id) {
  const result = await fetch(`/tasks/api?boardID=${id}`)
  return await result.json()
}
async function getJoinBoard(id) {
  const result = await fetch(`/boards/join/${id}/api`);
  return await result.json();
}
async function joinBoard(boardID, code) {
  const result = await fetch(`/boards/join/${code}/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(boardID)
  })
  return await result.json()
}