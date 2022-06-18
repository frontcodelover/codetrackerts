import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from "../../firebase/firebase";

interface Props {
  id : string,
  uid: string,
  date : string[],
  note: string[],
  sessionName: string,
  time: string[],
}

function AllSession({ uid, date, note, sessionName, time }: Props) {
  const [sessions, setSessions] = useState<any[]>([]);
  const [sessionsNumber, setSessionsNumber] = useState<number>(0);
  const router = useRouter()
  const { id } = router.query
  
  const getSessions = async () => {
    const dataBaseSession = query(
      collection(db, "session"),
      where("projectUid", "==", id)
    );
    await getDocs(dataBaseSession)
      .then((response) => {
        const session : Props[] = response.docs.map((doc) => ({
          uid: doc.data().uid,
          date: doc.data().inputs.date,
          note: doc.data().inputs.note,
          sessionName: doc.data().inputs.sessionName,
          time: doc.data().inputs.time,
        }));
        setSessions(session)
        setSessionsNumber(session.length)
      }
    )
  }
  useEffect(() => {
    getSessions()
  }
  , [id]);


  return (
    <>
      {sessionsNumber <= 0 ? ( 
        <>
          <h1>Aucune session pour ce projet. Ajoutez votre première session maintenant.</h1>
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
                           <th className="px-6 py-2 text-xs text-white flex-auto">Note sur la session</th>
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
                             
                             <td className="px-6 py-4">
                             {session.time}

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
      )}
    </>
  )
}

export default AllSession