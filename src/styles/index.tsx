export const styles: any = {
  homePage: {
    display: 'flex',
    height: '100vh',
    backgroundImage: 'url(/spacex_bg.gif)',
    backgroundPosition: 'center',
    backgroundRepeat: 'noRepeat',
    backgroundSize: 'cover',
    color: '#FFF',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullPage: {
    width: '100vw',
    minHeight: '100vh'
  },
  pgItem: {
    width: '100%',
    maxWidth: 'calc(1366px - 468px)',
    padding: '25px'
  },
  mainButton: {
    color: '#fff',
    borderColor: '#fff',
    marginTop: '20px',
    fontSize: '18px'
  },
  secondaryPageSideBar: {
    display: 'flex',
    backgroundImage: 'url(/spacex_bg.webp)',
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
    backgroundSize: 'cover',
  },
  launchesDiv: {
    maxHeight: 366,
    overflowY: 'scroll'
  },
  loadingContainer: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  favouriteBtnActive: {
    color: '#b1475a',
    borderColor: '#b1475a'
  },
  favouriteBtnDesactive: {
    color: '#bdbdbd',
    borderColor: '#bdbdbd'
  },
  backButton: {
    color: '#808080',
    borderColor: '#808080'
  },
  deleteButton: {
    color: 'red',
    borderColor: 'red'
  }
};