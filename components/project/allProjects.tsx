import React, { useState, useEffect } from "react";
import { db } from "../../components/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import TextProjectSreen from '../../components/project/textProjectSreen';

interface Project {
  uid: string;
  name: string;
  done: boolean;
  stack: string;
  userID: string;
  description: string;
 
}

const AllProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);


  useEffect(() => {
    getProjects();
  }, []);

  console.log(projects);
 
  function getProjects() {
    const dataBaseProject = collection(db, "project");
    getDocs(dataBaseProject)
      .then((response) => {
        const project: Project[] = response.docs.map((doc) => ({
          uid: doc.data().uid,
          name: doc.data().name,
          done: doc.data().done,
          stack: doc.data().stack,
          userID: doc.data().userID,
          description: doc.data().description,
         
        }));
        setProjects(project);
      })
      .catch((error) => {
        console.log(error.message);
      });
    }
    


  return (
    <div className="py-9">
          <h1 className="text-2xl pb-9">Tous les projets</h1>
          <TextProjectSreen />
      <div className="container flex justify-center mx-auto">
        <div className="flex flex-col">
          <div className="w-full">
            <div className="border-b border-gray-200 shadow">
              <table>
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Nom du projet
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Description
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">Stack</th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Date de création
                    </th>
                    <th className="px-6 py-2 text-xs text-gray-500">Edit</th>
                    <th className="px-6 py-2 text-xs text-gray-500">Delete</th>
                    <th className="px-6 py-2 text-xs text-gray-500">
                      Voir les stats
                    </th>
                  </tr>
                </thead>
                {projects.map((project) => (
                  <tbody className="bg-white" key={project.uid}>
                    <tr className="whitespace-nowrap">
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {project.name}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {project.description}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {project.stack}
                        </div>
                      </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                {/* {dateToString(project.date)} */}
                        {/* {project.date} */}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="px-4 py-1 text-sm text-white bg-blue-400 rounded"
                        >
                          Edit
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="px-4 py-1 text-sm text-white bg-red-400 rounded"
                        >
                          Delete
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="px-4 py-1 text-sm text-white bg-green-400 rounded"
                        >
                          Stats
                        </a>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
