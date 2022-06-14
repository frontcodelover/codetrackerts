import React from "react";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineProfile } from "react-icons/ai";
import { MdQueryStats } from "react-icons/md";
import { CgArrowTopRight } from "react-icons/cg";

export default function OurServicesCard() {
  return (
    <>
      <div className="px-3 md:lg:xl:px-40 py-10 bg-opacity-10">
        <div className="grid grid-cols-1 md:lg:xl:grid-cols-4 group bg-white ">
          <div className="m-6 p-10 flex flex-col items-center text-center group md:lg:xl:border md:lg:xl:border-b rounded-lg">
            <span className="p-5 rounded-full bg-red-500 text-white ">
              <BiTimeFive size={42} />
            </span>
            <p className="text-xl font-medium text-slate-700 mt-5">
              Tracker votre temps
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Tracker votre temps et observez le
              temps que vous passez à coder.
            </p>
          </div>

          <div className="m-6 p-10 flex flex-col items-center text-center group md:lg:xl:border md:lg:xl:border-b rounded-lg">
            <span className="p-5 rounded-full bg-orange-500 text-white  ">
              <AiOutlineProfile size={42} />
            </span>
            <p className="text-xl font-medium text-slate-700 mt-5">
              Listez les specs de vos projets
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Un dashboard accessible avec tous vos projets et leur stacks
              associées.
            </p>
          </div>

          <div className="m-6 p-10 flex flex-col items-center text-center group md:lg:xl:border rounded-lg">
            <span className="p-5 rounded-full bg-yellow-500 text-white ">
              <MdQueryStats size={42} />
            </span>
            <p className="text-xl font-medium text-slate-700 mt-5">
              Visualisez les statistiques
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Visualisez et analisez les statistiques liées à chacun de vos
              projets.
            </p>
          </div>

          <div className="m-6 p-10 flex flex-col items-center text-center group  md:lg:xl:border rounded-lg">
            <span className="p-5 rounded-full bg-lime-500 text-white ">
              <CgArrowTopRight size={42} />
            </span>
            <p className="text-xl font-medium text-slate-700 mt-5">
              Restez motivé pour apprendre
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Observez le temps passé sur un projet et rester motivé
              au quotidien.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
