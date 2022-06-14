<script>
    import {user} from '$lib/user'
    import { goto } from '$app/navigation'
    import { onMount } from 'svelte/internal';
    import { SvelteToast, toast } from '@zerodevx/svelte-toast'
    import ErrorMsg from '../components/errorMsg.svelte'
    let show
    let urlParams

    onMount(() => {
        urlParams = new URLSearchParams(location.search)
        if (urlParams.has('reason') && urlParams.get('reason') === 'nologin') {
            toast.push(`
            <p style="display:flex;align-items:center;gap:0.5rem;font-size:1.125rem;padding-right:0.5rem"><svg style="width:35px;height:35px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
            </svg> Session expired, please log in</p>`, 
            {
                theme: {
                    '--toastBackground': '#f81f1f',
                    '--toastBarBackground': '#bb0b0b',
                    '--toastBorderRadius': '0.5rem',
                    '--toastWidth': 'auto'
                },
                dismissable: false
            })
        }
    })
    async function handleLogin() {
        const email = document.querySelector('#email').value
        const password = document.querySelector('#pass').value
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

<SvelteToast options={{ intro: { x: -100 } }} />

<div class="center main">

    <h2>Log In</h2>
    
    <div class="form-container">
        <label for="email">Email:</label>
        <input type="email" id="email" />
        <label for="pass">Password:</label>
        <input type="password" id="pass" />
        <ErrorMsg msg="Invalid login or password" show="{show}" style="" />

        <button on:click="{handleLogin}">Login</button>
    </div>

    <a href="/signup" class="link">Don't have an account? Sign Up</a>
</div>
