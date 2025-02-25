"use client";

import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash.debounce";

const SearchBar = ({ onSearch }) => {
	const [searchValue, setSearchValue] = useState("");

	// Create a debounced search function with proper dependencies
	const debouncedSearch = useCallback(
		(query) => {
			debounce((searchQuery) => {
				onSearch(searchQuery);
			}, 300)(query);
		},
		[onSearch]
	);

	// Cleanup debounce on unmount
	useEffect(() => {
		const debouncedFn = debounce((query) => {
			onSearch(query);
		}, 300);

		return () => {
			debouncedFn.cancel();
		};
	}, [onSearch]);

	const handleSearchChange = (event) => {
		const { value } = event.target;
		setSearchValue(value);
		debouncedSearch(value);
	};

	return (
		<TextField
			fullWidth
			variant="outlined"
			placeholder="Search posts..."
			value={searchValue}
			onChange={handleSearchChange}
			aria-label="Search posts"
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<SearchIcon />
					</InputAdornment>
				),
			}}
		/>
	);
};

SearchBar.propTypes = {
	onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
