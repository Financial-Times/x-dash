import Delaunay from 'delaunator';

export default (noise) => {
	const { triangles } = Delaunay.from(noise);
	return triangles;
};
