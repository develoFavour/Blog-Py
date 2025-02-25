"use client";

import { useState, useCallback, useEffect } from "react";
import { Container, Box, Typography, Alert } from "@mui/material";
import SearchBar from "./components/SearchBar/SearchBar";
import PostsGrid from "./components/PostGrid/PostGrid";
import HeroSection from "./components/HeroSection/HeroSection";
import FilterSection from "./components/FilterSection/FilterSection";
import PostDetail from "./components/PostDetails/PostDetails";
import Navigation from "./components/Navigation/Navigation";
import Pagination from "./components/Pagination/Pagination";
import { fetchUsers, fetchPosts } from "./lib/api";

const POSTS_PER_PAGE = 10;

function App() {
	const [posts, setPosts] = useState([]);
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [selectedPost, setSelectedPost] = useState(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPosts, setTotalPosts] = useState(0);
	const [searchQuery, setSearchQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Calculate total pages
	const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

	// Fetch users for filter
	useEffect(() => {
		const loadUsers = async () => {
			try {
				const data = await fetchUsers();
				setUsers(data);
			} catch (error) {
				setError("Failed to load users. Please try again later.");
			}
		};
		loadUsers();
	}, []);

	// Fetch posts with pagination and filtering
	const loadPosts = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const { posts: newPosts, totalCount } = await fetchPosts({
				page: currentPage,
				limit: POSTS_PER_PAGE,
				userId: selectedUser,
			});

			// Filter posts by search query if present
			const filteredPosts = searchQuery
				? newPosts.filter(
						(post) =>
							post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
							post.body.toLowerCase().includes(searchQuery.toLowerCase())
				  )
				: newPosts;

			setPosts(filteredPosts);
			setTotalPosts(totalCount);
		} catch (error) {
			setError("Failed to load posts. Please try again later.");
		} finally {
			setLoading(false);
		}
	}, [currentPage, selectedUser, searchQuery]);

	// Load posts when page, user filter, or search changes
	useEffect(() => {
		loadPosts();
	}, [loadPosts]);

	const handleSearch = useCallback((query) => {
		setSearchQuery(query);
		setCurrentPage(1);
	}, []);

	const handleUserFilter = useCallback((userId) => {
		setSelectedUser(userId);
		setCurrentPage(1);
	}, []);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const handlePostClick = useCallback((post) => {
		setSelectedPost(post);
		setDialogOpen(true);
	}, []);

	return (
		<Box>
			<Navigation />
			<Box id="home">
				<HeroSection />
			</Box>

			<Container maxWidth="lg" sx={{ py: 4 }} id="posts-section">
				<Box sx={{ mb: 4 }}>
					<SearchBar onSearch={handleSearch} />
				</Box>

				<FilterSection
					selectedUser={selectedUser}
					users={users}
					onUserFilter={handleUserFilter}
				/>

				{error && (
					<Alert severity="error" sx={{ mb: 4 }}>
						{error}
					</Alert>
				)}

				<PostsGrid
					posts={posts}
					loading={loading}
					onPostClick={handlePostClick}
				/>

				{!loading && posts.length === 0 && (
					<Typography textAlign="center" color="text.secondary" sx={{ mt: 4 }}>
						No posts found matching your criteria
					</Typography>
				)}

				{totalPages > 1 && (
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				)}

				<PostDetail
					post={selectedPost}
					open={dialogOpen}
					onClose={() => setDialogOpen(false)}
				/>
			</Container>
		</Box>
	);
}

export default App;
