import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Graph from "./graphSession";
import { orderBy } from "firebase/firestore/lite";

interface Props {
  uid: string;
  date: string[];
  note: string[];
  sessionName: string;
  time: string | string[] | number[] | any;
}
[];

function AllSession({ uid, date, note, sessionName, time }: Props) {
  const [sessions, setSessions] = useState<any[]>([]);
  const [sessionsNumber, setSessionsNumber] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [arrayOfLabel, setArrayOfLabel] = useState<string[]>([]);
  const [arrayOfDate, setArrayOfDate] = useState<string[]>([]);
  const router = useRouter();
  const { id } = router.query;

  const getSessions = async () => {
    const dataBaseSession = query(
      collection(db, "session"),
      where("projectUid", "==", id),
      orderBy("createdAt", "asc")

    );
    await getDocs(dataBaseSession).then((response) => {
      const session: Props[] = response.docs.map((doc) => ({
        uid: doc.data().uid,
        date: doc.data().inputs.date,
        note: doc.data().inputs.note,
        sessionName: doc.data().inputs.sessionName,
        time: doc.data().inputs.time,
      }));
      setIsLoading(false);
      setSessions(session);
      setSessionsNumber(session.length);
      setArrayOfLabel(session.map((session) => session.time));
      setArrayOfDate(session.map((session) => session.date));
    });
  };
  useEffect(() => {
    getSessions();
    if (!isLoading) {
      dateArrayMap();
    }
  }, [id, isLoading]);
  
  const dateArray: any[] = [];
  const dateArrayMap = () => {
    sessions.map((date) => {
      return dateArray.push(date.date);
    });
  };
  // console.log("ma date", arrayOfDate);

  const tab = {
    date: arrayOfDate,
    duree : arrayOfLabel
}

  // console.log(tab)

  return (
    <>
      {sessionsNumber <= 0 ? (
        <>
          <h1>
            Aucune session pour ce projet. Ajoutez votre première session
            maintenant.
          </h1>
        </>
      ) : (
        <div className="">
          <div className="">
            <div className="">
              <div className="border-b border-gray-200 shadow">
                <>
                  <table className="">
                    <thead className="bg-purple-600">
                      <tr>
                        <th className="px-6 py-2 text-xs text-white flex-auto">
                          Date
                        </th>
                        <th className="px-6 py-2 text-xs text-white flex-auto">
                          Nom de la session
                        </th>
                        <th className="px-6 py-2 text-xs text-white flex-auto">
                          Note sur la session
                        </th>
                        <th className="px-6 py-2 text-xs text-white flex-auto">
                          Durée
                        </th>
                      </tr>
                    </thead>

                    {sessions.map((session) => (
                      <tbody className="bg-white container" key={session.uid}>
                        <tr className="whitespace-pre-line">
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 flex">
                              {session.date}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {session.sessionName}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {session.note}
                          </td>

                          <td className="px-6 py-4">{session.time}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </>
              </div>
            </div>
          </div>
        </div>
      )}
      <Graph tab={tab} />
    </>
  );
}

export default AllSession;
