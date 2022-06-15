import React, { useState, useEffect } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { nanoid } from "nanoid";

const uuid = nanoid();

interface IAddProject {
  userUid: any;
  name: string;
  stack: string;
  description: string;
  date: string;
  input: string;
}

export default function AddNewProject(props: IAddProject) {
  const [inputs, setInputs] = useState({});
  const [userUid, setUserUid] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setUserUid(user.uid);
    }
  }, [user]);

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    // console.log(event)
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    await setDoc(doc(db, "project", uuid), {
      uid: uuid,
      userID: userUid,
      done: false,
      inputs,
    });
    //  refreshPage()
  };


  return (
    <div className="w-full max-w-3xl">
      <form onSubmit={handleSubmit}>
        <p className="block text-gray-700 text-sm font-bold mb-2">
          Donnez un nom à votre projet
        </p>
        <input
          required
          type="text"
          name="name"
          value={inputs.name || ""}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder={`Ajoutez le nom de votre projet`}
        />

        <p className="block text-gray-700 text-sm font-bold mb-2 pt-6">
          Décrivez votre projet. Fonctionnalités, feature, apprentissage...
        </p>
        <textarea
          name="description"
          value={inputs.description}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Décrivez votre projet..."
        ></textarea>
        <p className="block text-gray-700 text-sm font-bold mb-2 pt-6">
          Quel est son type ? (apprentissage, projet client, étude...)
        </p>
        <input
          required
          type="text"
          name="type"
          value={inputs.type || ""}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder={`Type de projet`}
        />
        <p className="block text-gray-700 text-sm font-bold mb-2 pt-6">
          Quelles est la stack principale ?
        </p>
        <input
          required
          type="text"
          name="stack"
          value={inputs.stack || ""}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder={`Stack utilisée`}
        />
        <p className="block text-gray-700 text-sm font-bold mb-2 pt-6">
          Quand a-t-il été créé ?
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
  );
}
