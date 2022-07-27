export default class MinHeap {
	/**
	 * Minimum Heap data structure.
	 *
	 * Initialize with an array of number
	 *
	 * ex. `new MinHeap([1,2,3])`
	 *
	 * @param {Array} arr
	 */
	constructor(arr) {
		this.array = []
		for (const val of arr) {
			this.push(val)
		}
	}

	/**
	 * Given two indices, swaps the associated values within
	 * the heap array
	 */
	swap(i, j) {
		const temp = this.array[i]
		this.array[i] = this.array[j]
		this.array[j] = temp
	}

	/**
	 * Throws error is heap is empty.
	 */
	guardEmpty() {
		if (!this.array.length) throw new Error("Heap is Empty")
	}

	/**
	 * Given a child index, returns parent index.
	 */
	getParentIndex(childIndex) {
		// raw array index (0...n)
		return Math.floor((childIndex + 1) / 2) - 1
	}

	/**
	 * Given a prent index, returns both child indices.
	 */
	getChildIndices(parentIndex) {
		const leftChildIndex = (parentIndex + 1) * 2 - 1
		const rightChildIndex = leftChildIndex + 1
		return [leftChildIndex, rightChildIndex]
	}

	/**
	 * Given a parent index, returns an array of [parentIndex, childIndex]
	 * to swap values for in order to ensure correct parent-child relationships.
	 *
	 * Returns null if no swap is needed or if there are no children.
	 */
	getSwapIndices(parentIndex) {
		const [leftChildIndex, rightChildIndex] = this.getChildIndices(parentIndex)
		const parentVal = this.array[parentIndex]
		const leftChildVal = this.array[leftChildIndex]
		const rightChildVal = this.array[rightChildIndex]

		// no children
		if (leftChildVal === undefined && rightChildVal === undefined) {
			return null
		}

		let smallestChildIndex
		// there are 2 children to consider
		if (leftChildVal !== undefined && rightChildVal !== undefined) {
			smallestChildIndex = leftChildVal <= rightChildVal ? leftChildIndex : rightChildIndex
		} else {
			// only 1 child to consider
			smallestChildIndex = leftChildVal !== undefined ? leftChildIndex : rightChildIndex
		}
		const smallestChildVal = this.array[smallestChildIndex]

		// the smallest child is smaller than parent
		if (smallestChildVal < parentVal) {
			return [parentIndex, smallestChildIndex]
		}
		return null
	}

	/**
	 * Given a child index, properly bubbles up the lowest value to parent.
	 */
	bubbleUp(childIndex) {
		if (childIndex === 0) return // base case to end recursion

		const swapIndices = this.getSwapIndices(this.getParentIndex(childIndex))
		if (swapIndices === null) return

		const [parentIndex, _childIndex] = swapIndices
		this.swap(parentIndex, _childIndex)
		this.bubbleUp(parentIndex)
	}

	/**
	 * Given a parent index, properly bubbles down larger values to children.
	 */
	bubbleDown(parentIndex) {
		const swapIndices = this.getSwapIndices(parentIndex)
		if (swapIndices === null) return // base case to stop recursion

		const [_parentIndex, childIndex] = swapIndices
		this.swap(_parentIndex, childIndex)
		this.bubbleDown(childIndex)
	}

	/**
	 * Adds given value to the heap.
	 */
	push(val) {
		this.array.push(val)
		this.bubbleUp(this.array.length - 1)
	}

	/**
	 * Returns the min value of heap.
	 */
	peek() {
		this.guardEmpty()
		return this.array[0]
	}

	/**
	 * Removes the min value from the heap and returns that value.
	 */
	pop() {
		this.guardEmpty()
		const out = this.array.shift()
		if (!this.array.length) return out

		this.array.unshift(this.array.pop()) // place last element at start
		this.bubbleDown(0)
		return out
	}
}
