import React, {useState} from 'react'
import { useAuth } from '../../context/AuthContext'
import AllProjects from '../../components/project/allProjects';




const Dashboard = () => {
    const currentUser = useAuth().user;
    console.log(currentUser)


    return (
        <div className="container mx-auto">
            <AllProjects />
        </div>
    )
}
    
export default Dashboard