// Page with movie details & actions to join a movie / series chat room
import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


const movieCardStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
//   bgcolor: 'background.paper',
 bgcolor: 'transparent',
 border: 'none',
//   border: '2px solid #000',
//   boxShadow: 24,
  p: 4,
};

export default function Movie(open, handleClose, selectedMovieCover) {
  // const [open, setOpen] = React.useState(false);
  // const [selectedMovieCover, setSelectedMovieCover] = React.useState(null);
  // const handleOpen = (event) => {
  //     const movieImage = event.target.src;
  //     setSelectedMovieCover(movieImage);
  //     setOpen(true);
  //     console.log(selectedMovieCover)
  // }
  // const handleClose = () => setOpen(false);


    return (
      <div>
      <Modal
        open={open}
        onClose={handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={movieCardStyles}
        style={{
            backgroundImage: `url(${selectedMovieCover})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "700px",
            // width: "100%",
            }}>
            <div>
                <h1 style={{ color: 'white'}}>Modal</h1>
            </div>
        </Box>
      </Modal>
    </div>
  );
}

