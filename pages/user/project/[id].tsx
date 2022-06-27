/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../../components/firebase/firebase";
import AddSession from "../add-session";
import AddSessionButton from "../../../components/project/session/addSessionButton";
import AllSession from "../../../components/project/session/allSession";

interface Props {
  uid: string;
  name: string;
  done: boolean;
  stack: string;
  userID: string;
  description: string;
  date: any;
}[]

interface Session {
  time: any;
}

export default function SingleProject() {
  const [projects, setProjects] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [sessionsNumber, setSessionsNumber] = useState<number>(0);
  const [hoursSession, setHoursSession] = useState<number>(0);
  const [minutesSession, setMinutesSession] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const { id } = router.query;


  useEffect(() => {
    
    getProjects();
    timeSum();
    getDetailsForSessions();
    if (!isLoading) {
      setHoursSession(totalHours);
      setMinutesSession(totalMinutes);
    }
  }, [id, isLoading]);
  
  const getProjects = async () => {
    const dataBaseProject = query(
      collection(db, "project"), where("uid", "==", id),
      );
      await getDocs(dataBaseProject).then((response) => {
        const project: Props[] = response.docs.map((doc) => ({
          uid: doc.data().uid,
          name: doc.data().inputs.name,
          done: doc.data().done,
          stack: doc.data().inputs.stack,
          userID: doc.data().userID,
          description: doc.data().inputs.description,
          date: doc.data().inputs.date,
        }));
        setProjects(project);
    });
  };
  
  const getDetailsForSessions = async () => {
    const sessionsDatabase = query(
      collection(db, "session"),
      where("projectUid", "==", id),
      );
      await getDocs(sessionsDatabase).then((response) => {
        const session: Session[] = response.docs.map((doc) => ({
          time: doc.data().inputs.time,
          createdAt: doc.data().createdAt
        }
        
        )
        );
        console.log(session)
        setSessions(session);
      setSessionsNumber(session.length);
      setIsLoading(false);
    });
  };

 
  //* This code is for the time sum */
  let allMinutesTab: number[] = [];
  let allHoursTab: number[] = [];
  let totalMinutes: number = 0;
  let totalHours: number = 0;

  //* timeSum function map and the sessions time to two arrays of minutes and hours */
  const timeSum = () => {
    sessions.map((session) => {
      const timeFormatMinutes = session.time.slice(3, 5);
      const timeFormatMinutesNumber = parseInt(timeFormatMinutes);
      console.log("coucou" ,timeFormatMinutesNumber)
      allMinutesTab.push(timeFormatMinutesNumber);
      const timeFormatHours = session.time.slice(0, 2);
      const timeFormatHoursNumber = parseInt(timeFormatHours);
      allHoursTab.push(timeFormatHoursNumber);
    });
    sumTimeMinutes();
    sumTimeHours();

  };

  //* sumTimeMinutes function to sum all minutes and convert if minutes is / by 60 to hours */
  function time_convert(total: number) {
    {
      const hours = Math.floor(total / 60);
      allHoursTab.push(hours);
      const minutes = total % 60;
      return minutes;
    }
  }

  //* sumTimeMinutes sum Minutes in allMinutesTabs */
  const sumTimeMinutes = () => {
    for (let i = 0; i < allMinutesTab.length; i++) {
      totalMinutes += allMinutesTab[i];
    }
    return (totalMinutes = time_convert(totalMinutes));
  };

    //* sumTimeMinutes sum Hours in allHoursTabs */
  const sumTimeHours = () => {
    for (let i = 0; i < allHoursTab.length; i++) {
      totalHours += allHoursTab[i];
    }
    return totalHours;
  };

  return (
    <>
      <div className="container mx-auto py-9">
        <h1 className="text-3xl pb-9 font-semibold">Détail du projet</h1>
        <div className="flex flex-col">
          <div className="flex">
            {projects.map((project) => (
              <div className="h-full py-6 px-6 rounded-xl bg-gray-100 w-1/3">
                <h5 className="text-xl text-gray-700">Votre projet</h5>
                <table className="mt-6 -mb-2 w-full text-gray-600">
                  <tbody> 
                    <tr>
                      <td className="py-2">Date de création du projet</td>
                      <td className="text-green-600 font-semibold">
                        {project.date}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="my-4">
                  <h1 className="text-5xl font-bold text-gray-800 pb-4">
                    {project.name}
                  </h1>
                  <span className="text-gray-500">{project.stack}</span>
                  <p className="pt-6 font-semibold">Description du projet :</p>
                  <span className="text-gray-500">{project.description}</span>
                </div>


                <div className="flex flex-col my-6">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    <a href={`session/${project.uid}`}>Ajouter une session</a>
                  </button>
                </div>
              <div className="grid grid-cols-3 gap-2">

                <div className="text-2xl bg-orange-400 text-white rounded-xl p-5 text-center col-span-1">Sessions <br />{sessionsNumber}</div>
                <div className="text-2xl bg-blue-400 text-white rounded-xl p-5 text-center col-span-1">Durée <br />{hoursSession + " h " + minutesSession}</div>
                </div>
              </div>
            ))}
            <div className="h-full px-6 bg-white w-4/4">
              <AllSession uid={""} date={[]} note={[]} sessionName={""} time={undefined} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
