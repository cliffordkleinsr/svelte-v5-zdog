<script lang="ts">
	import Zdog from 'zdog';
	import { mount } from '../index.js';
	import type { PrimitiveProps } from '../types.js';
	type Props = {
		children?: import('svelte').Snippet;
		[key: string]: any;
	} & PrimitiveProps<Zdog.Shape> & {};

	let props: Props = $props();
	export const node = mount(Zdog.Shape, props);
</script>

{@render props.children?.()}
