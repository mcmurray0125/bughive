

export default function ProjectHeader({projectData}) {

  return (
    <div className="p-1 pb-3 d-flex align-items-center">
        <h2 className="m-0" style={{flex: "1.5"}}>{projectData.name}</h2>
        <h5 className="m-0" style={{flex: "1"}}>{projectData.description}</h5>
    </div>
  )
}
