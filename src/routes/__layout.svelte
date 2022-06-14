<style>
    :global(*) {
        padding: 0px;
        margin: 0px;
        font-family: 'Roboto', sans-serif;
        box-sizing: border-box;
    }
    :global(:root) {
        --border-color: #e5e5e5;
    }
    nav { 
        padding: 1.5rem 3rem;
        border-bottom: 2px solid var(--border-color);
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 100;
        background-color: white;
    }
    nav > section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: min(100vw, 750px);
        background-color: white;
        z-index: 1;
    }
    h1 {
        font-size: 2em;
        color: black;
    }
    a {
        text-underline-offset: 1px;
        color: #487ad6;
    }
    .hamburger {
        all: unset;
        height: 24px;
        padding: 0.25rem;
    }
    .hamburger:hover, .open .hamburger {
        outline: 1px solid #487ad6;
        border-radius: 0.25rem;
    }
    .menu {
        position: absolute;
        left: 0;
        bottom: 1px;
        border-bottom: 2px solid var(--border-color);
        padding: 1.5rem max(calc(calc(100vw - 750px) / 2), 4rem);
        transition: transform 500ms cubic-bezier(0.33, -0.01, 0.29, 0.99);
        width: 100%;
        background-color: white;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
    }
    section li {
        margin-block: 0.5rem;
        list-style: none;
    }
    .menu-header {
        margin-bottom: 0.75rem;
    }
    .open .menu {
        transform: translateY(100%);
    }
    :global(.wrapper::after) {
        content: '';
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        transition: background-color 500ms cubic-bezier(0.33, -0.01, 0.29, 0.99);
        pointer-events: none;
    }
    :global(.open ~ .wrapper::after) {
        pointer-events: all;
        background-color: hsl(0, 0%, 0%, 0.5);
    }
    nav::after {
        content: '';
        width: 100%;
        height: 100%;
        background-color: white;
        position: absolute;
        top: 0;
        left: 0;
    }
    .menu section {
        padding-right: 5rem;
    }
    ul {
        margin-bottom: 2rem;
    }
</style>

<script>
    import { user } from '$lib/user.js' 
    import { onMount } from 'svelte'
    import { SvelteToast } from '@zerodevx/svelte-toast'

    let isOpen = false
    let mode = 'light'

    async function checkUser() {
        let res = await fetch('/api/validateSession')
        let text = await res.json()
        if (text.msg === 'cookie valid') {
            let res = await fetch('/api/getUser')
            let obj = await res.json()
            user.set(obj)
        } else {
            if (!location.href.includes('/login')) {
                window.location = `/login?from=${window.location}`
            }
        }
	}
    let mounted
    onMount(() => {
        mounted = true
    })

    $: if($user == '' && mounted) {
        checkUser()
    }
</script>

<svelte:head>
    <title>SkinsTracker</title>
</svelte:head>
<SvelteToast options={{ intro: { x: -200 } }} />
<nav class="{isOpen}">
    <section>
        <a href="/" style="text-decoration: none;">
            <h1>SkinsTracker</h1>
        </a>
        <button class="hamburger" on:click="{() => {
            isOpen ? isOpen = '' : isOpen = 'open'
        }}">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
            </svg>
        </button>
    </section>
    <div class="menu">
        <section>
            <h2 class="menu-header">Account</h2>
            <ul>
                <li><a href="/">Change email</a></li>
                <li><a href="/">Change password</a></li>
                <li><a href="/api/logout">Log out</a></li>
                <li><a href="/">Delete account</a></li>
            </ul>
        </section>
        <section>
            <h2 class="menu-header">Site</h2>
            <ul>
                <li><a href="/">Switch to {mode == 'dark' ? 'light' : 'dark'} mode</a></li>
                <li><a href="/">About</a></li>
                <li><a href="/">FAQ</a></li>
                <li><a href="/">Help/Support</a></li>
            </ul>
        </section>
        <section>
            <h2 class="menu-header">Contact</h2>
            <ul>
                <li><a href="/">Twitter</a></li>
                <li><a href="/">Discord</a></li>
            </ul>
        </section>
    </div>
</nav>
<div class="wrapper" on:click="{() => {isOpen = ''}}">
    <slot></slot>
</div>