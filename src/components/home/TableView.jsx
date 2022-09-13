import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Popup from "./Popup";

const TableView = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState();
  useEffect(() => {
    const readData = JSON.parse(localStorage.getItem("allToDo"));
    setData(readData);
    console.log("readData", readData);
  }, []);

  const handleDelete = (id) => {
    const newData = data.filter((el) => el?.id !== id);
    setData(newData);
    toast.success("successfully Removed");
    localStorage.setItem("allToDo", JSON.stringify(newData));
  };

  const handleEdit = (id) => {
    setOpen(true);
    setId(id);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">TODO APP</TableCell>
            <TableCell align="right">
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => {
                  setOpen(true);
                  setId();
                }}
              >
                Add
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">gender</TableCell>
            <TableCell align="center">Designation</TableCell>
            <TableCell align="center">Add</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length > 0 &&
            data?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.age}</TableCell>
                <TableCell align="center">{row.gender}</TableCell>
                <TableCell align="center">{row.designation}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(row?.id)}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Popup open={open} setOpen={setOpen} setData={setData} id={id} />
    </TableContainer>
  );
};

export default TableView;
