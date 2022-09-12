import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-toastify";

const Popup = ({ open, setOpen, setData, id }) => {
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [designation, setDesignation] = useState();

  const handleSubmit = () => {
    let payload = [
      {
        name,
        age,
        gender,
        designation,
        id: Date.now(),
      },
    ];
    let readData = JSON.parse(localStorage.getItem("allToDo"));
    if (!id) {
      if (readData) payload = payload.concat(readData);
      setData(payload);
      localStorage.setItem("allToDo", JSON.stringify(payload));
      toast.success("successfully Added");
      setOpen(!open);
      setAge();
      setGender();
      setName();
      setDesignation();
    } else {
      const updateData = [];
      if (readData) {
        readData?.forEach((element) => {
          if (element?.id === id)
            updateData.push({ id: element.id, name, age, gender, designation });
          else updateData.push(element);
        });
      }
      setData(updateData);
      localStorage.setItem("allToDo", JSON.stringify(updateData));
      toast.success("successfully Updated");
      setOpen(!open);
      setAge();
      setGender();
      setName();
      setDesignation();
    }
  };

  useEffect(() => {
    if (id) {
      let readData = JSON.parse(localStorage.getItem("allToDo"));
      const newData = readData.filter((el) => el?.id === id);
      console.log("newData", newData);
      setName(newData[0].name);
      setAge(newData[0].age);
      setGender(newData[0].gender);
      setDesignation(newData[0].designation);
    }
  }, [id]);

  return (
    <Dialog open={open} onClose={() => setOpen(!open)}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Enter name"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          name="age"
          label="Enter age"
          type="date"
          fullWidth
          variant="standard"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          name="gender"
          label="Enter gender"
          type="text"
          fullWidth
          variant="standard"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          name="designation"
          label="Enter designation"
          type="text"
          fullWidth
          variant="standard"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setOpen(!open)} startIcon={<CancelIcon />}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} startIcon={<SaveIcon />}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
