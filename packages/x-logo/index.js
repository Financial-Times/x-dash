import React, {Component} from 'react';
import Poisson from 'poisson-disk-sampling';
import Delaunay from 'delaunator';
import {hsluvToHex} from 'hsluv';
import seedrandom from 'seedrandom';

const range = length => Array.from({length}, (_, i) => i);

const keyframes = text => {
	const name = `keyframe-${Math.floor(Math.random() * 0xffffff).toString(16)}`;
	let styleElement =  document.getElementById('keyframe-inject');

	if(!styleElement) {
		styleElement = document.createElement('style');
		styleElement.id = 'keyframe-inject';
		document.head.appendChild(styleElement);
	}

	styleElement.sheet.insertRule(`@keyframes ${name} {
		${text}
	}`, styleElement.sheet.length);
	return name;
};

const XClip = ({x, y, width, height, thickness}) => {
	const middleX = x + width / 2;
	const middleY = y + height / 2;

	return <clipPath id="x">
		<polygon points={[
			x, y + thickness,
			middleX - thickness, middleY,
			x, y + height - thickness,
			x + thickness, y + height,
			middleX, middleY + thickness,
			x + width - thickness, y + height,
			x + width, y + height - thickness,
			middleX + thickness, middleY,
			x + width, y + thickness,
			x + width - thickness, y,
			middleX, middleY - thickness,
			x + thickness, y,
		].join()} />
	</clipPath>;
}

export default class XLogo extends Component {
	static defaultProps = {
		seed: Math.random().toString(),
		hueShift: 45,
		thickness: 17,
	};

	state = {
		update: 0
	};

	configure(props) {
		this.random = seedrandom(props.seed);
		this.poisson = new Poisson([150, 150], 5, 100, 30, this.random);
		this.points = this.poisson.fill().map(([x, y]) => [x - 25, y - 25]);

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

	constructor(props) {
		super(props);
		this.configure(props);
	}

	componentWillReceiveProps(props) {
		this.configure(props);
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
		return <svg
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
			className={this.props.className}
			style={{
				animationName: keyframes`
					0% { filter: hue-rotate(0); }
					100% { filter: hue-rotate(359.9deg); }
				`,
				animationDuration: '30s',
				animationIterationCount: 'infinite',
				animationTimingFunction: 'linear',
			}}
		>
			<XClip x={0} y={0} width={100} height={100} thickness={this.props.thickness} />

			<g clip-path='url(#x)'>
				{range(this.triangles.length / 3).map(
					i => <polygon
						key={[
							this.points[this.triangles[i * 3]],
							this.points[this.triangles[i * 3 + 1]],
							this.points[this.triangles[i * 3 + 2]],
						].join()}
						fill={this.triangleColours[i]}
						stroke={this.triangleColours[i]}
						stroke-width='0.1%'
						stroke-linejoin='round'
						points={[
							this.points[this.triangles[i * 3]],
							this.points[this.triangles[i * 3 + 1]],
							this.points[this.triangles[i * 3 + 2]],
						].join()}
					/>
				)}
			</g>
		</svg>;
	}
}
