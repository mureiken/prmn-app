import React, { useState, useEffect, useCallback } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



export default function RegionFilter({names, handleFilter, target, selectedVals }) {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);
  
  
  const handleChange = (event) => {
    event.preventDefault();
    setLoading(true)
    const {
      target: { value },
    } = event;
    setValues(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  
  const memoizedhandleFilter = useCallback(
    () => {
      handleFilter(target, values);
    },
    [target, values, handleFilter],
  );
  
  useEffect(() => {
    if (loading) {
      memoizedhandleFilter();
    }
  }, [loading, memoizedhandleFilter]);

  // useEffect(() => { 
  //     if (loading) {
  //       handleFilter(target, values);
  //     }
  // }, [target, values, loading, handleFilter]);


  useEffect(() => { 
    if (selectedVals && selectedVals.length > 0) {
      setValues(selectedVals)
    }
  }, [selectedVals]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={values}
          onChange={handleChange}
          input={<OutlinedInput/>}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={values.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

