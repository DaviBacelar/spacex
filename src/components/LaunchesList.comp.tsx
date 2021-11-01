import React from 'react';
import { styles } from '../styles'

// Redux
import { useAppSelector } from '../app/hooks';

// Components
import Launch from './Launch.comp';

interface Props {
  // the component expects one props that is array of objects with the following properties
  launches: {
    flight_number: number,
    mission_name: string,
    launch_date_utc: string,
    launch_success: boolean,
    links: {
      // not all missions have this property and there is no consistence from the api on the data type.
      mission_patch_small?: any 
    }
  }[] | [],
  showStatus: boolean
}

const LaunchesList: React.FC<Props> = ({ launches, showStatus }) => {
  // get launches from redux
  const favourites = useAppSelector((state) => state.favouritesLaunches);

  return (
    <>
      {launches.length > 0 &&
        <div style={styles.launchesDiv} data-testid="launches-div">
          {launches.map((launch: any, index) => {
              return (
                <Launch
                  launch={launch}
                  index={index} 
                  showStatus={showStatus}
                  favourite={favourites.includes(launch)} 
                />
              )
            })
          }
        </div>                   
      }

      {launches.length === 0 &&
        <div>
          No launch found.
        </div>
      }
    </>
  );
}

export default LaunchesList;