<script lang="ts">
	import { onMount, tick } from 'svelte';
	import Zdog from 'zdog';
	import { setZdog, setParent } from './index.js';
	import type {
		IllustrationProps,
		ZdogElement,
		Subscriber,
		ZdogContext,
		OnResize,
		OnPrerender,
		OnDragStart,
		OnDragMove,
		OnDragEnd
	} from './types.js';

	interface Props {
		width: number;
		height: number;
		class?: string;
		element?: ZdogElement;
		update?: Subscriber<Zdog.Anchor>;
		onResize?: OnResize;
		onPrerender?: OnPrerender;
		onDragStart?: OnDragStart;
		onDragMove?: OnDragMove;
		onDragEnd?: OnDragEnd;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let {
		width,
		height,
		class: className = '',
		element = 'canvas',
		update = () => () => void 0,
		onResize = () => void 0,
		onPrerender = () => void 0,
		onDragStart = () => void 0,
		onDragMove = () => void 0,
		onDragEnd = () => void 0,
		children,
		...rest
	}: Props = $props();

	let illu: Zdog.Illustration;
	let canvas = $state() as SVGSVGElement | HTMLCanvasElement;
	const ctx: ZdogContext = {
		scene: new Zdog.Anchor(),
		subscribers: [],
		subscribe: (sub) => {
			if (typeof sub === 'function') {
				ctx.subscribers.push(sub);
				return () => {
					ctx.subscribers = ctx.subscribers.filter((s) => s !== sub);
				};
			}

			return () => void 0;
		}
	};

	setZdog(ctx);
	setParent(ctx.scene);

	$effect.pre(() => {
		tick().then(() => {
			illu = new Zdog.Illustration({
				...rest,
				element: canvas,
				onResize(w, h) {
					onResize(this, w, h);
				},
				onPrerender(context) {
					onPrerender(this, context);
				},
				onDragStart(pointer) {
					onDragStart(this, pointer);
				},
				onDragMove(pointer, moveX, moveY) {
					onDragMove(this, pointer, moveX, moveY);
				},
				onDragEnd() {
					onDragEnd(this);
				}
			});

			illu.addChild(ctx.scene);
			illu.updateGraph();

			let last = 0;
			let frame: number;
			let unsubscribe = ctx.subscribe(update(ctx.scene));
			const render = (ms = 0) => {
				ctx.subscribers.forEach((sub) => sub(ms - last, ms));
				illu.updateRenderGraph();
				frame = requestAnimationFrame(render);
				last = ms;
			};

			render();

			return () => {
				unsubscribe();
				cancelAnimationFrame(frame);
			};
		});
	});
</script>

{#if element === 'canvas'}
	<canvas bind:this={canvas} {width} {height} class={className}></canvas>
{:else if element === 'svg'}
	<svg bind:this={canvas} {width} {height} class={className} />
{/if}

{@render children?.()}
