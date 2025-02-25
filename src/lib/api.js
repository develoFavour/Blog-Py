const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchUsers = async () => {
	try {
		const response = await fetch(`${BASE_URL}/users`);
		if (!response.ok) throw new Error("Failed to fetch users");
		return await response.json();
	} catch (error) {
		console.error("Error fetching users:", error);
		throw error;
	}
};

export const fetchPosts = async ({ page = 1, limit = 10, userId = null }) => {
	try {
		let url = `${BASE_URL}/posts?_page=${page}&_limit=${limit}`;
		if (userId) url += `&userId=${userId}`;

		const response = await fetch(url);
		if (!response.ok) throw new Error("Failed to fetch posts");

		// Get total count from headers
		const totalCount = Number.parseInt(
			response.headers.get("x-total-count") || "0",
			10
		);
		const data = await response.json();

		return {
			posts: data,
			totalCount,
		};
	} catch (error) {
		console.error("Error fetching posts:", error);
		throw error;
	}
};

export const fetchPostDetails = async (postId) => {
	try {
		const [postResponse, commentsResponse] = await Promise.all([
			fetch(`${BASE_URL}/posts/${postId}`),
			fetch(`${BASE_URL}/posts/${postId}/comments`),
		]);

		if (!postResponse.ok || !commentsResponse.ok) {
			throw new Error("Failed to fetch post details");
		}

		const [post, comments] = await Promise.all([
			postResponse.json(),
			commentsResponse.json(),
		]);

		return { post, comments };
	} catch (error) {
		console.error("Error fetching post details:", error);
		throw error;
	}
};
