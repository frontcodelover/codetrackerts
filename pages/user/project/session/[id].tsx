import React from 'react'
import { useRouter } from 'next/router'
import AddSessionFrom from '../../../../components/project/session/addSessionFrom'

type Props = {}

export default function Session({}: Props) {
  const router = useRouter()
  const { id } = router.query




  return (
    <>
    <div className='text-5xl'>Ajouter une session de code</div>
    <AddSessionFrom id={id} />
    </>
  )
}