import { Box, Grid, Input } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import * as SearchBarUtil from "./SearchBarUtil";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    maxWidth: "80ch",
    flexGrow: 1,
    marginRight: theme.spacing(),
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    top: 0,
    right: 0,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em )`,
    transition: theme.transitions.create("width"),
    width: "100%",
    // [theme.breakpoints.up("md")]: {
    //   width: "20ch",
    // },
  },
  listbox: {
    width: "100%",
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: "absolute",
    listStyle: "none",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    overflow: "auto",
    maxHeight: 200,
    border: "1px solid rgba(0,0,0,.25)",
    "& li": { padding: "1em" },
    '& li[data-focus="true"]': {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.text.secondary,
      cursor: "pointer",
    },
    "& li:active": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
  },
}));

export default function SearchBar(props) {
  const classes = useStyles();
  let [searchList, setSearchList] = useState([]);
  const [search, setSearch] = useState("");
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "autocomplete-searchbar",
    options: searchList,
    getOptionLabel: (option) =>
      `${option.type} - ${option.title} - ${option.value}`,
    onChange: (evt, val) => {
      console.log(val.id);
      handleExpandAccordian(val.id);
      window.location.href = `#${val.id}`;
    },
    getOptionSelected: (option, value) => option.id === value.id,
  });

  async function handleExpandAccordian(id) {
    await props.setExpanded(id);
  }
  let updateSearchList = async () => {
    let options = await SearchBarUtil.handleSearchList(props.user);
    setSearchList(options);
  };
  useEffect(() => {
    updateSearchList();
  }, []);
  return (
    <div className={classes.search} {...getRootProps()}>
      <div className={classes.searchIcon} {...getInputLabelProps()}>
        <SearchIcon />
      </div>
      <Input
        placeholder='Search…'
        fullWidth={true}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        value={search}
        {...getInputProps()}
      />

      {groupedOptions.length > 0 ? (
        <ul className={classes.listbox} {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li
              {...getOptionProps({
                option,
                index,
              })}>
              <Grid container>
                <Grid item component={Box} pr={1}>
                  {option.value}
                </Grid>
                <Grid item className={classes.grow}>
                  {option.title}
                </Grid>

                <Grid item style={{ textAlign: "center" }}>
                  {option.icon}
                </Grid>
              </Grid>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
