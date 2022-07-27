import MinHeap from "./../minHeap.js"

describe("MinHeap", function () {
	it("has a peek method", function () {
		const arr = [3, 2, 1]
		const heap = new MinHeap(arr)

		expect(heap.peek()).toBe(1)
	})

	it("has a push method", function () {
		const arr = [3, 2, 1]
		const heap = new MinHeap(arr)
		heap.push(0)

		expect(heap.peek()).toBe(0)
	})

	it("has a pop method", function () {
		const arr = [3, 2, 1]
		const heap = new MinHeap(arr)
		heap.pop()

		expect(heap.peek()).toBe(2)
	})

	it("throws erorr on peak and pop when empty", function () {
		const arr = []
		const heap = new MinHeap(arr)

		expect(heap.pop).toThrow()
		expect(heap.peek).toThrow()
	})

	it("handles mix of push and pop", function () {
		const arr = [-10, 33, 99, 200, 14, 2]
		const heap = new MinHeap(arr)

		expect(heap.pop()).toBe(-10)
		expect(heap.peek()).toBe(2)

		heap.push(1)
		expect(heap.peek()).toBe(1)
		expect(heap.pop()).toBe(1)
		expect(heap.peek()).toBe(2)

		heap.push(100)
		expect(heap.pop()).toBe(2)
		expect(heap.pop()).toBe(14)
		expect(heap.pop()).toBe(33)
		expect(heap.pop()).toBe(99)
		expect(heap.pop()).toBe(100)
		expect(heap.pop()).toBe(200)
	})
})
