const himessage = document.getElementById('himessage');
const message = document.getElementById('message');
const logoutForm = document.getElementById('logoutForm');

async function getUsername() {
    try {
        const response = await fetch('/dashboard');
        if (response.ok) {
            const userData = await response.json();
            const username = userData.username;
            himessage.innerText = `Hi ${username}`;
        } else {
            himessage.innerText = "Sorry, fetching username failed";
        }
    } catch (err) {
        message.innerText = `Failed to load username: ${err.message}`;
    }
}

logoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('/logout', {
            method: 'POST'
        })
        if (response.ok) {
            const data = await response.json();
            window.location.href = './index.html'
        } else {
            message.innerText = "Logout Failed"
        }
    } catch (err) {
        message.innerText = `Logout failed due to error: ${err.message}`
    }
});

getUsername();