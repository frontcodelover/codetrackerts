import React from 'react'
import AddSessionButton from '../../components/project/session/addSessionButton'

type Props = {
  id: string
}

function AddSession({id}: Props) {
  console.log(id)
  return (
    <>
    <div>add-session</div>
    <AddSessionButton id={id} />
    </>
  )
}

export default AddSession