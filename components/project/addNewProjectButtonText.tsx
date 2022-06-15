import React from "react";

//* Permet d'afficher le bouton pour Ajouter un nouveau projet pour un utilisateur connecté qui a déjà des projets

function AddNewProjectButtonText() {
  return (
    <>
      <h2 className="py-9 text-2xl">Un nouveau projet à tracker ?</h2>
      <p className="pb-6">
        Pour ajouter un nouveau projet à tracker, cliquant ici
      </p>
      <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-300 delay-150 hover:delay-0">
        <a href="/user/add-project">Ajouter un projet</a>
      </button>
    </>
  );
}

export default AddNewProjectButtonText;
