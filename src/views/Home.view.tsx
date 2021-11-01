import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

// style
import { styles } from '../styles'

// material-ui
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface props extends RouteComponentProps {};

const HomePage: React.FC<props> = ({ history }) => (
    <div style={styles.homePage}>
        <div style={styles.homePageText}>
            <Typography gutterBottom variant="h2" component="div">
                Welcome to my SpaceX sample app
            </Typography>
            <Typography variant="subtitle1">
                This app displays the past and the upcoming launches from SpaceX.
            </Typography>
            <Typography variant="subtitle1">
                All images and data comes from SpaceX and obey the guidelines of <strong>fair use</strong>.
            </Typography>
            <Button 
                variant="outlined" 
                style={styles.mainButton} 
                size="large"
                onClick={() => history.push('/launches')}
            >Get start</Button>
        </div>
    </div>
)

export default HomePage
