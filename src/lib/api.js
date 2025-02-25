import { People, Speed, Security, Psychology } from "@mui/icons-material";
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

export const team = [
	{
		name: "Favour Opia",
		role: "Founder & CEO",
		avatar: "/placeholder.svg?height=100&width=100",
		bio: "Visionary leader with 15+ years of experience in digital innovation.",
	},
	{
		name: "Jane Smith",
		role: "Head of Content",
		avatar: "/placeholder.svg?height=100&width=100",
		bio: "Content strategist passionate about storytelling and user engagement.",
	},
	{
		name: "Favour Johnson",
		role: "Technical Lead",
		avatar: "/placeholder.svg?height=100&width=100",
		bio: "Full-stack developer with a keen eye for performance optimization.",
	},
];

export const features = [
	{
		icon: <People sx={{ fontSize: 40 }} />,
		title: "Community Driven",
		description:
			"Built by the community, for the community. We value every contribution and perspective.",
	},
	{
		icon: <Speed sx={{ fontSize: 40 }} />,
		title: "Lightning Fast",
		description:
			"Optimized performance ensures you get the content you need, when you need it.",
	},
	{
		icon: <Security sx={{ fontSize: 40 }} />,
		title: "Secure Platform",
		description:
			"Your security is our priority. We implement the latest security measures.",
	},
	{
		icon: <Psychology sx={{ fontSize: 40 }} />,
		title: "Innovative Solutions",
		description:
			"Constantly evolving and improving to provide the best user experience.",
	},
];
