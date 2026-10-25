const loginBtn = document.querySelector('.btn-primary')
const usernameText = document.getElementById('username')
const passwordText = document.getElementById('password')

function loginValidation() {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault()
        if (usernameText.value.trim() === '') {
            return alert('Please enter your username.')
        }
        if (passwordText.value.trim() === '') {
            return alert('Please enter your password')
        }
        const info = {
            username: usernameText.value.trim(),
            password: passwordText.value.trim()
        }
        login(info)
    })
}
async function login(data) {
    const result = await userLogin(data)
    
    if (!result.success) {
        return alert(result.message)
    }
    alert(result.message);
    window.location.href = '/dashboard'
}
loginValidation()