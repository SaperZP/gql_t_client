import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";

function AddProjectModal(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  const { data, loading, error } = useQuery(GET_CLIENTS);
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });

      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (name === "" || description === "" || status === "") {
      return alert("Please fill in all fields!");
    }

    addProject(name, description, clientId, status);

    setStatus("new");
    setDescription("");
    setName("");
    setClientId("");
  };

  return (
    <>
      {loading && <Spinner />}
      {error && <p>Something went wrong!</p>}
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
          >
            <span className="d-flex align-items-center">
              <FaList className={"icon"} />
              <div>New Project</div>
            </span>
          </button>

          <div
            className="modal fade"
            id="addProjectModal"
            aria-labelledby="addProjectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="addProjectModalLabel">
                    New project
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={formSubmitHandler}>
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
                        <option value="new">Not Started</option>
                        <option value="progress">In progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select
                        className="form-select"
                        value={clientId}
                        onChange={(event) => setClientId(event.target.value)}
                        id={"clientId"}
                      >
                        <option value="">Select client</option>
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      className="btn btn-primary"
                      type={"submit"}
                      data-bs-dismiss={"modal"}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AddProjectModal;
