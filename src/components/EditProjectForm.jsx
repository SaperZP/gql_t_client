import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECT } from "../queries/projectQueries";

function EditProjectForm({ project }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState("");
  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const onSubmit = (event) => {
    event.preventDefault();

    if (name === "" || description === "" || status === "") {
      return alert("Please fill in all fields!");
    }

    updateProject(name, description, status);
  };

  return (
    <div className={"mt-5"}>
      <h3>Update project details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className={"form-control"}
            id={"name"}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className={"form-control"}
            id={"description"}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="form-select"
            id={"status"}
          >
            <option disabled value="">
              Update the status
            </option>
            <option value="new">Not Started</option>
            <option value="progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button className="btn btn-primary" type={"submit"}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditProjectForm;
