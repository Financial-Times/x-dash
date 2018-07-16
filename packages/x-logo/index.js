import React, {Component, Fragment} from 'react';
import Poisson from 'poisson-disk-sampling';
import Delaunay from 'delaunator';
import {hsluvToHex} from 'hsluv';
import seedrandom from 'seedrandom';
import pointInPolygon from 'point-in-polygon';

const range = length => Array.from({length}, (_, i) => i);

const randomId = label => `${label}-${Math.floor(Math.random() * 0xffffff).toString(16)}`;

const keyframes = text => text;

const WithKeyframes = ({animations, render}) => {
	const [nameMap, stylesText] = Object.keys(animations).reduce(
		([map, styles], animationName) => [
			Object.assign(map, {
				[animationName]: randomId(`keyframe-${animationName}`),
			}),
			styles + `
				@keyframes ${map[animationName]} {
					${animations[animationName]}
				}
			`,
		],
		[{}, '']
	);

	return <Fragment>
		<style>{stylesText}</style>

		{render(nameMap)}
	</Fragment>;
};

const polygonPoints = points =>
	points
		.map(
			point => point.map(x => Math.round(x)).join(',')
		)
		.join(',');

const WithClipPath = ({clipPath, render}) => {
	const id = randomId('clip-path');
	return <Fragment>
		<clipPath id={id}>
			{clipPath}
		</clipPath>

		{render({clipPath: `url(#${id})`})}
	</Fragment>;
};

const xPoints = ({x, y, width, height, thickness}) => {
	const middleX = x + width / 2;
	const middleY = y + height / 2;

	return [
		[x, y + thickness],
		[middleX - thickness, middleY],
		[x, y + height - thickness],
		[x + thickness, y + height],
		[middleX, middleY + thickness],
		[x + width - thickness, y + height],
		[x + width, y + height - thickness],
		[middleX + thickness, middleY],
		[x + width, y + thickness],
		[x + width - thickness, y],
		[middleX, middleY - thickness],
		[x + thickness, y],
	];
}

class XLogo extends Component {
	constructor (props) {
		super(props);

		this.state = {
			update: 0
		};

		this.thickerX = xPoints({
			x: -25, y: -25,
			width: 150, height: 150,
			thickness: this.props.thickness * 1.25
		});

		this.random = seedrandom(this.props.seed);
		this.poisson = new Poisson([150, 150], 100 / this.props.density, 100, 30, this.random);
		this.points = this.poisson.fill()
			.map(([x, y]) => [x - 25, y - 25])
			.filter(point => pointInPolygon(point, this.thickerX));

		const hue = this.random() * 360;
		this.hues = [
			hue,
			hue + props.hueShift,
			hue - props.hueShift,
			hue + props.hueShift * 2,
		];

		this.triangles = Delaunay.from(this.points).triangles;

		this.triangleColours = range(this.triangles.length / 3).map(i =>
			this.getColor(this.points[this.triangles[i * 3]])
		);
	}

	getColor([x, y]) {
		const [tl, tr, bl, br] = this.hues;
		const th = tl + (tr - tl) * (x / 100);
		const bh = bl + (br - bl) * (x / 100);
		const hue = th + (bh - th) * (y / 100);
		return hsluvToHex([
			hue,
			85 + 10 * this.random(),
			45 + 10 * this.random()
		]);
	}

	render() {
		const party = keyframes`
			0%   { filter: hue-rotate(0); }
			100% { filter: hue-rotate(359.9deg); }
		`;

		const shimmer = keyframes`
			0%   { opacity: 1;   }
			50%  { opacity: 0.8; }
			100% { opacity: 1;   }
		`;

		const xClip = xPoints({x: 0, y: 0, width: 100, height: 100, thickness: this.props.thickness});

		return <WithKeyframes
			animations={{party, shimmer}}
			render={
				({party, shimmer}) => <svg
					viewBox="0 0 100 100"
					xmlns="http://www.w3.org/2000/svg"
					className={this.props.className}
					style={{
						animation: `${party} 30s linear infinite`,
					}}
				>
					<polygon points={polygonPoints(xClip)} fill={this.triangleColours[0]} />
					<WithClipPath
						clipPath={
							<polygon points={polygonPoints(xClip)} />
						}
						render={({clipPath}) =>
							<g clipPath={clipPath}>
								{range(this.triangles.length / 3).map(
									i => {
										const points = [
											this.points[this.triangles[i * 3]],
											this.points[this.triangles[i * 3 + 1]],
											this.points[this.triangles[i * 3 + 2]],
										];

										const outsideOfX = points.every(
											point => !pointInPolygon(point, xClip)
										);

										if(outsideOfX) return null;

										return <polygon
											key={[
												this.points[this.triangles[i * 3]],
												this.points[this.triangles[i * 3 + 1]],
												this.points[this.triangles[i * 3 + 2]],
											].join()}
											fill={this.triangleColours[i]}
											stroke={this.triangleColours[i]}
											strokeWidth='0.1%'
											strokeLinejoin='round'
											points={polygonPoints(points)}
											style={{
												animation: `${shimmer} ${(this.random() * 10 + 5).toFixed(2)}s linear infinite`,
											}}
										/>
									}
								)}
							</g>
						}
					/>
				</svg>
			}
		/>;
	}
}

XLogo.defaultProps = {
	seed: Math.random().toString(),
	hueShift: 45,
	thickness: 17,
	density: 20,
};

export default XLogo;
