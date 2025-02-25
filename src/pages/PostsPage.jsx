"use client";

import { Container, Box, Typography, Alert } from "@mui/material";
import SearchBar from "../components/SearchBar/SearchBar";
import PostsGrid from "../components/PostGrid/PostGrid";
import FilterSection from "../components/FilterSection/FilterSection";
import PostDetail from "../components/PostDetails/PostDetails";
import Pagination from "../components/Pagination/Pagination";
import { useState, useCallback, useEffect } from "react";
import { fetchUsers, fetchPosts } from "../lib/api";

const POSTS_PER_PAGE = 10;

const PostsPage = () => {
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

	const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

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

	const loadPosts = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const { posts: newPosts, totalCount } = await fetchPosts({
				page: currentPage,
				limit: POSTS_PER_PAGE,
				userId: selectedUser,
			});

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
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				py: 4,
			}}
		>
			<Container maxWidth="lg">
				<Box sx={{ mb: 4 }}>
					<Typography variant="h4" component="h1" gutterBottom>
						All Posts
					</Typography>
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

				<div id="posts-section">
					<PostsGrid
						posts={posts}
						loading={loading}
						onPostClick={handlePostClick}
					/>
				</div>

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
};

export default PostsPage;
