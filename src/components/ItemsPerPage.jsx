import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';

export default function ItemsPerPage({ onChangeCallback }) {
  const [itemsPerPage, setItemsPerPage] = React.useState('');

  const handleChange = (event) => {
    setItemsPerPage(event.target.value);
    onChangeCallback && onChangeCallback(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
        <InputLabel id="items-per-page-label">Items per page</InputLabel>
        <Select
          labelId="items-per-page-label"
          id="items-per-page"
          value={itemsPerPage}
          label="Items per page"
          defaultValue='10'
          onChange={handleChange}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
      <Tooltip title="Setting the page size in middle of list navigation will reset the current page to 1." arrow>
          <InfoIcon className='infoIcon' style={{marginTop: "7px"}} />
      </Tooltip>
    </div>
  );
}
