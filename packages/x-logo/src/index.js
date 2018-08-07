import React from 'react';
import seedrandom from 'seedrandom';
import createColor from './color';
import createNoise from './noise';
import createPolygon from './polygon';
import createTriangles from './triangles';
import { pointsToString } from './util';

const options = {
	seed: Math.random(),
	density: 15,
	thickness: 16,
	hueShift: 45
};

// Create a random number generator
const random = seedrandom(options.seed);

// Create the standard size X for use as the clip mask
const polygonPoints = createPolygon({
	x: 0,
	y: 0,
	width: 100,
	height: 100,
	thickness: options.thickness
});

// Create a larger X "canvas" to place points and shapes within
const polygonCanvas = createPolygon({
	x: -25,
	y: -25,
	width: 150,
	height: 150,
	thickness: options.thickness * 1.25
});

const animations = `
	@keyframes logoHueRotate {
		0%   { filter: hue-rotate(0); }
		100% { filter: hue-rotate(359.9deg); }
	}

	@keyframes logoShimmer {
		0%   { opacity: 1;   }
		50%  { opacity: 0.8; }
		100% { opacity: 1;   }
	}
`;

// Create random points within the given canvas and with the given seed
const noise = createNoise(options.density, polygonCanvas, random);

// Join the random points to create a set of triangles
const triangles = createTriangles(noise);

// Create a random color generator from the given hue and seed
const getColor = createColor(options.hueShift, random);

// Create an array to iterate over to draw each triangle
const numberOfTriangles = Array.from(Array(triangles.length / 3).keys());

export default () => (
	<React.Fragment>
		<style>{animations}</style>
		<svg
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				animation: 'logoHueRotate 30s linear infinite'
			}}>

			<clipPath id="logo-clip-path">
				<polygon points={pointsToString(polygonPoints)} />
			</clipPath>

			<g clipPath="url(#logo-clip-path)">
				{numberOfTriangles.map((i) => {
					const points = [
						noise[triangles[i * 3]],
						noise[triangles[i * 3 + 1]],
						noise[triangles[i * 3 + 2]]
					];

					const color = getColor(noise[triangles[i * 3]]);

					return (
						<polygon
							key={`triangle-${i}`}
							fill={color}
							stroke={color}
							strokeWidth="0.1%"
							strokeLinejoin="round"
							points={pointsToString(points)}
							style={{
								animation: `logoShimmer ${(random() * 10 + 5).toFixed(2)}s linear infinite`
							}}
						/>
					);
				})}
			</g>
		</svg>
	</React.Fragment>
);
