import { h } from '@financial-times/x-engine'

/*
These icons have been copied from Origami as their TSX components are currently incompatible with next-article.
Once this is resolved, these components should be replaced with o-share https://github.com/Financial-Times/origami/tree/main/components/o-share.
 */
export function TwitterSVG() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
			<path d="M417 720c193.2 0 298.9-160.1 298.9-298.9 0-4.5 0-9.1-.3-13.6 20.6-14.9 38.3-33.3 52.4-54.4-19.2 8.5-39.5 14.1-60.3 16.5 21.9-13.1 38.3-33.8 46.2-58.1-20.6 12.2-43.2 20.9-66.7 25.5-39.8-42.3-106.3-44.3-148.6-4.6-27.3 25.7-38.9 63.9-30.4 100.4-84.5-4.2-163.2-44.1-216.5-109.8-27.9 48-13.6 109.4 32.5 140.2-16.7-.5-33.1-5-47.7-13.1v1.3c0 50 35.3 93.1 84.3 103-15.5 4.2-31.7 4.8-47.4 1.8 13.8 42.8 53.2 72.1 98.1 72.9-37.2 29.2-83.1 45.1-130.5 45.1-8.4 0-16.7-.5-25-1.5 48 31 103.9 47.3 161 47.3" />
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
