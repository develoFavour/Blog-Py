import {
	Box,
	Container,
	Grid,
	Typography,
	IconButton,
	Link,
} from "@mui/material";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";

const Footer = () => {
	return (
		<Box
			component="footer"
			sx={{
				bgcolor: "primary.main",
				color: "white",
				py: 6,
				mt: "auto",
			}}
		>
			<Container maxWidth="lg">
				<Grid container spacing={4}>
					<Grid item xs={12} sm={4}>
						<Typography variant="h6" gutterBottom>
							About Us
						</Typography>
						<Typography variant="body2">
							We're dedicated to bringing you the best content from around the
							world. Our platform connects readers with amazing stories and
							insights.
						</Typography>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Typography variant="h6" gutterBottom>
							Quick Links
						</Typography>
						<Box component="nav">
							<Link href="/" color="inherit" display="block" sx={{ mb: 1 }}>
								Home
							</Link>
							<Link
								href="/posts"
								color="inherit"
								display="block"
								sx={{ mb: 1 }}
							>
								Posts
							</Link>
							<Link
								href="/about"
								color="inherit"
								display="block"
								sx={{ mb: 1 }}
							>
								About
							</Link>
							<Link href="/contact" color="inherit" display="block">
								Contact
							</Link>
						</Box>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Typography variant="h6" gutterBottom>
							Follow Us
						</Typography>
						<Box>
							<IconButton color="inherit">
								<Facebook />
							</IconButton>
							<IconButton color="inherit">
								<Twitter />
							</IconButton>
							<IconButton color="inherit">
								<LinkedIn />
							</IconButton>
							<IconButton color="inherit">
								<Instagram />
							</IconButton>
						</Box>
					</Grid>
				</Grid>
				<Typography variant="body2" align="center" sx={{ mt: 4 }}>
					© {new Date().getFullYear()} Blog-Pedia. All rights reserved.
				</Typography>
			</Container>
		</Box>
	);
};

export default Footer;
