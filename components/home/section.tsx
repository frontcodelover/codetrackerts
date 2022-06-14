import React from 'react'
import ImageSection from './imageSection'

type Props = {}

export default function section({}: Props) {
  return (
    <section className="py-10">
    <div className="flex lg:flex-row flex-col items-center justify-center">
      <div className="flex flex-col lg:basis-1/2">
        <h1 className="text-6xl">Tracker vos habitudes <br />en matière de code</h1>
        <h2 className="text-2xl pt-6 pb-6">
          Mesurez efficacement le temps que vous passez à coder
        </h2>
        <div className="flex py-6">
        <button className="bg-white border border-purple-600 py-3 px-6 mr-3 rounded font-semibold text-purple-600">Se connecter</button>
        <button className="bg-purple-600 py-3 px-6 rounded text-white font-semibold">Ajouter un projet</button>
        </div>
      </div>
      <div className="flex lg:basis-1/2 w-full h-full">
        <ImageSection />
      </div>
    </div>
    <p className="py-6">
      Codetracker vous permet d&apos;optimiser votre temps et d&apos;avoir du recul sur
      votre apprentissage.
    </p>
  </section>
  )
}