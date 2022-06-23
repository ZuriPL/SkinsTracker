<script>
    import { user } from '$lib/user.js'
    import AddItem from '../components/addItem.svelte';
    import Item from '../components/item.svelte'

    let items = []

    $: if ($user != '') {
        let skins = []
        let skinsIds = $user.skins

        skinsIds.forEach(id => {
            skins.push(handler(id))
        });

        Promise.all(skins).then(skins => setItems(skins))
    }

    function setItems(arr) {
        items = arr
    }

    async function handler(id) {
        let res = await fetch(`/api/getSkin/${id}`)
        let skinRes = await res.json()
        skinRes.id = id
        return skinRes
    }

    function showPopup() {
        document.querySelector('.add-popup-bg').classList.remove('hide')
    }
</script>

<style>
    h2 {
        font-size: 4rem;
        margin-bottom: 2rem;
    }
    .center {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .main {
        margin-top: 4rem;
        margin-bottom: 1rem;
    }
    .slots-grid {
        border: 2px solid var(--border-color);
        border-radius: 1rem;
        max-width: 80ch;
        width: 90%;
        height: 400px;
        position: relative;
        overflow: hidden;
    }
    .slots-grid > .wrapper {
        overflow: overlay;
        height: 100%;
    }
    ::-webkit-scrollbar {
        width: 0.5rem;
        height: 0.5rem;
    }
    ::-webkit-scrollbar-thumb {
        background-color: var(--accent-color);
        border-radius: 100vh;
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: var(--accent-darker);
    }
    #add-item {
        all: unset;
        border-radius: 100%;
        padding: 0.75rem;
        background-color: var(--accent-color);
        box-shadow: 2px 2px 6px hsla(0 0% 0% / 0.4);
        height: 33px;
        margin-top: 1.5rem;
    }
    #add-item:hover {
        background-color: var(--accent-darker);
    }
    .spinner-container {
        display: grid;
        place-items: center;
        height: 100%;
    }
</style>

<div class="center main">

    <h2>Your skins:</h2>
    
    <div class="slots-grid">
        {#if $user == ''} 
            <div class="spinner-container">
                <img src="/loading.gif" alt="loading spinner">
            </div>
        {:else}
        <div class="wrapper">
            {#each items as item}
            <Item name="{item.name}" id="{item.id}" counter="{items.indexOf(item) + 1}" on:deleteskin="{_ => {
                items.splice(items.findIndex(el => el.id === item.id), 1)
                items = items
            }}"/>
            {/each}
        </div>
        {/if}
    </div>
    <button id="add-item" on:click="{showPopup}">
        <svg style="width:33px;height:33px" viewBox="0 0 24 24">
            <path fill="white" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </svg>
    </button>

    <AddItem on:additem="{e => {
        items = [...items, e.detail]
    }}" />
</div>
