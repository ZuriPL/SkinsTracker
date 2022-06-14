<script>
    import {user} from '$lib/user'
    import { goto } from '$app/navigation'
    import ErrorMsg from '../components/errorMsg.svelte'
    let show1
    let show2
    
    async function handleSignUp() {
        show1 = false
        show2 = false
        const email = document.querySelector('#email').value
        const password = document.querySelector('#pass').value
        if (email == '' || password == '') return
        if (document.querySelector('#confirm-pass').value != password) return show2 = true
        let res1 = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({
                login: email,
                password: password
            })
        })
        let text1 = await res1.json()
        
        if (text1.error != undefined) {
            show1 = true
            return
        }

        let res2 = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                login: email,
                password: password
            })
        })
        let text2 = await res2.json()

        user.set(text2)

        console.log(window.location.toString().split('=')[1])
        goto('/')
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
        border-radius: 1rem;
        padding: 1rem;
        position: relative;
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        flex-direction: column;
    }
    .link {
        color: #5f91f0;
        margin-top: 0.75rem;
        font-size: 0.85rem;
        text-underline-offset: 1px;
    }
    .link:hover {
        color: #175dcf;
    }
    input {
        width: 16rem;
        border-radius: 0.4rem;
        border: 2px solid var(--border-color);
        outline: none;
        padding: 0.25rem;
    }
    input:focus {
        border: 2px solid #5f91f0;
    }
    button {
        all: unset;
        padding: 0.5rem 1rem;
        background-color: #5f91f0;
        color: white;
        border-radius: 0.5rem;
        margin-top: 1rem;
    }
    button:hover {
        background-color: #4480de;
    }
</style>

<div class="center main">

    <h2>Sign Up</h2>
    
    <div class="form-container">
        <label for="email">Email:</label>
        <input type="email" id="email" />
        <label for="pass">Password:</label>
        <input type="password" id="pass" />
        <label for="confirm-pass">Confirm password:</label>
        <input type="password" id="confirm-pass" />
        <ErrorMsg msg="User already exists" show="{show1}" style="" />
        <ErrorMsg msg="Passwords don't match" show="{show2}" style="" />

        <button on:click="{handleSignUp}">Sign Up</button>
    </div>

    <a href="/login" class="link">Have an account? Login</a>
</div>
