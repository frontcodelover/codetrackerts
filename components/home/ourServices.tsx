import React from "react";
import OurServicesCard from "./ourServicesCard";
import { FaBeer } from "react-icons/fa";

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
