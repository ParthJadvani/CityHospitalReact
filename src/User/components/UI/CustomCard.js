import React from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';

function CustomCard({ value }) {
    return (
        <Card
            style={{
                width: '18rem',
                height: '14rem'
            }}
        >   
            {
                value.url ? <img
                alt="Sample"
                src="https://picsum.photos/300/200"
            /> : null
            }
            
            <CardBody>
                <CardTitle tag="h5">
                    {value.name}
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                    {'Price: '+ value.price}
                </CardSubtitle>
                <CardText>
                    {value.desc}
                </CardText>
                <CardText>
                    {'Expiry Date: '+ value.date}
                </CardText>

                {
                    value.btn ? <Button>
                    Button
                </Button> : null
                }
                
            </CardBody>
        </Card>
    );
}

export default CustomCard;