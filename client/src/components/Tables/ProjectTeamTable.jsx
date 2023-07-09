import { useState, useEffect } from "react";
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
    CardBody,
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink
} from "reactstrap"

export default function ProjectTeamTable({
        setProjectTeam,
        projectTeam,
        memberModalOpen,
        toggleNewMember,
        projectId,
        projectData
    })
{
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const startIndex = (currentPage - 1) * 4;
    const endIndex = startIndex + 4;

    const removeTeamMember = async (projectId, userId) => {
        await API.removeTeamMember(projectId, userId);

        const projectTeamRes = await API.getProjectUsers(projectId);
        setProjectTeam(projectTeamRes);
    };

    // Pagination
    useEffect(() => {
        let calculatedPages = Math.ceil(projectTeam.length / 4);
        setTotalPages(calculatedPages);
    }, [projectTeam]);

    useEffect(() => {
        setCurrentPage(1);
    }, [totalPages]);

    let items = [];
    const paginate = (number) => setCurrentPage(number);

    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <PaginationItem key={number} active={currentPage === number} onClick={() => paginate(number)}>
                <PaginationLink>
                {number}
                </PaginationLink>
            </PaginationItem>
        );
    }

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
                    {projectTeam.slice(startIndex, endIndex).map((member) => {
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
            {totalPages > 1 && 
                <CardFooter>
                    <Pagination className='w-100 d-flex justify-content-start'>
                    {items}
                    </Pagination>
                </CardFooter>
            }
        </Card>
        </>
    )
}