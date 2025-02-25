"use client";

import { useState, useEffect } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
	Box,
	Avatar,
	Divider,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	CircularProgress,
} from "@mui/material";
import PropTypes from "prop-types";
import CommentIcon from "@mui/icons-material/Comment";

const PostDetail = ({ post, open, onClose }) => {
	const [user, setUser] = useState(null);
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (post) {
			const fetchDetails = async () => {
				setLoading(true);
				try {
					const [userResponse, commentsResponse] = await Promise.all([
						fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`),
						fetch(
							`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
						),
					]);

					const userData = await userResponse.json();
					const commentsData = await commentsResponse.json();

					setUser(userData);
					setComments(commentsData);
				} catch (error) {
					console.error("Error fetching post details:", error);
				} finally {
					setLoading(false);
				}
			};

			fetchDetails();
		}
	}, [post]);

	if (!post) return null;

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="md"
			fullWidth
			scroll="paper"
			aria-labelledby="post-detail-title"
		>
			<DialogTitle id="post-detail-title">{post.title}</DialogTitle>
			<DialogContent dividers>
				{loading ? (
					<Box display="flex" justifyContent="center" p={3}>
						<CircularProgress />
					</Box>
				) : (
					<Box>
						{user && (
							<Box
								sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}
							>
								<Avatar sx={{ bgcolor: "primary.main" }}>{user.name[0]}</Avatar>
								<Box>
									<Typography variant="subtitle1">{user.name}</Typography>
									<Typography variant="body2" color="text.secondary">
										{user.email}
									</Typography>
								</Box>
							</Box>
						)}

						<Typography variant="body1" paragraph>
							{post.body}
						</Typography>

						<Divider sx={{ my: 3 }} />

						<Typography variant="h6" gutterBottom>
							Comments ({comments.length})
						</Typography>

						<List>
							{comments.map((comment) => (
								<ListItem key={comment.id} alignItems="flex-start">
									<ListItemAvatar>
										<Avatar>
											<CommentIcon />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={comment.name}
										secondary={
											<>
												<Typography
													component="span"
													variant="body2"
													color="text.primary"
												>
													{comment.email}
												</Typography>
												{` — ${comment.body}`}
											</>
										}
									/>
								</ListItem>
							))}
						</List>
					</Box>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
};

PostDetail.propTypes = {
	post: PropTypes.shape({
		id: PropTypes.number.isRequired,
		userId: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		body: PropTypes.string.isRequired,
	}),
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default PostDetail;
