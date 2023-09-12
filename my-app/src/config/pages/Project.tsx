import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Project() {
  const [gatdata, setgatdata] = useState<any>([]);
  const navigate = useNavigate();

  const deletecomment = (id : any) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/comments/${id}`)
      .then(() => {
        console.log("comment Deleted Successfully");
        fetchData();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  let fetchData = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((res) => {
        setgatdata(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-center my-5">API methods</h1>
      <div className="container mb-4">
        <Button
          onClick={() => navigate("/add")}
          variant="contained"
          color="success"
        >
          Add comments here
        </Button>
      </div>
      {gatdata.map((x:any, i:any) => (
        <div className="container mb-4" key={i}>
          <div className="row">
            <div className="col-md-12">
              <div className="shadow rounded border border-dark p-2">
                <h2>Name : {x.name}</h2>
                <p>
                  <b className="text-info">Body : </b>
                  {x.body}
                </p>
                <p>
                  <b className="text-info">Email :</b>
                  {x.email}
                </p>
                <p>
                  <b className="text-info">Id :</b>
                  {x.id}
                </p>
                <p>
                  <b className="text-info">postId :</b>
                  {x.postId}
                </p>
                <IconButton
                  onClick={() => deletecomment(x.id)}
                  color="error"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    navigate(`/add/${x.id}`);
                  }}
                  color="primary"
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Project;

