import { Box, Pagination as MuiPagination } from "@mui/material";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const handleChange = (event, value) => {
		onPageChange(value);
		// Scroll to top of posts section
		document
			.getElementById("posts-section")
			.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				mt: 4,
				mb: 2,
			}}
		>
			<MuiPagination
				count={totalPages}
				page={currentPage}
				onChange={handleChange}
				color="primary"
				size="large"
				showFirstButton
				showLastButton
			/>
		</Box>
	);
};

Pagination.propTypes = {
	currentPage: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
