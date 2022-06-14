<script>
	import { SvelteToast } from '@zerodevx/svelte-toast'
</script>

<svelte:head>
	<title>SkinsTracker</title>
</svelte:head>
<SvelteToast options={{ intro: { x: -200 } }} />
<slot />
