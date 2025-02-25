import PropTypes from "prop-types";
import { Grid, Skeleton } from "@mui/material";
import PostCard from "../PostCard/PostCard";

const PostsGrid = ({ posts, loading, onPostClick }) => {
	const LoadingSkeleton = () => (
		<Grid item xs={12} sm={6} md={4}>
			<Skeleton variant="rectangular" height={200} />
		</Grid>
	);

	if (loading) {
		return (
			<Grid container spacing={3}>
				{[...Array(6)].map((_, index) => (
					<LoadingSkeleton key={index} />
				))}
			</Grid>
		);
	}

	return (
		<Grid container spacing={3}>
			{posts.map((post) => (
				<Grid item xs={12} sm={6} md={4} key={post.id}>
					<PostCard
						title={post.title}
						body={post.body}
						onClick={() => onPostClick(post)}
					/>
				</Grid>
			))}
		</Grid>
	);
};

PostsGrid.propTypes = {
	posts: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			body: PropTypes.string.isRequired,
		})
	).isRequired,
	loading: PropTypes.bool.isRequired,
	onPostClick: PropTypes.func.isRequired,
};

export default PostsGrid;
