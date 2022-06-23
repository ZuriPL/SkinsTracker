<script>
	import { SvelteToast } from '@zerodevx/svelte-toast'
</script>

<style>
	:global(:root) {
        --border-color: #e5e5e5;
        --background-color: white;
        --text-color: black;
        --accent-color: #5f91f0;
        --accent-darker: #4480de;
        --link-color: #487ad6;
    }
</style>

<svelte:head>
	<title>SkinsTracker</title>
</svelte:head>

<SvelteToast options={{ intro: { x: -200 } }} />

<slot />
