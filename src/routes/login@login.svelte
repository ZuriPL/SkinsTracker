<script>
    import {user} from '$lib/user'
    import ErrorMsg from '../components/errorMsg.svelte'
    let show

    async function handleLogin() {
        const email = document.querySelector('#email').value
        const password = document.querySelector('#pass').value
        console.log(email)
        console.log(password)
        if (email == '' || password == '') return
        let res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                login: email,
                password: password
            })
        })
        let text = await res.json()
        if (text.error != undefined) {
            show = true
            return
        }
        user.set(text)
        console.log(window.location.toString().split('=')[1])
        if (window.location.toString().split('=')[1] != undefined) {
            window.location = window.location.toString().split('=')[1]
        } else {
            window.location = '/'
        }
    }
</script>


<style>
    h2 {
        font-size: 4rem;
        margin-bottom: 3rem;
        font-family: 'Roboto', sans-serif;
    }
    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .main {
        margin-top: 5rem;
    }
    .form-container {
        border: 2px solid var(--border-color);
        border-radius: 2rem;
        padding: 1rem;
        position: relative;
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        flex-direction: column;
    }
    .register {
        color: #5f91f0;
        margin-top: 0.75rem;
        font-size: 0.85rem;
        text-underline-offset: 1px;
    }
    .register:hover {
        color: #175dcf;
    }
    input {
        width: 16rem;
        height: 1.25rem;
        border-radius: 1rem;
        border: 2px solid var(--border-color);
        outline: none;
        padding: 0rem 0.25rem;
    }
    input:focus {
        border: 2px solid #5f91f0;
    }
    button {
        all: unset;
        padding: 0.5rem 1rem;
        background-color: #5f91f0;
        color: white;
        border-radius: 2rem;
        margin-top: 1rem;
    }
    button:hover {
        background-color: #4480de;
    }
</style>

<div class="center main">

    <h2>Log In</h2>
    
    <div class="form-container">
        <label for="email">Email:</label>
        <input type="email" id="email" />
        <label for="pass">Password:</label>
        <input type="password" id="pass" />
        <ErrorMsg msg="Invalid login or password" show="{show}" />

        <button on:click="{handleLogin}">Login</button>
    </div>

    <a href="/" class="register">Don't have an account? Register</a>
</div>
