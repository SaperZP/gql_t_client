import React from "react";
import {Link, useParams} from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectForm from "../components/EditProjectForm";

function Project(props) {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_PROJECT, { variables: { id } });

  return (
    <>
      {loading && <Spinner />}
      {error && <p>Something went wrong</p>}
      {data && (
        <div className="mx-auto w-75 card p-5">
          <Link to={"/"} className={"btn btn-light btn-sm w-25 d-line ms-auto"}>
            Back
          </Link>
          <DeleteProjectButton projectId={data.project.id} />
          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>
          <h5 className="mt-3">Project status</h5>
          <p className="lead">{data.project.status}</p>
          <EditProjectForm project={data.project} />

          <ClientInfo client={data.project.client} />
        </div>
      )}
    </>
  );
}

export default Project;
