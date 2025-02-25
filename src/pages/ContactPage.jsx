"use client";

import { useState } from "react";
import {
	Container,
	Box,
	Typography,
	Grid,
	TextField,
	Button,
	Card,
	CardContent,
	Alert,
	Snackbar,
} from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material";

const ContactPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Here you would typically send the form data to your backend
		console.log("Form submitted:", formData);
		setSnackbar({
			open: true,
			message: "Message sent successfully! We'll get back to you soon.",
			severity: "success",
		});
		// Reset form
		setFormData({
			name: "",
			email: "",
			subject: "",
			message: "",
		});
	};

	const handleCloseSnackbar = () => {
		setSnackbar((prev) => ({ ...prev, open: false }));
	};

	const contactInfo = [
		{
			icon: <Email sx={{ fontSize: 40 }} />,
			title: "Email",
			content: "contact@postsviewer.com",
			link: "mailto:contact@postsviewer.com",
		},
		{
			icon: <Phone sx={{ fontSize: 40 }} />,
			title: "Phone",
			content: "+1 (555) 123-4567",
			link: "tel:+15551234567",
		},
		{
			icon: <LocationOn sx={{ fontSize: 40 }} />,
			title: "Address",
			content: "123 Content Street, Digital City, DC 12345",
			link: "https://maps.google.com",
		},
	];

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
						Contact Us
					</Typography>
					<Typography
						variant="h5"
						sx={{ mb: 4, maxWidth: "800px", mx: "auto" }}
					>
						Have questions? We'd love to hear from you. Send us a message and
						we'll respond as soon as possible.
					</Typography>
				</Container>
			</Box>

			<Container maxWidth="lg" sx={{ py: 8 }}>
				<Grid container spacing={4}>
					{/* Contact Information */}
					<Grid item xs={12} md={4}>
						<Box sx={{ mb: 4 }}>
							<Typography variant="h4" gutterBottom>
								Get in Touch
							</Typography>
							<Typography variant="body1" color="text.secondary" paragraph>
								Feel free to reach out to us through any of these channels:
							</Typography>
						</Box>

						<Grid container spacing={3}>
							{contactInfo.map((info, index) => (
								<Grid item xs={12} key={index}>
									<Card>
										<CardContent sx={{ textAlign: "center" }}>
											<Box sx={{ color: "primary.main", mb: 2 }}>
												{info.icon}
											</Box>
											<Typography variant="h6" gutterBottom>
												{info.title}
											</Typography>
											<Typography
												variant="body1"
												component="a"
												href={info.link}
												sx={{
													color: "text.secondary",
													textDecoration: "none",
													"&:hover": { textDecoration: "underline" },
												}}
											>
												{info.content}
											</Typography>
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>
					</Grid>

					{/* Contact Form */}
					<Grid item xs={12} md={8}>
						<Card>
							<CardContent sx={{ p: 4 }}>
								<Typography variant="h4" gutterBottom>
									Send us a Message
								</Typography>
								<form onSubmit={handleSubmit}>
									<Grid container spacing={3}>
										<Grid item xs={12} sm={6}>
											<TextField
												required
												fullWidth
												label="Name"
												name="name"
												value={formData.name}
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												required
												fullWidth
												label="Email"
												name="email"
												type="email"
												value={formData.email}
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												required
												fullWidth
												label="Subject"
												name="subject"
												value={formData.subject}
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												required
												fullWidth
												multiline
												rows={4}
												label="Message"
												name="message"
												value={formData.message}
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={12}>
											<Button
												type="submit"
												variant="contained"
												size="large"
												fullWidth
											>
												Send Message
											</Button>
										</Grid>
									</Grid>
								</form>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Container>

			<Snackbar
				open={snackbar.open}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbar.severity}
					sx={{ width: "100%" }}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default ContactPage;
