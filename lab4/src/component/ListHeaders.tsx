
import React, {useState } from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import AddDataForm from './AddDataForm';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const HeadersIN = () => {
    
    const [showform, setShowForm] = useState<boolean>(false);
    
    const success =() => {
        setShowForm(false);
        window.location.reload(false);
    }
    const cancel = () => { 
       setShowForm(false);
        window.location.reload(false);
    }

    return(
        <>
        <div style={{background:'grey', textAlign:'center', fontSize:30,fontFamily:'Arial',color:'greenyellow'}}>
            Expense Tracker
        </div>
            <Row xs={2} md={5} lg={8}>
                <Card style={{width:'10rem',background:'black', color:'white', margin:'2px'}}>
                    <Card.Body>
                        <Card.Title>Date</Card.Title>
                    </Card.Body>
                </Card>
                <Card style={{width:'15rem',background:'black', color:'white',margin:'2px'}}>
                    <Card.Body>
                        <Card.Title>Product Purchased</Card.Title>
                    </Card.Body>
                </Card>
                <Card style={{width:'10rem',background:'black', color:'white',margin:'2px'}}>
                    <Card.Body>
                        <Card.Title>Price</Card.Title>
                    </Card.Body>
                </Card>
                <Card style={{width:'10rem',background:'black', color:'white',margin:'2px'}}>
                    <Card.Body>
                        <Card.Title>Payee</Card.Title>
                    </Card.Body>
                </Card>
                <span style={{float:'right'}}>
                    <Popup 
                        position='right top' 
                        modal open={showform} 
                        trigger= {<Button 
                                    style={{width:'4rem',background:'greenyellow', float:'right'}}
                                    onClick={()=>setShowForm(true)}>
                                        Add
                                  </Button>}> 
                                    {   
                                        <>
                                            <div className='form'>
                                                <AddDataForm onTrue={success} onClose={cancel}/>
                                            </div>
                                        </>
                                    }
                    </Popup>
                </span>
            </Row>
        </>   
    )
}

export default HeadersIN;
