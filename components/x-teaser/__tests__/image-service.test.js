import imageService from '../src/concerns/image-service'

describe('image-service', () => {
	it('wraps an image in a v3 URL', () => {
		expect(imageService('https://example.com/image.jpg', 100)).toEqual('https://images.ft.com/v3/image/raw/https%3A%2F%2Fexample.com%2Fimage.jpg?source=next&fit=scale-down&dpr=2&width=100');
	});

	it('allows setting the source param', () => {
		expect(imageService('https://example.com/image.jpg', 100, {source: 'system-code'})).toEqual('https://images.ft.com/v3/image/raw/https%3A%2F%2Fexample.com%2Fimage.jpg?source=system-code&fit=scale-down&dpr=2&width=100');
	});

	describe('double wrapping v2 URLs', () => {
		it('does not double wrap an image service v2 URL', () => {
			const result = imageService('https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fexample.com%2Fimage.jpg?source=test&width=100', 100);
			expect(result).toEqual('https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fexample.com%2Fimage.jpg?source=next&width=100&fit=scale-down&dpr=2');
		});

		it('preserves example-query-param=1234 from the original URL', () => {
			const result = imageService('https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fexample.com%2Fimage.jpg?example-query-param=1234', 100);
			expect(result).toEqual('https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fexample.com%2Fimage.jpg?example-query-param=1234&source=next&fit=scale-down&dpr=2&width=100');
		});

		it('overrides the "source" query param using default OPTIONS', () => {
			const result = imageService('https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fexample.com%2Fimage.jpg?source=original-source', 100);
			expect(result).toEqual('https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fexample.com%2Fimage.jpg?source=next&fit=scale-down&dpr=2&width=100');
		});

		it('overrides the "width" query param when passed in', () => {
			const result = imageService('https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fexample.com%2Fimage.jpg?source=original-source&width=100', 200);
			expect(result).toEqual('https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fexample.com%2Fimage.jpg?source=next&width=200&fit=scale-down&dpr=2');
		});

		it('overrides the "source" query param when passed in', () => {
			const result = imageService('https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fexample.com%2Fimage.jpg?source=original-source&width=100', 200, {source: 'latest-source'});
			expect(result).toEqual('https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fexample.com%2Fimage.jpg?source=latest-source&width=200&fit=scale-down&dpr=2');
		});
	});

	describe('double wrapping v3 URLs', () => {
		it('does not double wrap an image service v3 URL', () => {
			const result = imageService('https://images.ft.com/v3/image/raw/https%3A%2F%2Fexample.com%2Fimage.jpg?source=test&width=100', 100);
			expect(result).toEqual('https://images.ft.com/v3/image/raw/https%3A%2F%2Fexample.com%2Fimage.jpg?source=next&width=100&fit=scale-down&dpr=2');
		});

		it('preserves example-query-param=1234 from the original URL', () => {
			const result = imageService('https://images.ft.com/v3/image/raw/https%3A%2F%2Fexample.com%2Fimage.jpg?example-query-param=1234', 100);
			expect(result).toEqual('https://images.ft.com/v3/image/raw/https%3A%2F%2Fexample.com%2Fimage.jpg?example-query-param=1234&source=next&fit=scale-down&dpr=2&width=100');
		});

		it('overrides the "source" query param using default OPTIONS', () => {
			const result = imageService('https://images.ft.com/v3/image/raw/https%3A%2F%2Fexample.com%2Fimage.jpg?source=original-source', 100);
			expect(result).toEqual('https://images.ft.com/v3/image/raw/https%3A%2F%2Fexample.com%2Fimage.jpg?source=next&fit=scale-down&dpr=2&width=100');
		});

		it('overrides the "width" query param when passed in', () => {
			const result = imageService('https://images.ft.com/v3/image/raw/https%3A%2F%2Fexample.com%2Fimage.jpg?source=original-source&width=100', 200);
			expect(result).toEqual('https://images.ft.com/v3/image/raw/https%3A%2F%2Fexample.com%2Fimage.jpg?source=next&width=200&fit=scale-down&dpr=2');
		});

		it('overrides the "source" query param when passed in', () => {
			const result = imageService('https://images.ft.com/v3/image/raw/https%3A%2F%2Fexample.com%2Fimage.jpg?source=original-source&width=100', 200, {source: 'latest-source'});
			expect(result).toEqual('https://images.ft.com/v3/image/raw/https%3A%2F%2Fexample.com%2Fimage.jpg?source=latest-source&width=200&fit=scale-down&dpr=2');
		});
	});
});
