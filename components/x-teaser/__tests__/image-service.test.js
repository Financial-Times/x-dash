import imageService from '../src/concerns/image-service'

describe('image-service', () => {
	it('wraps an image in a v2 URL', () => {
		expect(imageService('https://example.com/image.jpg', 100)).toEqual('https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fexample.com%2Fimage.jpg?source=next&fit=scale-down&dpr=2&width=100');
	});

	it('allows setting the source param', () => {
		expect(imageService('https://example.com/image.jpg', 100, {source: 'system-code'})).toEqual('https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fexample.com%2Fimage.jpg?source=system-code&fit=scale-down&dpr=2&width=100');
	});
});
