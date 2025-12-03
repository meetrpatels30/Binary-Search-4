// Time Complexity: O(m log m + n log n + m log n), where m and n are sizes of the input arrays
// Space Complexity: O(1)
function intersect(nums1: number[], nums2: number[]): number[] {
	const n1 = nums1.length;
	const n2 = nums2.length;

	if (n1 > n2) {
		return intersect(nums2, nums1);
	}

	nums1.sort((a, b) => a - b);
	nums2.sort((a, b) => a - b);

	const result: number[] = [];

	let low = 0; // to track starting index in nums2 for search space and avoidig counting same number at same idx
	let high = n2 - 1;

	for (const num of nums1) {
		const bsIdx = binarySearch(nums2, num, low, high);
		// if num is found
		if (bsIdx !== -1) {
			// add the num to result
			result.push(num);
			//increase the tracking idx to update search space
			low = bsIdx + 1;
		}
	}

	return result;
}

function binarySearch(
	nums: number[],
	target: number,
	low: number,
	high: number
): number {
	while (low <= high) {
		let mid = low + Math.floor((high - low) / 2);

		if (nums[mid] === target) {
			// check for first occurence
			if (mid === low || nums[mid - 1] !== nums[mid]) {
				return mid;
			} else {
				// reduce the search space from right to find the first occurence
				high = mid - 1;
			}
		} else if (nums[mid] > target) {
			high = mid - 1;
		} else {
			low = mid + 1;
		}
	}
	return -1;
}
