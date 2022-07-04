import { toast } from '@zerodevx/svelte-toast'
function toastWrapper({ text, type, dis = false }) {
	toast.push(
		`
        <p style="display:flex;align-items:center;gap:0.5rem;font-size:1.125rem;padding-right:0.5rem"><svg style="width:35px;height:35px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
            </svg> ${text}</p>`,
		{
			theme: {
				'--toastBackground': '#f81f1f',
				'--toastBarBackground': '#bb0b0b',
				'--toastBorderRadius': '0.5rem',
				'--toastWidth': 'auto',
				'--toastColor': '#fff',
			},
			dismissable: dis,
		}
	)
}

toastWrapper.pop = toast.pop

export default toastWrapper
