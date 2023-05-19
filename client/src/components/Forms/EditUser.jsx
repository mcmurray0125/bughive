import React from 'react'
import { Card, Form, FormGroup, Label, Input, Button, CardHeader } from "reactstrap"

export default function EditUser(props) {
    
  return (
    <Card className="edit-user-wrapper">
        <CardHeader>Edit User Information</CardHeader>
        <div className='d-flex align-items-center h-100 ps-3'>
            <h6 className='m-0'>No Dev Selected</h6>
        </div>
    </Card>
  )
}
