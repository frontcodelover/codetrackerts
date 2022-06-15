import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../components/firebase/firebase";
import AllSession from '../../../components/project/session/allSession';

interface Props {
  uid: string,
    name: string,
    done: boolean,
    stack: string,
    userID: string,
    description: string,
    date: any,
}


export default function SingleProject() {
  const [projects, setProjects] = useState<any[]>([]);
  const router = useRouter()
  const { id } = router.query
  console.log(id)

  useEffect(() => {
    getProjects()
  }, [id]);

  
  const getProjects = async () => {
    const dataBaseProject = query(
      collection(db, "project"),
      where("uid", "==", id)
    );
    await getDocs(dataBaseProject)
      .then((response) => {
        const project: Props[] = response.docs.map((doc) => ({
          uid: doc.data().uid,
          name: doc.data().inputs.name,
          done: doc.data().done,
          stack: doc.data().inputs.stack,
          userID: doc.data().userID,
          description: doc.data().inputs.description,
          date: doc.data().inputs.date,
        }));
        setProjects(project)
      }
    )
  }
  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col">
          <div className="flex-col">
            {projects.map((project) => (
              <div className="flex flex-col">
                <div className="flex-col">
                  <h1 className="text-3xl pb-9 font-semibold">{project.name}</h1>
                  Description du projet
                  <p>{project.description}</p>
                  Stack utilisé pour le projet
                  <p>{project.stack}</p>
                  Date de création du projet
                  <p>{project.date}</p>
                </div>
              </div>
            ))
              }
          </div>
        </div>
      </div>
      <AllSession />
    </>
  )
}