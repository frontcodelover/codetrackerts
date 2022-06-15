import React from 'react'
import Image from 'next/image'
import codetracker from "../../public/assets/images/codetracker.png";

//* Composant Image a afficher sur la Home

export default function ImageSection() {
  return (
    <Image src={codetracker} alt="codetracker-home" className="h-auto w-full"/> 
  )
}