const loginForm = document.getElementById('loginForm');
const logoutForm = document.getElementById('logoutForm');
const himessage = document.getElementById('himessage');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const data = await response.json();
        if (response.ok) {
            // loginForm.style.display = "none";
            // logoutForm.style.display = "flex";
            // himessage.innerText = `Hi ${data.user}`
            // console.log(data.message);
            window.location.href = "./dashboard.html"
        } else {
            document.getElementById('messagelogin').innerText = `${data.message}`;
        }
    } catch (err) {
        document.getElementById('messagelogin').innerText = `Something went wrong: ${err.message}`;
    }

})