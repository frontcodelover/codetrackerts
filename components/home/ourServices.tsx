import React from "react";
import OurServicesCard from "./ourServicesCard";

//* Composant OurServices permet de mettre en avant les cards pour les services de l'application

export default function OurServices() {
  return (
    <>
      <h2 className="text-5xl text-center pt-12">Notre service</h2>
      <h3 className="text-center py-2 text-lg">
        Tracker votre temps de développement
      </h3>
      <OurServicesCard />
    </>
  );
}
