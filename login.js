const login = (event) =>{
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if(username === 'admin')
    {
        if(password === 'admin123')
        {
            window.location.href = "home.html";
        }
        else
        {
            alert('Invalid password')
        }
    }
    else
    {
        alert('Invalid username')
    }
}