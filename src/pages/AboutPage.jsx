import {
	Container,
	Box,
	Typography,
	Grid,
	Card,
	CardContent,
	Avatar,
} from "@mui/material";

import { features, team } from "../lib/api";

const AboutPage = () => {
	return (
		<Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
			{/* Hero Section */}
			<Box
				sx={{
					bgcolor: "primary.main",
					color: "white",
					py: { xs: 8, md: 12 },
					textAlign: "center",
				}}
			>
				<Container maxWidth="lg">
					<Typography variant="h2" component="h1" gutterBottom>
						About Us
					</Typography>
					<Typography
						variant="h5"
						sx={{ mb: 4, maxWidth: "800px", mx: "auto" }}
					>
						We're on a mission to create the most engaging and accessible
						content platform for readers around the world.
					</Typography>
				</Container>
			</Box>

			{/* Features Section */}
			<Container maxWidth="lg" sx={{ py: 8 }}>
				<Typography variant="h3" component="h2" textAlign="center" gutterBottom>
					Why Choose Us
				</Typography>
				<Grid container spacing={4} sx={{ mt: 4 }}>
					{features.map((feature, index) => (
						<Grid item xs={12} sm={6} md={3} key={index}>
							<Card
								sx={{
									height: "100%",
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									textAlign: "center",
									p: 2,
								}}
							>
								<Box sx={{ color: "primary.main", mb: 2 }}>{feature.icon}</Box>
								<CardContent>
									<Typography variant="h6" gutterBottom>
										{feature.title}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{feature.description}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>

			{/* Team Section */}
			<Box sx={{ bgcolor: "grey.100", py: 8 }}>
				<Container maxWidth="lg">
					<Typography
						variant="h3"
						component="h2"
						textAlign="center"
						gutterBottom
					>
						Meet Our Team
					</Typography>
					<Grid container spacing={4} sx={{ mt: 4 }}>
						{team.map((member, index) => (
							<Grid item xs={12} md={4} key={index}>
								<Card sx={{ height: "100%" }}>
									<CardContent sx={{ textAlign: "center" }}>
										<Avatar
											src={member.avatar}
											sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
										/>
										<Typography variant="h6" gutterBottom>
											{member.name}
										</Typography>
										<Typography
											variant="subtitle1"
											color="primary"
											gutterBottom
										>
											{member.role}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											{member.bio}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			</Box>
		</Box>
	);
};

export default AboutPage;
