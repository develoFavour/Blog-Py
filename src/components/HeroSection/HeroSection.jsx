import { Box, Container, Typography, Button } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

const HeroSection = () => {
	const scrollToPosts = () => {
		document
			.getElementById("posts-section")
			.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<Box
			sx={{
				background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
				color: "white",
				py: { xs: 8, md: 12 },
				mb: 6,
			}}
		>
			<Container maxWidth="lg">
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						textAlign: "center",
						gap: 3,
					}}
				>
					<AutoStoriesIcon sx={{ fontSize: 60 }} />
					<Typography
						variant="h2"
						component="h1"
						sx={{
							fontWeight: "bold",
							fontSize: { xs: "2.5rem", md: "3.75rem" },
							mb: 2,
						}}
					>
						Discover Amazing Posts
					</Typography>
					<Typography
						variant="h5"
						sx={{
							maxWidth: "800px",
							mb: 4,
							color: "rgba(255, 255, 255, 0.9)",
						}}
					>
						Explore our collection of thoughtfully curated posts from various
						authors. Filter, search, and dive deep into the content that matters
						to you.
					</Typography>
					<Button
						variant="contained"
						size="large"
						onClick={scrollToPosts}
						sx={{
							backgroundColor: "white",
							color: "#2196F3",
							"&:hover": {
								backgroundColor: "rgba(255, 255, 255, 0.9)",
							},
						}}
					>
						Explore Posts
					</Button>
				</Box>
			</Container>
		</Box>
	);
};

export default HeroSection;
