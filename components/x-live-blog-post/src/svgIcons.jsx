import { h } from '@financial-times/x-engine'

/*
These icons have been copied from Origami as their TSX components are currently incompatible with next-article.
Once this is resolved, these components should be replaced with o-share https://github.com/Financial-Times/origami/tree/main/components/o-share.
 */
export function TwitterSVG() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
			<path d="M21.647 18.469 28.932 10h-1.726l-6.326 7.353L15.827 10H10l7.64 11.12L10 30h1.726l6.68-7.765L23.744 30h5.827l-7.924-11.531Zm-2.365 2.748-.774-1.107-6.16-8.81H15l4.971 7.11.774 1.107 6.462 9.242h-2.652l-5.273-7.541Z" />
		</svg>
	)
}

export function FacebookSVG() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
			<path d="M643.9 342h-48.2c-37.8 0-45.1 18-45.1 44.3v58.1h90.1l-11.7 91h-78.4V769h-94V535.5H378v-91h78.6v-67.1c0-77.9 47.6-120.3 117.1-120.3 33.3 0 61.9 2.5 70.2 3.6V342z" />
		</svg>
	)
}

export function LinkedInSVG() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
			<path d="M264.4 426.2h106.2v341.4H264.4V426.2zm53.2-169.7c-34.1 0-61.6 27.6-61.6 61.5 0 34 27.5 61.5 61.6 61.5 33.9 0 61.5-27.6 61.5-61.5-.1-34-27.6-61.5-61.5-61.5zm323.1 161.2c-51.6 0-86.2 28.3-100.4 55.1h-1.5v-46.7H437.2v341.4h106V598.7c0-44.5 8.4-87.7 63.6-87.7 54.5 0 55.1 50.9 55.1 90.5v166H768V580.3c0-91.9-19.9-162.6-127.3-162.6z" />
		</svg>
	)
}
