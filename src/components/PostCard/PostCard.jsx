import PropTypes from "prop-types";
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";

const PostCard = ({ title, body, onClick }) => {
	return (
		<Card
			elevation={2}
			sx={{
				height: "100%",
				display: "flex",
				flexDirection: "column",
				"&:hover": {
					transform: "translateY(-4px)",
					transition: "transform 0.2s ease-in-out",
				},
			}}
		>
			<CardActionArea onClick={onClick} sx={{ height: "100%" }}>
				<CardContent>
					<Typography
						variant="h6"
						component="h2"
						gutterBottom
						sx={{
							overflow: "hidden",
							textOverflow: "ellipsis",
							display: "-webkit-box",
							WebkitLineClamp: 2,
							WebkitBoxOrient: "vertical",
						}}
					>
						{title}
					</Typography>
					<Typography
						color="text.secondary"
						sx={{
							overflow: "hidden",
							textOverflow: "ellipsis",
							display: "-webkit-box",
							WebkitLineClamp: 3,
							WebkitBoxOrient: "vertical",
						}}
					>
						{body}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

PostCard.propTypes = {
	title: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default PostCard;
