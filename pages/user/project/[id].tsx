/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../components/firebase/firebase";
import AddSession from '../add-session';
import AddSessionButton from '../../../components/project/session/addSessionButton';
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

interface Session {
  time: any,
}


export default function SingleProject() {
  const [projects, setProjects] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [sessionsNumber, setSessionsNumber] = useState<number>(0);
  const router = useRouter()
  const { id } = router.query
  console.log(id)

  useEffect(() => {
    getProjects()
    getDetailsForSessions()
    timeSum()
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

  const getDetailsForSessions = async () => {
    const sessionsDatabase = query(
      collection(db, "session"),
      where("projectUid", "==", id)
      );
    await getDocs(sessionsDatabase)
      .then((response) => {
        const session : Session[] = response.docs.map((doc) => ({
          time: doc.data().inputs.time,
        }));
        setSessions(session)
        setSessionsNumber(session.length)
      }
    )
  }

  //! Need to fix this with a sum methode for the time
  //? maybe some convert in minutes
  let allTimeTab: number[] = [];
  let sum:any[] = [];
  const timeSum = () => {
    sessions.map(session => {
      const timeFormatHour = session.time.slice(3, 5)
      const timeFormatHourNumber = parseInt(timeFormatHour)

      // console.log(timeFormatHourNumber)
      allTimeTab.push(timeFormatHourNumber)
      console.log(allTimeTab)
    }
    )
  }
     
   

  return (
    <>
      <div className="container mx-auto py-9">
      <h1 className="text-3xl pb-9 font-semibold">Détail du projet</h1>
        <div className="flex flex-col">
          <div className="flex">

            {projects.map((project) => (
      <div className="h-full py-6 px-6 rounded-xl bg-gray-100 w-1/3">
                    <h5 className="text-xl text-gray-700">Votre projet</h5>
                    <div className="my-4">
                        <h1 className="text-5xl font-bold text-gray-800 pb-4">{project.name}</h1>
                  <span className="text-gray-500">{project.stack}</span>
                  <p className='pt-6 font-semibold'>Description du projet :</p>
                        <span className='text-gray-500'>{project.description}</span>
                    </div>
                    
                    <table className="mt-6 -mb-2 w-full text-gray-600">
                        <tbody>
                            <tr>
                                <td className="py-2">Nombre de sessions : </td>
                                <td className="text-green-600 font-semibold">{sessionsNumber} </td> 
                            </tr>
                            <tr>
                                <td className="py-2">Nombre d'heures :</td>
                                <td className="text-green-600 font-semibold">{timeSum()}</td>
  
                            </tr>
                            <tr>
                                <td className="py-2">Date de création du projet</td>
                                <td className="text-green-600 font-semibold">{project.date}</td>
  
                            </tr>
                 
                        </tbody>
                    </table>   
      
              <div className="flex flex-col my-6">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    <a href={`session/${project.uid}`}>Ajouter une session</a>
                </button>
              </div>
              </div>
            ))
              }
      <div className="h-full px-6 bg-white w-4/4">

      <AllSession />

        </div>
          </div>
        </div>
      </div>
    </>
  )
}