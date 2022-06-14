<script>
    import {user} from '$lib/user'
    import { goto } from '$app/navigation'
    import { onMount } from 'svelte/internal';
    import toast from '$lib/toast.js'
    let urlParams
    let email
    let password

    onMount(() => {
        urlParams = new URLSearchParams(location.search)
        if (urlParams.has('reason') && urlParams.get('reason') === 'nologin') {
            toast('Session expired, please log in')
        }
    })
    async function handleLogin() {
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
            return toast('Invalid login or password')
        }
        user.set(text)
        if (urlParams.has('from')) {
            goto(urlParams.get('from'))
        } else {
            goto('/')
        }
    }
</script>


<style>
    :root {
        --toastContainerTop: auto;
        --toastContainerRight: auto;
        --toastContainerBottom: 1.5rem;
        --toastContainerLeft: 2rem;
    }
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

    <h2>Log In</h2>
    
    <div class="form-container">
        <label for="email">Email:</label>
        <input bind:value={email} type="email" id="email" />
        <label for="pass">Password:</label>
        <input bind:value={password} type="password" id="pass" />

        <button on:click="{handleLogin}">Login</button>
    </div>

    <a href="/signup" class="link">Don't have an account? Sign Up</a>
</div>
