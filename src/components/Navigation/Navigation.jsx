"use client";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
	const navigate = useNavigate();
	const location = useLocation();

	const menuItems = [
		{ label: "Home", path: "/" },
		{ label: "Posts", path: "/posts" },
		{ label: "About", path: "/about" },
		{ label: "Contact", path: "/contact" },
	];

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleNavigation = (path) => {
		navigate(path);
		setMobileOpen(false);
	};

	const drawer = (
		<List>
			{menuItems.map((item) => (
				<ListItem
					button
					key={item.label}
					onClick={() => handleNavigation(item.path)}
					selected={location.pathname === item.path}
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
								cursor: "pointer",
							}}
							onClick={() => handleNavigation("/")}
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
								Blogpedia
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
										onClick={() => handleNavigation(item.path)}
										color="inherit"
										sx={{
											position: "relative",
											"&::after": {
												content: '""',
												position: "absolute",
												bottom: 0,
												left: 0,
												width: "100%",
												height: "2px",
												backgroundColor: "primary.main",
												transform:
													location.pathname === item.path
														? "scaleX(1)"
														: "scaleX(0)",
												transition: "transform 0.3s ease-in-out",
											},
											"&:hover::after": {
												transform: "scaleX(1)",
											},
										}}
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
