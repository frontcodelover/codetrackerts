import React, { useState } from "react";
import { nanoid } from "nanoid";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const uuid = nanoid();

type Props = {
  id?:string | string[],
  note : string,
  date : string,
  time : number,
  sessionName : string,
}

function AddSessionFrom({id}: Props) {
  console.log("mon id dans le add session from : ", id)
  const [inputs, setInputs] = useState({}) as any;

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values: any) => ({ ...values, [name]: value }));
    // console.log(event)
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    await setDoc(doc(db, "session", uuid), {
      projectUid: id,
      uid : uuid,
      inputs,
    });
    //  refreshPage()
  };

  return (
    <div className="w-full max-w-3xl">
    <form onSubmit={handleSubmit}>
      <p className="block text-gray-700 text-sm font-bold mb-2">
        Donnez un nom à votre session
      </p>
      <input
        required
        type="text"
        name="sessionName"
        value={inputs.sessionName || ""}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder={`Ajoutez le nom de votre projet`}
      />

      <p className="block text-gray-700 text-sm font-bold mb-2 pt-6">
        Qu'avez-vous fait lors de cette session ?
      </p>
      <textarea
        name="note"
        value={inputs.note}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Décrivez votre projet..."
      ></textarea>
      <p className="block text-gray-700 text-sm font-bold mb-2 pt-6">
        Quelle a été la durée de votre session ?
      </p>
      <input
        required
        type="time"
        pattern="\d{2}-\d{2}"
        name="time"
        value={inputs.time || ""}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder={`Type de projet`}
      />
      <p className="block text-gray-700 text-sm font-bold mb-2 pt-6">
        Quand la session s'est-elle déroulée ?
      </p>
      <input
        required
        type="date"
        name="date"
        pattern="\d{2}-\d{2}-\d{4}"
        value={inputs.date || ""}
        min="2020-01-01"
        max="2050-12-31"
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder={`Stack utilisée`}
      />
      <input
        type="submit"
        value="Sauvegarder"
        className="my-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:cursor-pointer"
      />
    </form>
  </div>
  )
}

export default AddSessionFrom