import React from 'react';

// Material-UI
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import { Favorite, Delete } from '@mui/icons-material';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

// css
import { styles } from '../styles';

// redux
import { useAppDispatch } from '../app/hooks';
import { addFavourite, removeFavourite } from '../features/launches/favourites-slice';

interface props {
  launch: {
    flight_number: number,
    mission_name: string,
    launch_date_utc: string,
    launch_success: boolean,
    links: {
      // not all missions have this property and there is no consistence from the api on the data type.
      mission_patch_small: any | null 
    }
  },
  favourite: boolean,
  showStatus: boolean,
  index: number
}

const Launch:React.FC<props> = ({ launch, favourite, index, showStatus }) => {
  const dispatch = useAppDispatch();

  const formatDate = (date: String) => {
    let dateString = date.split('T')[0];
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  const handleClick = (launch: {}, isFavorite: boolean) => {
    if(isFavorite) {
      dispatch(removeFavourite(launch));
    }

    else {
      dispatch(addFavourite(launch))
    }
  }
  
  return (
    <>
      <ListItem alignItems="flex-start" key={launch.flight_number + index }>
        <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={String(launch.links.mission_patch_small)} />
        </ListItemAvatar>
        <ListItemText
          primary={ `Date: ${formatDate(launch.launch_date_utc)} | Mission Name: ${launch.mission_name} | Flight Number: ${String(launch.flight_number)}` }
          secondary={
            <>
              <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
              >
                  <span style={{color: launch.launch_success ? 'green' : 'red'}}>
                      { launch.launch_success ? 'Mission Succeeded' : 'Mission Failed' }
                  </span>
              </Typography>
            </>
          }
        />
        <ListItemAvatar>
          {!showStatus &&
            <Button 
              variant="outlined" 
              style={favourite ? styles.favouriteBtnActive : styles.favouriteBtnDesactive}
              onClick={() => handleClick(launch, favourite)}
            >
              <Favorite />
            </Button>
          }

          {showStatus &&
            <Button 
              variant="outlined" 
              style={styles.deleteButton}
              onClick={() => handleClick(launch, favourite)}
            >
              <Delete />
            </Button>
          }
        </ListItemAvatar>
      </ListItem>
      <Divider />
    </>
  )
}

export default Launch;