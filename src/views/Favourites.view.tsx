import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

// components
import LaunchesList from '../components/LaunchesList.comp';

// sytles
import { styles } from '../styles/index';

// Material UI
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ArrowLeft } from '@mui/icons-material';

// redux
import { useAppSelector } from '../app/hooks';

interface props extends RouteComponentProps {};

const FavouriteList: React.FC<props> = ({ history }) => {
  // get launches from redux
  const launches = useAppSelector((state) => state.favouritesLaunches);

  return (
    <>
      <Grid style={styles.fullPage} container>
        <Grid item xs={12} sm={4} style={styles.secondaryPageSideBar}>
        </Grid>
        <Grid item xs={12} sm={8} style={styles.pgItem}>
          <div style={{width: '100%', height: '60px', 'position': 'relative'}}>
            <Button 
              variant="outlined"
              onClick={() => history.push('/launches')}
              style={styles.backButton}
            >
              <ArrowLeft /> Back
            </Button>
          </div>

          <Typography gutterBottom variant="h2" component="div">
            My Favourites Launches
          </Typography>

          <Grid>  
            <div style={{marginTop: '25px'}}>
              <hr />
              <LaunchesList launches={launches} showStatus={true}  />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default FavouriteList;