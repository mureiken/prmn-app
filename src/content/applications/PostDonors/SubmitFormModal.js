import React, { useState, useEffect,  useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

//import useFetch from '../../../../../useFetch';
  
const imageMimeType = /image\/(png|jpg|jpeg)/i;

export default function Modal({ isOpen, handleClose, _isSubmitted }) {
    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);

    const donorRef = useRef('');

    const handleOnChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
          alert("Image mime type is not valid");
          return;
        }
        setFile(file);
      }
      useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
          fileReader = new FileReader();
          fileReader.onload = (e) => {
            const { result } = e.target;
            if (result && !isCancel) {
              setFileDataURL(result)
            }
          }
          fileReader.readAsDataURL(file);
        }
        return () => {
          isCancel = true;
          if (fileReader && fileReader.readyState === 1) {
            fileReader.abort();
          }
        }
    
      }, [file]);

//   const [query, setQuery] = useState();

//   useEffect(() => {
//     setQuery(`/`);
    
//   }, []);

  
  
//   const url = query && `/api/displacement-data/details/${query}`;
//   const geoData = false;
  
//   const {
//     loading,  
//     error,
//     data
//   } = useFetch(url, geoData);

const handleSubmit = (e) => {
  e.preventDefault();

  let formData = {
      'donor_name': donorRef.current.value,
      'logo_image':  fileDataURL,
    }

    console.log(formData);
  
  fetch('/api/donors', {
          method: 'post',
          "headers": {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData)
        }).then(response => {
          if (!response.ok) {
              console.log(response);
            } else {
              const result = response.json();
              
              return result;
            }
        })
      .catch(error => {
          console.log(error);
    
      })
      _isSubmitted(true);
      handleClose();
  }


    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogContent style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="donor"
                    name="donor"
                    label="Donor name"
                    defaultValue=""
                    variant="standard"
                    inputRef={donorRef}
                    fullWidth
                />
                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                >
                    Upload Logo
                    <input 
                      hidden 
                      accept="image/*" 
                      multiple type="file" 
                      onChange={handleOnChange}
          
                      />
                </Button>
                {fileDataURL ?
                    <p className="img-preview-wrapper">
                      {
                        <img src={fileDataURL} alt="preview" />
                      }
                    </p> : null}
       
             </DialogContent>
             <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleSubmit}>Submit</Button>
             </DialogActions>  
        </Dialog>
    )
}