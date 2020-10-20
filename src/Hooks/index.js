import { useEffect, useState } from "react";
import moment from "moment";

//firebase
import { db } from "../firebase";

//helpers
import {
  collatedTasksExist,
  orderTasksByPriority,
  orderTasksByDate,
} from "../Helpers/index";
import { useAuthValue } from "../Context";

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userCredentials } = useAuthValue();
  useEffect(() => {
    if (!userCredentials) return;
    console.log("task hook fired with usercred:", userCredentials);
    setIsLoading(true);
    let unsubscribe = db
      .collection("tasks")
      .where("userId", "==", userCredentials.uid)
      .orderBy("createdAt", "asc");
    if (!selectedProject) return;
    if (!collatedTasksExist(selectedProject)) {
      unsubscribe = unsubscribe.where("projectId", "==", selectedProject);
    }
    if (selectedProject === "INBOX") {
      unsubscribe = unsubscribe.where("projectId", "==", "INBOX");
    }
    if (selectedProject === "TODAY") {
      unsubscribe = unsubscribe.where(
        "date",
        "==",
        moment().format("MM/DD/YYYY")
      );
    }
    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        taskId: task.id,
        ...task.data(),
      }));
      setTasks(
        selectedProject === "UPCOMING"
          ? newTasks.filter(
              (task) => task.date !== "" && task.archived !== true
            )
          : newTasks.filter((task) => task.archived !== true)
      );
      setArchivedTasks(newTasks.filter((task) => task.archived === true));
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [selectedProject, userCredentials]);

  return { tasks, archivedTasks, isLoading };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const { userCredentials } = useAuthValue();
  useEffect(() => {
    if (!userCredentials) return;
    console.log(
      "project hook has been fired with following user cred:",
      userCredentials
    );
    let unsubscribe = db
      .collection("projects")
      .where("userId", "==", userCredentials.uid)
      .orderBy("createdAt", "asc")
      .onSnapshot((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id,
        }));

        setProjects(allProjects);
      });

    return () => {
      unsubscribe();
    };
  }, [userCredentials]);

  return { projects, setProjects };
};

export const useSortTasks = (tasks, orderBy) => {
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [currentTasks, setCurrentTasks] = useState([]);

  useEffect(() => {
    let overdueTasks = tasks.filter((task) => {
      const taskMoment = moment(task.date, "MM-DD-YYYY");
      const today = moment().format("MM/DD/YYYY");
      const todayMoment = moment(today, "MM-DD-YYYY");
      return task.date !== "" && taskMoment < todayMoment;
    });

    setOverdueTasks(overdueTasks);

    let currentTasks = tasks.filter((task) => {
      const taskMoment = moment(task.date, "MM-DD-YYYY");
      const today = moment().format("MM/DD/YYYY");
      const todayMoment = moment(today, "MM-DD-YYYY");
      return task.date === "" || taskMoment >= todayMoment;
    });

    if (orderBy.priority === true && orderBy.date === false) {
      currentTasks = orderTasksByPriority(currentTasks);
    }

    if (orderBy.priority === false && orderBy.date === true) {
      currentTasks = orderTasksByDate(currentTasks);
    }

    if (orderBy.priority === true && orderBy.date === true) {
      currentTasks = orderTasksByPriority(currentTasks);
      currentTasks = orderTasksByDate(currentTasks);
    }
    setCurrentTasks(currentTasks);
  }, [tasks, orderBy]);

  return { overdueTasks, currentTasks };
};

export const useArchivedTasks = (selectedProject) => {
  const [archivedTasks, setArchivedTasks] = useState([]);
  const { userCredentials } = useAuthValue();
  const [loadingArchivedTasks, setLoadingArchivedTasks] = useState(false);
  useEffect(() => {
    if (!userCredentials) return;
    console.log("archivedTasks hook fired with usercred:", userCredentials);
    setLoadingArchivedTasks(true);
    let unsubscribe = db
      .collection("tasks")
      .where("userId", "==", userCredentials.uid)
      .where("archived", "==", true)
      .orderBy("createdAt", "desc");
    if (
      !selectedProject ||
      selectedProject === "TODAY" ||
      selectedProject === "UPCOMING"
    )
      return;

    if (!collatedTasksExist(selectedProject)) {
      unsubscribe = unsubscribe.where("projectId", "==", selectedProject);
    }
    if (selectedProject === "INBOX") {
      unsubscribe = unsubscribe.where("projectId", "==", "INBOX");
    }

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        taskId: task.id,
        ...task.data(),
      }));
      setArchivedTasks(newTasks);
      setLoadingArchivedTasks(false);
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { archivedTasks, loadingArchivedTasks };
};
