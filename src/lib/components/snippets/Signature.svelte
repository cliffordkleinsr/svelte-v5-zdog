<script lang="ts">
	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();
</script>

<span class={[className, 'relative']}>
	<small class="absolute -top-3 -left-3">by</small>
	<a href="https://carlos-aguilar.com" target="_blank">carlos-aguilar.com</a>
	<p>Ported to svelte5 by</p>
	<a href="https://github.com/cliffordkleinsr" target="_blank">Cliffordkleinsr</a>
</span>
