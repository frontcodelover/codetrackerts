import React from 'react'
import Image from 'next/image'
import codetracker from "../../public/assets/images/codetracker.png";

type Props = {}

export default function ImageSection({}: Props) {
  return (
    <Image src={codetracker} alt="codetracker-home" className="h-auto w-full"/> 
  )
}