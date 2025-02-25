import { Box } from "@mui/material";
import HeroSection from "../components/HeroSection/HeroSection";
import PostsPage from "./PostsPage";

const HomePage = () => {
	return (
		<Box>
			<HeroSection />
			<PostsPage />
		</Box>
	);
};

export default HomePage;
