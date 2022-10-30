<style>
    :global(*) {
        padding: 0px;
        margin: 0px;
        font-family: 'Roboto', sans-serif;
        box-sizing: border-box;
    }
    :global(:root) {
        --border-color: #e5e5e5;
        --background-color: white;
        --text-color: black;
        --accent-color: #5f91f0;
        --accent-darker: #4480de;
        --link-color: #487ad6;

        color: var(--text-color);
        /* color: hsl(217, 70%, 49%); */
    }
    :global(.hide) {
        display: none !important;
    }
    nav { 
        padding: 1.5rem 3rem;
        border-bottom: 2px solid var(--border-color);
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 100;
        background-color: var(--background-color);
    }
    nav > section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: min(100vw, 700px);
        background-color: var(--background-color);
        z-index: 1;
    }
    h1 {
        font-size: 2em;
        color: var(--text-color);
    }
    a, a:visited {
        text-underline-offset: 1px;
        color: var(--link-color) !important;
    }
    .hamburger {
        all: unset;
        height: 24px;
        padding: 0.25rem;
    }
    .hamburger:hover, .open .hamburger {
        outline: 1px solid var(--accent-color);
        border-radius: 0.25rem;
    }
    .menu {
        position: absolute;
        left: 0;
        bottom: 1px;
        border-bottom: 2px solid var(--border-color);
        padding: 1.5rem max(calc(calc(100vw - 700px) / 2), 3rem);
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
        background-color: var(--background-color);
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
    .hamburger-wrapper {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .offline-msg {
        position: absolute;
        right: 50%;
        bottom: -15px;
        transform: translateY(100%) translateX(50%);
        background-color: var(--background-color);
        box-shadow: 2px 2px 6px hsla(0 0% 0% / 0.4);
        padding: 0.75rem;
        border-radius: 0.5rem;
        width: 30ch;
        display: none;
    }
    @media only screen and (max-width: 870px) {
        .offline-msg {
            right: 0;
            transform: translateY(100%)  translateX(calc(3rem + 32px));
        }
    }
    .offline-wrapper {
        visibility: hidden;
        position: relative;
        height: 24px;
    }
    :global(.offline) .offline-wrapper {
        visibility: visible;
    }
    .offline-wrapper hr {
        margin-block: 0.5rem;
        background-color: var(--border-color);
        height: 2px;
        border: none;
    }
    .offline-wrapper:hover .offline-msg {
        display: block;
    }
</style>

<script>
    import { user } from '$lib/user.js' 
    import { onMount } from 'svelte'
    import { beforeNavigate } from '$app/navigation'
    import { SvelteToast } from '@zerodevx/svelte-toast'
    import { inject } from '@vercel/analytics'

    inject()

    let isOpen = false
    let mounted
    
    onMount(() => { 
        mounted = true

        function handleNetworkChange(_) {
            if (navigator.onLine) {
                document.body.classList.remove("offline");
            } else {
                document.body.classList.add("offline");
            }
        }
        
        handleNetworkChange()
        window.addEventListener("online", handleNetworkChange);
        window.addEventListener("offline", handleNetworkChange);
        }
    )

    beforeNavigate(() => isOpen = false)

    $: if($user == '' && mounted) checkUser()

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
        <div class="hamburger-wrapper">
            <div class="offline-wrapper">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="black" d="M3.27,1.44L2,2.72L4.05,4.77C2.75,5.37 1.5,6.11 0.38,7C4.2,11.8 8.14,16.67 12,21.5L15.91,16.63L19.23,19.95L20.5,18.68C14.87,13.04 3.27,1.44 3.27,1.44M12,3C10.6,3 9.21,3.17 7.86,3.5L9.56,5.19C10.37,5.07 11.18,5 12,5C15.07,5 18.09,5.86 20.71,7.45L16.76,12.38L18.18,13.8C20.08,11.43 22,9 23.65,7C20.32,4.41 16.22,3 12,3M5.57,6.29L14.5,15.21L12,18.3L3.27,7.44C4,7 4.78,6.61 5.57,6.29Z" />
                </svg>
                <div class="offline-msg">
                    <h2>You are offline</h2>
                    <hr>
                    <p>In offline mode the functionality is limited and data might be old</p>
                </div>
            </div>
            <button class="hamburger" aria-label="toggle menu" on:click="{() => {
                isOpen ? isOpen = '' : isOpen = 'open'
            }}">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
            </svg>
        </button>
    </div>
    </section>
    <div class="menu">
        <section>
            <h2 class="menu-header">Account</h2>
            <ul>
                <li><a href="/api/logout">Log out</a></li>
                <li><a href="/change-email">Change email</a></li>
                <li><a href="/change-password">Change password</a></li>
                <li><a href="/delete-account">Delete account</a></li>
            </ul>
        </section>
        <section>
            <h2 class="menu-header">Site</h2>
            <ul>
                <li><a href="/help">Help/Support</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/faq">FAQ</a></li>
            </ul>
        </section>
        <section>
            <h2 class="menu-header">Contact</h2>
            <ul>
                <li><a href="https://discord.com/users/432899203157458962" target="_blank">Discord</a></li>
                <li><a href="https://twitter.com/ZuriPOL" target="_blank">Twitter</a></li>
                <li><a href="https://github.com/ZuriPL" target="_blank">GitHub</a></li>
            </ul>
        </section>
    </div>
</nav>
<div class="wrapper" on:click="{() => {isOpen = ''}}">
    <slot></slot>
</div>