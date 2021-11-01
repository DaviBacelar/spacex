import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

// components
import Loading from '../components/Loading.comp';
import LaunchesList from '../components/LaunchesList.comp';

// sytles
import { styles } from '../styles/index';

// Material UI
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker, { DateTimePickerProps } from '@mui/lab/DateTimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Favorite } from '@mui/icons-material';

// redux
import { useFetchLaunchesQuery } from '../features/launches/launches-api-slice';

interface props extends RouteComponentProps {};

const LaunchesVIew: React.FC<props> = ({ history}) => {
  // get launches from redux
  const { data = [], isFetching } = useFetchLaunchesQuery();

  // starts the page loading
  const [date, setDate] = useState<DateTimePickerProps | null>(null);
  const [dateParam, setDateParam] = useState<'' | 'before' | 'after'>(''); // values needed to filter.
  const [missionStatus, setMissionStatus] = useState<'all' | 'succeeded' | 'failed'>('all'); // values needed to filter.
  const [showLaunchesTypes, setShowLaunchesTypes] = useState<'all' | 'past' | 'upcoming'>('all'); // values needed to filter. 

  const handleDateChange = (newValue: any) => {
    setDate(newValue);
  };

  const handleDateParamChange = (e: any) => {
    if(e.target.value === '' || e.target.value === 'before' || e.target.value === 'after') {
      setDateParam(e.target.value);
    } else {
      console.log("wrong value");
    }      
  }

  const handleMissionStatusChange = (e: any) => {
    if(e.target.value === 'all' || e.target.value === 'succeeded' || e.target.value === 'failed') {
      setMissionStatus(e.target.value);
    } else {
      console.log("wrong value");
    }
  }

  const handleShowLaunchesTypesChange = (e: any) => {
    if(e.target.value === 'all' || e.target.value === 'past' || e.target.value === 'upcoming') {
      setShowLaunchesTypes(e.target.value);
    } else {
      console.log("wrong value");
    }
  }

  // Since we already obtain all the docs from the api, there is no reason for a new call.
  // A simple filter on the client side will be more cost effective.
  const applyFilters = (param: any[], upcomming: boolean) => {
    return param.filter(el => {
        let value = el.upcoming === upcomming;

        // If 'dateParam' is not '' means that the user selected or 'after' or 'before;
        if (value && date && dateParam !== '') {
          if (dateParam === 'after') {
            value = new Date(String(el.launch_date_utc)).getTime() > new Date(String(date)).getTime(); 
          }

          else if (dateParam === 'before') {
            value = new Date(String(el.launch_date_utc)).getTime() < new Date(String(date)).getTime(); 
          }
        }

        if (value && missionStatus !== 'all') {
          let status = el.launch_success ? 'succeeded' : 'failed';
          value = status === missionStatus;
        }

        // when returned true the filter will push the 'el' to a new array. 
        // when the loop is finisher, this new array will be returned with all the selected filters applied.
        return value;
    });
  }

  return (
    <>
      <Grid style={styles.fullPage} container>
        <Grid item xs={12} sm={4} style={styles.secondaryPageSideBar}>
        </Grid>
        <Grid item xs={12} sm={8} style={styles.pgItem}>
          <div style={{width: '100%', height: '45px', 'position': 'relative'}}>
            <Button 
              variant="outlined" 
              style={{...styles.favouriteBtnActive, position: 'absolute', right: '0'}}
              onClick={() => history.push('/favourites')}
            >
              See My Favourites <Favorite />
            </Button>
          </div>

          <Typography gutterBottom variant="h2" component="div">
            The SpaceX Launches
          </Typography>

          <Grid>
            <LocalizationProvider dateAdapter={AdapterDateFns} spacing={1}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={3}>
                  <DateTimePicker
                    label="Date & Time picker"
                    value={date}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <TextField   
                        fullWidth {...params}
                      />)
                    }
                  />
                </Grid>

                {date &&
                  <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>
                      <InputLabel id="date-param-label">After/Before</InputLabel>
                      <Select
                        labelId="date-param-select-label"
                        id="date-param-select"
                        value={dateParam}
                        label="After/Before"
                        onChange={handleDateParamChange} 
                      >
                        <MenuItem value={''}>--</MenuItem>
                        <MenuItem value={'before'}>Before the choosed date</MenuItem>
                        <MenuItem value={'after'}>After the coosed date</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                }

                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel id="mission-status-label">Mission Status</InputLabel>
                    <Select
                      labelId="dmission-status-label"
                      id="mission-status-select"
                      value={missionStatus}
                      label="Mission Status"
                      onChange={handleMissionStatusChange}
                    >
                      <MenuItem value={'all'}>All</MenuItem>
                      <MenuItem value={'succeeded'}>Succeeded</MenuItem>
                      <MenuItem value={'failed'}>Failed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>
                        <InputLabel id="show-launches-types-label">Show</InputLabel>
                        <Select
                            labelId="show-launches-types-label"
                            id="show-launches-types-select"
                            value={showLaunchesTypes}
                            label="Show"
                            onChange={handleShowLaunchesTypesChange}
                        >
                            <MenuItem value={'all'}>All</MenuItem>
                            <MenuItem value={'past'}>Only Past Launches </MenuItem>
                            <MenuItem value={'upcoming'}>Only Upcoming Launches</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
              </Grid>
            </LocalizationProvider>

            {/* the sames as showLaunchesTypes === 'past' || showLaunchesTypes === 'all' */}
            {showLaunchesTypes !== 'upcoming'  &&
              <div style={{marginTop: '25px'}}>
                <Typography gutterBottom variant="h4">
                    Past Launches
                </Typography>
                <hr />
                {isFetching &&
                  <Loading />
                }
                {!isFetching &&
                  <LaunchesList launches={applyFilters(data, false)} showStatus={false} />
                }
              </div>
            }

            {/* the sames as showLaunchesTypes === 'upcoming' || showLaunchesTypes === 'all' */}
            {showLaunchesTypes !== 'past' &&
              <div style={{marginTop: '25px'}}>
                  <Typography gutterBottom variant="h4">
                      Upcoming Launches
                  </Typography>
                  <hr />                    
                  {isFetching &&
                    <Loading />
                  }
                  {!isFetching &&
                    <LaunchesList launches={applyFilters(data, true)} showStatus={false} />
                  }
              </div>
            }
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default LaunchesVIew;