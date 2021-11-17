import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

type Props = {
  openDialog: boolean;
  closeDialog: () => void;
};

const SearchBar: React.FC<Props> = ({ openDialog, closeDialog }) => {
  const [term, setTerm] = useState("");
  const handleTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={closeDialog}
      aria-labelledby="search-bar"
      fullWidth
    >
      <DialogTitle id="search-bar">Looking for something?</DialogTitle>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(123);
          }}
        >
          <TextField
            size="medium"
            fullWidth
            autoFocus
            margin="normal"
            variant="outlined"
            placeholder="Enter what you're looking for"
            type="search"
            value={term}
            onChange={handleTermChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
