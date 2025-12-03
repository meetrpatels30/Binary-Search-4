// Time Complexity: O(log(min(m, n))) ,where m and n are ength of input arrays
// Space Complexity: O(1)
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
	const n1 = nums1.length;
	const n2 = nums2.length;

	// ensure nums1 is the smaller array to optimize binary search
	if (n1 > n2) {
		return findMedianSortedArrays(nums2, nums1);
	}

	let low = 0;
	// search space for the partition index in nums1 [0-n1]
	let high = n1;

	while (low <= high) {
		// partition index for nums1
		let partx = Math.floor((low + high) / 2);

		// partition index for nums2
		let party = Math.floor((n1 + n2 + 1) / 2) - partx;

		// l1: left element of nums1 partition
		let l1 = partx === 0 ? Number.MIN_SAFE_INTEGER : nums1[partx - 1];
		// r1: right element of nums1 partition
		let r1 = partx === n1 ? Number.MAX_SAFE_INTEGER : nums1[partx];
		// l2: left element of nums2 partition
		let l2 = party === 0 ? Number.MIN_SAFE_INTEGER : nums2[party - 1];
		// r2: right element of nums2 partition
		let r2 = party === n2 ? Number.MAX_SAFE_INTEGER : nums2[party];

		if (l1 <= r2 && l2 <= r1) {
			// partitions are balanced

			if ((n1 + n2) % 2 !== 0) {
				// odd
				// median is the largest element in the left half
				return Math.max(l1, l2);
			} else {
				// even
				// median is the average of the largest in the left and smallest in the right half
				const maxLeft = Math.max(l1, l2);
				const minRight = Math.min(r1, r2);
				return (maxLeft + minRight) / 2;
			}
		} else if (l1 > r2) {
			high = partx - 1;
		} else {
			low = partx + 1;
		}
	}

	return 0;
}
