import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import AllProjects from "../../components/project/my-projects";

//* le composant Dashboard est un composant qui permet d'afficher la liste des projets de l'utilisateur connecté
//? Feature un recap de son profil

interface IAllProject {
  userUid: any;
}

const Dashboard = (props: IAllProject) => {
  const [userUid, setUserUid] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setUserUid(user.uid);
    }
  }, [user]);

  if (user.uid) {
    return (
      <div className="container mx-auto">
        <AllProjects userUid={userUid} />
      </div>
    );
  }
  return <div>Pas de projet</div>;
};

export default Dashboard;
