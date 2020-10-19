import React, { useState } from "react";

import { useProjectsValue, useSelectedProjectValue } from "../../Context/index";
import { IndividualProject } from "./IndividualProject";
//Icons

import ArrowIcon from "@material-ui/icons/ArrowForwardIos";

export const Projects = ({ mobileNav, onSelect }) => {
  const { projects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();
  const { selectedProject } = useSelectedProjectValue();
  const [showProjects, setShowProjects] = useState(true);

  const projectsMarkup =
    projects && projects.length > 0 ? (
      projects.map((project) => (
        <li
          key={project.projectId}
          className={selectedProject === project.projectId ? "active" : ""}
        >
          <div
            className="project__individualProjectContainer"
            role="button"
            tabIndex={0}
            onClick={() => {
              setSelectedProject(project.projectId);
              if (mobileNav) onSelect(false);
            }}
            onKeyDown={(e) => {
              if ((e.key = "Enter")) {
                setSelectedProject(project.projectId);
                if (mobileNav) onSelect(false);
              }
            }}
          >
            <IndividualProject project={project} />
          </div>
        </li>
      ))
    ) : (
      <li style={{ marginTop: 5, color: "greys" }}>You have no projects</li>
    );

  return (
    <div className="sidebar__projects">
      <div
        className="projects__header"
        role="button"
        tabIndex={0}
        onClick={() => {
          setShowProjects(!showProjects);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") setShowProjects(!showProjects);
        }}
      >
        <ArrowIcon
          style={{
            fontSize: 14,
            marginRight: 15,
            color: "rgba(0,0,0,.54)",
          }}
          className={showProjects ? "showProjects" : ""}
        />

        <span>Projects</span>
      </div>
      <ul className="projects__list">{showProjects && projectsMarkup}</ul>
    </div>
  );
};
