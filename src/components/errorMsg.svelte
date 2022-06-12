<script>
    export let msg
    export let show
    export let style
</script>

<style>
    p {
        color: hsl(0, 100%, 60%);
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
    .hide {
        display: none;
    }
</style>

<p class="{show ? '' : 'hide'}" style="{style}"><svg style="width:18px;height:auto" viewBox="0 0 24 24">
    <path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
</svg>{msg}</p>