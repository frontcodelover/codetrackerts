import React from 'react'

type Props = {
  id : string
}

function AddSessionButton({id}: Props) {
  return (
    <>  
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              <a href={`/user/session/${id}`}>Ajouter une session</a>
            </button>
      </>
      
  )
}

export default AddSessionButton