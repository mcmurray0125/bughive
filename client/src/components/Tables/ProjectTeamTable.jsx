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
    DropdownToggle,
    Card,
    CardHeader,
    CardBody
} from "reactstrap"

import "../../assets/css/tables.css"

export default function ProjectTeamTable({
        setProjectTeam,
        projectTeam,
        memberModalOpen,
        toggleNewMember,
        projectId,
        projectData
    })
{

    const removeTeamMember = async (projectId, userId) => {
        await API.removeTeamMember(projectId, userId);

        const projectTeamRes = await API.getProjectUsers(projectId);
        setProjectTeam(projectTeamRes);
    };

    return(
        <>
        <Card className="table-wrapper project-team-table">
            <CardHeader>
            <div className="d-flex justify-content-between align-items-center">
                <h5 className="dashboard-card-title">Team</h5>
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
            </CardHeader>
            <CardBody className="p-2">
            {projectTeam.length === 0 ? 
                <p className="m-2">No Team Members</p>
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
                                                {`Remove ${member.first_name} from ${projectData.name}`}
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

            </CardBody>
        </Card>
        </>
    )
}