import React from 'react'
import { useRouter } from 'next/router'
import AddSessionFrom from '../../../../components/project/session/addSessionFrom'

export default function Session() {
  const router = useRouter()
  const { id } = router.query


  return (
    <>
    <div className='text-5xl'>Ajouter une session de code</div>
    <AddSessionFrom id={id} note={''} date={''} time={0} sessionName={''} />
    </>
  )
}