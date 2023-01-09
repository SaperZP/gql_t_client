import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import Spinner from "./Spinner";
import ProjectCard from "./ProjectCard";

function Projects(props) {
  const { data, error, loading } = useQuery(GET_PROJECTS);

  return (
    <>
      {loading && <Spinner />}

      {error && <p>Something went wrong!</p>}

      {data && data.projects.length > 0 ? (
        <div className={"row mt-3"}>
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No projects. Add one!</p>
      )}
    </>
  );
}

export default Projects;
