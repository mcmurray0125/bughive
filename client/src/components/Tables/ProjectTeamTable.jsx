import API from "../../utilities/API";
import AddTeamMember from "../Forms/AddTeamMember";
import {
    Table,
    Button,
    Modal,
    ModalHeader,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle
} from "reactstrap"

import "../../assets/css/tables.css"

export default function ProjectTeamTable({setProjectTeam, projectTeam, memberModalOpen, toggleNewMember, projectId}) {
          
    const removeTeamMember = async (projectId, userId) => {
        await API.removeTeamMember(projectId, userId);

        const projectTeamRes = await API.getProjectUsers(projectId);
        setProjectTeam(projectTeamRes);
    };

    return(
        <>
        <div className="table-wrapper project-team-wrapper p-3 bg-white">
            <div className="d-flex justify-content-between align-items-center">
                <p className="dashboard-card-title">Team</p>
                <Button className="new-project-btn" onClick={toggleNewMember}>New Member</Button>
            </div>
            <Modal  isOpen={memberModalOpen} sz="sm">
                <ModalHeader toggle={toggleNewMember}>Add Member</ModalHeader>
                <AddTeamMember
                    projectId={projectId}
                    toggle={toggleNewMember}
                    setProjectTeam={setProjectTeam}
                />
            </Modal>
            {projectTeam.length === 0 ? 
                <p className="m-0 mt-3 ps-2">No Team Members</p>
                :
                <Table className="table-1 project-team-table m-0">
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
                                    <UncontrolledDropdown>
                                        <DropdownToggle
                                            role="button"
                                            size="sm"
                                            color=""
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <i className="fa-solid fa-ellipsis-vertical project-ellipsis"/>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-arrow" end>
                                            <DropdownItem
                                                onClick={() =>
                                                removeTeamMember(projectId, member.user_id)
                                                }
                                            >
                                                Remove Team Member
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </Table>
            }
        </div>
        </>
    )
}