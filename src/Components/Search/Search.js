import { useRef } from "react";
import { TextField } from "@mui/material";
import styles from "./Search.module.scss"

const Search = ({ searchText, setSearchText, searchParams, setSearchParams, setLoading }) => {
  const searchIntervalId = useRef(null);

  const searchChangeHandler = (value) => {
    setSearchText(value);

    if (searchIntervalId?.current)
      clearInterval(searchIntervalId.current)

    searchIntervalId.current = setTimeout(() => {
      // setLoading(true);
      setSearchParams({
        search: value,
      })
    }, 500)
  }

  return (
    <TextField
      id='search'
      label="Search"
      variant="outlined"
      type="text"
      placeholder="Search by name, email, or role..."
      value={searchText}
      onChange={(e) => searchChangeHandler(e.target.value)}
      autoComplete="off"
      size="small"
      className={styles.search}
      sx={{
        "& label.MuiInputLabel-outlined": {
          fontSize: "1.4rem"
        },
        "& fieldset legend": {
          width: "42px"
        },
        "& .MuiOutlinedInput-input": {
          fontSize: "1.4rem"
        }
      }}
    />
  )
}

export default Search;