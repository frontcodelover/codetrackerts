import React from 'react'

type Props = {}

function AddSessionButton({}: Props) {
  return (
    <>  
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              <a href="#">Ajouter une session</a>
            </button>
      </>
      
  )
}

export default AddSessionButton