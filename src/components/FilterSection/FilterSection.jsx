import { Box, Chip, Typography } from "@mui/material";
import PropTypes from "prop-types";

const FilterSection = ({ selectedUser, users, onUserFilter }) => {
	return (
		<Box sx={{ mb: 4 }}>
			<Typography variant="subtitle1" gutterBottom>
				Filter by Author:
			</Typography>
			<Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
				<Chip
					label="All"
					onClick={() => onUserFilter(null)}
					color={selectedUser === null ? "primary" : "default"}
					variant={selectedUser === null ? "filled" : "outlined"}
				/>
				{users.map((user) => (
					<Chip
						key={user.id}
						label={user.name}
						onClick={() => onUserFilter(user.id)}
						color={selectedUser === user.id ? "primary" : "default"}
						variant={selectedUser === user.id ? "filled" : "outlined"}
					/>
				))}
			</Box>
		</Box>
	);
};

FilterSection.propTypes = {
	selectedUser: PropTypes.number,
	users: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
		})
	).isRequired,
	onUserFilter: PropTypes.func.isRequired,
};

export default FilterSection;
