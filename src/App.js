import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";

import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import PostsPage from "./pages/PostsPage";

function App() {
	return (
		<Router>
			<Box
				sx={{
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Navigation />
				<Box component="main" sx={{ flex: 1 }}>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/posts" element={<PostsPage />} />
						<Route path="/about" element={<AboutPage />} />
						<Route path="/contact" element={<ContactPage />} />
					</Routes>
				</Box>
				<Footer />
			</Box>
		</Router>
	);
}

export default App;
