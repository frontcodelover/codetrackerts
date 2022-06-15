import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import TextProjectSreen from "./textProjectSreen";
import AddNewProjectButtonText from "./addNewProjectButtonText";

//* Ce composant permet d'afficher la liste des projets de l'utilisateur connecté

interface Project {
  uid: string;
  name: string;
  done: boolean;
  stack: string;
  userID: string;
  description: string;
  date: any;
}

const AllProjects = (userUid: any) => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    getProjects();
  }, [userUid]);

  const deletePost = async (e: any) => {
    e.preventDefault();
    const deleteProject = doc(db, "project", e.target.id);
    //alert("C'est supprimé")
    let verificationBeforeDelete = prompt(
      "Etes-vous sûr de vouloir supprimer ce projet ? oui ou non"
    );
    if (verificationBeforeDelete?.toLowerCase() === "oui") {
      await deleteDoc(deleteProject);
    } else {
      alert("Vous avez annulé la suppression");
    }
  };

  //* On récupère les projets de l'utilisateur connectés pour ensuite afficher la liste dans un tableau
  const getProjects = async () => {
    const dataBaseProject = query(
      collection(db, "project"),
      where("userID", "==", userUid.userUid)
    );
    await getDocs(dataBaseProject)
      .then((response) => {
        const project: Project[] = response.docs.map((doc) => ({
          uid: doc.data().uid,
          name: doc.data().inputs.name,
          done: doc.data().done,
          stack: doc.data().inputs.stack,
          userID: doc.data().userID,
          description: doc.data().inputs.description,
          date: doc.data().inputs.date,
        }));
        setProjects(project);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };



  return (
    <div className="py-9">
      <h1 className="text-3xl pb-9 font-semibold">Tous les projets</h1>
      <TextProjectSreen />
      <div className="table-fixed">
        <div className="flex justify-center mx-auto">
          <div className="flex-col">
            <div className="">
              <div className="border-b border-gray-200 shadow">
                <>
                  <table className="table-fixed ">
                    <thead className="bg-purple-600 table-fixed ">
                      <tr>
                        <th className="px-6 py-2 text-xs text-white">
                          Nom du projet
                        </th>
                        <th className="px-6 py-2 text-xs text-white">
                          Description
                        </th>
                        <th className="px-6 py-2 text-xs text-white">Stack</th>
                        <th className="px-6 py-2 text-xs text-white">
                          Date de création
                        </th>
                        <th className="px-6 py-2 text-xs text-white">Edit</th>
                        <th className="px-6 py-2 text-xs text-white">Delete</th>
                        <th className="px-6 py-2 text-xs text-white">
                          Voir les stats
                        </th>
                      </tr>
                    </thead>
                    {projects.map((project) => (
                      <tbody className="bg-white container" key={project.uid}>
                        <tr className="whitespace-pre-line">
                          <td className="px-6 py-4 text-sm text-zinc-900 font-semibold">
                            <a href={`project/${project.uid}`}>{project.name}</a>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 flex">
                              {project.description}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {project.stack}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {project.date}
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
                            <button
                              className="px-4 py-1 text-sm text-white bg-red-400 rounded"
                              id={project.uid}
                              onClick={deletePost}
                            >
                              Delete
                            </button>
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
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddNewProjectButtonText />
    </div>
  );
};

export default AllProjects;
