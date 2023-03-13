import React, { useEffect, useState } from 'react';
import { Alert, Card, Row } from 'react-bootstrap';
import IDisplayData from '../model/DisplayData';
import { getDisplayData } from '../service/DisplayDataService';
import LoadingIndicator from '../utility/LoadingIndicator';
import { LoadingStatus } from '../utility/LoadingStatus';
import HeadersIN from './ListHeaders';

const DisplayData =() => {

    const[status,setStatus]= useState<LoadingStatus>('LOADING');
    const[displayData,setDisplayData]=useState<IDisplayData[]>([]);
    const[error,setError]=useState<Error| null>(null);
    const [sum,setSum]=useState<number|null>();
    const [johnExpense,setJohnExpense] = useState<number>(0);
    const [vickyExpense,setVickyExpense] = useState<number>(0);

    var johnInitial:number=0
    var vickyInitial:number=0
    
    useEffect(
        ()=>{
            const fetchDisplayData= async()=>{
                try{
                    const data = await getDisplayData()
                    setDisplayData(data);
                    setSum(data.reduce((res,p)=> res = res + p.price,0))
                    setStatus('LOADED');
                    
                    data.map((expense) => (
                        expense.payeeName==="John" ? 
                        (
                            johnInitial = johnInitial + expense.price
                        ):
                        
                        (
                            vickyInitial = vickyInitial + expense.price
                        )
                    ))
                    setJohnExpense(johnInitial)
                    setVickyExpense(vickyInitial)
                }catch(error:any){
                    setStatus('ERROR_LOADING')
                    setError(error)
                } 
                
        };
        fetchDisplayData();
        },
        []
    )
    
    let el;

    switch(status){
      case 'LOADING':
        el=(
          <LoadingIndicator 
            size='large'
            message="We are fetching the list of restraunts, 
            Please wait..."
            />
        );
        break;

        case 'ERROR_LOADING':
        el=(
          <Alert variant="danger my-5">
            {error?.message}
          </Alert>

        );
        break;

        case 'LOADED':
        el=(
            <>
            <HeadersIN/>
            {   
                displayData.map((data)=>
                <>
                <Row xs={2} md={5} lg={8}>
                    <Card style={{width:'10rem',background:'goldenrod', color:'black', margin:'2px'}}>
                        <Card.Body>
                            <Card.Title>{data.setDate}</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card style={{width:'15rem',background:'cyan', color:'black',margin:'2px'}}>
                        <Card.Body>
                            <Card.Title>{data.product}</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card style={{width:'10rem',background:'violet', color:'black',margin:'2px'}}>
                        <Card.Body>
                            <Card.Title>{data.price}</Card.Title>
                        </Card.Body>
                    </Card>
                    <Card style={{width:'10rem',background:'cyan', color:'black',margin:'2px'}}>
                        <Card.Body>
                            <Card.Title>{data.payeeName}</Card.Title>
                        </Card.Body>
                    </Card>
                    
                    
                </Row>
                </>
                
                )
                 
            }
            <hr/>
            <Row xs={2} md={2} lg={2}>
            <Card style={{width:'20rem',background:'cyan', color:'black',margin:'2px'}}>
                <Card.Body>
                    <Card.Title>Total</Card.Title>
                </Card.Body>
            </Card>
            <Card style={{width:'10rem',background:'lightgreen', color:'black',margin:'2px'}}>
                <Card.Body>
                    <Card.Title>{sum}</Card.Title>
                </Card.Body>
            </Card> 
            </Row>

            <Row xs={2} md={2} lg={2}>
            <Card style={{width:'20rem',background:'cyan', color:'black',margin:'2px'}}>
                <Card.Body>
                    <Card.Title>John Expense</Card.Title>
                </Card.Body>
            </Card>
            <Card style={{width:'10rem',background:'lightblue', color:'black',margin:'2px'}}>
                <Card.Body>
                    <Card.Title>{johnExpense}</Card.Title>
                </Card.Body>
            </Card> 
            </Row>

            <Row xs={2} md={2} lg={2}>
            <Card style={{width:'20rem',background:'cyan', color:'black',margin:'2px'}}>
                <Card.Body>
                    <Card.Title>Vicky Expense</Card.Title>
                </Card.Body>
            </Card>
            <Card style={{width:'10rem',background:'grey', color:'black',margin:'2px'}}>
                <Card.Body>
                    <Card.Title>{vickyExpense}</Card.Title>
                </Card.Body>
            </Card> 
            </Row>

            <Row xs={2} md={2} lg={2}>
            <Card style={{width:'20rem',background:'red', color:'black',margin:'2px'}}>
                <Card.Body>
                    <Card.Title>{johnExpense>vickyExpense ? "Pay John" : "Pay Vicky"}</Card.Title>
                </Card.Body>
            </Card>
            <Card style={{width:'10rem',background:'red', color:'black',margin:'2px'}}>
                <Card.Body>
                    <Card.Title>{Math.abs((johnExpense-vickyExpense))}</Card.Title>
                </Card.Body>
            </Card> 
            </Row>
            </>
         
        );
        break;
    }
    return (el);
}

export default DisplayData;
