import React from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';

function CustomCard({ value, btnVal, handleCart, favItem }) {
    return (
        <Card
            style={{
                width: '18rem',
                height: '18rem'
            }}
        >
            {/* {
                value.url ? <img
                alt="Sample"
                src="https://picsum.photos/300/200"
            /> : null
            } */}

            <CardBody>
                <CardTitle tag="h5">
                    {value.name}
                    <FavoriteBorderIcon sx={{ color: red[500] }}  onClick={() => favItem(value.id)}/>
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                    {'Price: ' + value.price}
                </CardSubtitle>
                <CardText>
                    {value.desc}
                </CardText>
                <CardText>
                    {'Expiry Date: ' + value.date}
                </CardText>

                {
                    btnVal ?
                        <Button
                            onClick={() => handleCart(value.id)}
                        >
                            {btnVal}
                        </Button> : null
                }
            </CardBody>
        </Card>
    );
}

export default CustomCard;