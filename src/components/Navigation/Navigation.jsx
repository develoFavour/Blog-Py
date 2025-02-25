"use client";

import { useState } from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Container,
	Box,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemText,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

const Navigation = () => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	const menuItems = [
		{ label: "Home", href: "#home" },
		{ label: "Posts", href: "#posts-section" },
		{ label: "About", href: "#about" },
		{ label: "Contact", href: "#contact" },
	];

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const scrollToSection = (href) => {
		const element = document.querySelector(href);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
			setMobileOpen(false);
		}
	};

	const drawer = (
		<List>
			{menuItems.map((item) => (
				<ListItem
					button
					key={item.label}
					onClick={() => scrollToSection(item.href)}
				>
					<ListItemText primary={item.label} />
				</ListItem>
			))}
		</List>
	);

	return (
		<>
			<AppBar position="fixed" color="inherit" elevation={1}>
				<Container maxWidth="lg">
					<Toolbar sx={{ px: { xs: 0 } }}>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								flexGrow: 1,
							}}
						>
							<AutoStoriesIcon
								sx={{
									display: "flex",
									mr: 1,
									color: "primary.main",
								}}
							/>
							<Typography
								variant="h6"
								component="div"
								sx={{
									flexGrow: 1,
									color: "primary.main",
									fontWeight: "bold",
								}}
							>
								BlogPy
							</Typography>
						</Box>

						{isMobile ? (
							<IconButton
								color="inherit"
								aria-label="open drawer"
								edge="start"
								onClick={handleDrawerToggle}
							>
								<MenuIcon />
							</IconButton>
						) : (
							<Box sx={{ display: "flex", gap: 2 }}>
								{menuItems.map((item) => (
									<Button
										key={item.label}
										onClick={() => scrollToSection(item.href)}
										color="inherit"
									>
										{item.label}
									</Button>
								))}
							</Box>
						)}
					</Toolbar>
				</Container>
			</AppBar>

			<Drawer
				variant="temporary"
				anchor="right"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true, // Better mobile performance
				}}
			>
				{drawer}
			</Drawer>

			{/* Toolbar placeholder to prevent content from hiding under AppBar */}
			<Toolbar />
		</>
	);
};

export default Navigation;
