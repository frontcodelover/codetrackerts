import React from 'react'
import AddNewProject from '../../components/project/addNewProject'



export default function addProject() {

    return (
        <>
            <div className='container mx-auto py-9'>
                <h1 className="text-3xl pb-9 font-semibold">Ajouter un projet</h1>
                <AddNewProject />
            </div>
      </>
  )
}