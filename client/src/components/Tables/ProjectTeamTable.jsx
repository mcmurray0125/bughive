import {useEffect, useState} from "react";
import { Table, Button } from "reactstrap"
import { Link } from "react-router-dom"

import UsersCell from "./UsersCell";
import API from "../../utilities/API";
import "../../assets/css/tables.css"

export default function ProjectTeamTable({projectTeam}) {
          
    return(
        <>
        <div className="table-wrapper p-3 bg-white">
            <div className="d-flex justify-content-between align-items-center">
                <p className="dashboard-card-title">Team</p>
                <Button className="new-project-btn">New Member</Button>
            </div>
            <Table hover className="projects-table m-0">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                    {projectTeam.map((member) => {
                        return(
                            <tr key={member.user_id}>
                                <td>{member.first_name} {member.last_name}</td>
                                <td>{member.email}</td>
                                <td>{member.role}</td>
                                <td className="d-flex justify-content-center align-items-center projects-more">
                                    <i className="fa-solid fa-ellipsis-vertical project-ellipsis"></i>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </Table>
        </div>
        </>
    )
}