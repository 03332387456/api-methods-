import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button'
import { useParams } from "react-router-dom";

export default function AddProject() {
  const [model, setModel] = useState<any>({});
  const api = "https://jsonplaceholder.typicode.com/comments";
  const params = useParams();

  const getPostById = () => {
    axios
      .get(`${api}/${params.id}`)
      .then((res) => {
        console.log(res);
        setModel({ ...res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePost = () => {
    axios
      .put(`${api}/${params.id}`, model)
      .then((res) => {
        console.log("Post Updated Successfully ==>", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitPost = () => {
    model.userId = 11;
    axios
      .post(api, model)
      .then((res) => {
        console.log("Post Added Successfully ==>", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (params.id) {
      getPostById();
    }
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h1>
          <u className="text-primary">Add comments here</u>
        </h1>
      </div>
      <div className="container border border-success p-3 shadow rounded my-5">
      <div className="container rounded my-5">
        <input
          value={model.name}
          onChange={(e) => setModel({ ...model, name: e.target.value })}
          type="text"
          placeholder="Enter your Name"
          className="p-3  w-100 rounded shadow"
        />
        <textarea
          value={model.body}
          onChange={(e) => setModel({ ...model, body: e.target.value })}
          className="my-3 p-3 w-100 rounded"
          cols={20}
          rows={5}
          placeholder="Enter comment here..."
        ></textarea>
        <input
          value={model.email}
          onChange={(e) => setModel({ ...model, email: e.target.value })}
          type="Email"
          placeholder="Enter your Email"
          className="p-3  w-100 rounded shadow"
        />
        <div className="row mb-4 ">
          <div className="col-md-6 p-2 ">
            <input
              value={model.id}
              onChange={(e) => setModel({ ...model, id: e.target.value })}
              type="text"
              placeholder="Enter your ID"
              className="p-3  w-100 rounded shadow"
            />
          </div>
          <div className="col-md-6 p-2">
            <input
              value={model.postId}
              onChange={(e) => setModel({ ...model, postId: e.target.value })}
              type="text"
              placeholder="Post-ID"
              className="p-3 w-100 rounded shadow"
            />
          </div>
        </div>
      </div>
        {/* Rest of your component code */}
        {params.id ? (
          <Button variant="contained" color="success" onClick={updatePost}>Update</Button>
        ) : (
          <Button variant="contained" color="primary" onClick={submitPost}>Submit</Button>
        )}
      </div>
    </>
  );
}
