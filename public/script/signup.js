const createBtn = document.getElementById('createBtn')
const nameText = document.getElementById('fullname')
const usernameText = document.getElementById('username')
const mailText = document.getElementById('email')
const passText = document.getElementById('password')
const confirmText = document.getElementById('confirm-password')

function inputValidation() {
    createBtn.addEventListener('click', (e) => {
        e.preventDefault()
        if (nameText.value.trim() === "") {
            return alert("Please enter your full name.");
        }
        if (usernameText.value.trim() === "") {
            return alert('Please enter your username.')
        }
        if (mailText.value.trim() === "") {
            return alert("Please enter your email address.");
        }
        if (passText.value.trim() === "") {
            return alert("Please enter a password.");
        }
        if (confirmText.value.trim() === "") {
            return alert("Please confirm your password.");
        }
        if (/\d/.test(nameText.value)) {
            return alert('Name must not contain a number.')            
        }
        if (passText.value.length < 8) {
            return alert('Password must be at least 8 characters.')
        }
        if (passText.value !== confirmText.value) {
            return alert('Passwords do not match.')
        }
        const info = {
            name: nameText.value,
            username: usernameText.value,
            email: mailText.value,
            password: passText.value
        }
        createAccount(info)
    })
}
async function createAccount(data) {
    const result = await postAccount(data)

    if (!result.success) {
        clearFields()
        return confirm(result.message)
    }
    if (result.success) {
        clearFields()
        alert(result.message)
        window.location.href = '/login'
    }
}
function clearFields() {
    nameText.value = ''
    usernameText.value = ''
    mailText.value = ''
    passText.value = ''
    confirmText.value = ''
}
inputValidation()