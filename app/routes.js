// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const HOME_PATH = '/';
const LOGIN_PATH = '/login';
const AUTH_PATHS = ['/add'];

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

/**
* Checks authentication status on route change
* @param  {object}   nextState The state we want to change into when we change routes
* @param  {function} replace Function provided by React Router to replace the location
*/
function checkAuth(store) {
  return (nextState, replace) => {
    const state = store.getState();
    const loggedIn = state.getIn(['auth', 'loggedIn']);

    // store.dispatch(clearError());
    const a = AUTH_PATHS.includes(nextState.location.pathname) ? 'Must be authorized.' : 'Must not be authorized.';
    const b = loggedIn ? 'Is logged in.' : 'Is not logged in. ';
    const c = nextState.location.state && nextState.location.pathname ? 'Next loc exists.' : 'No next loc.';

    console.log(a, b, c);

    if (AUTH_PATHS.includes(nextState.location.pathname)) {
      if (loggedIn) {
        return;
      }
      if (nextState.location.state && nextState.location.pathname) {
        replace(nextState.location.pathname);
      } else {
        replace(LOGIN_PATH);
      }
    } else {
      if (!loggedIn) {
        return;
      }
      if (nextState.location.state && nextState.location.pathname) {
        replace(nextState.location.pathname);
      } else {
        replace(HOME_PATH);
      }
    }
  };
}


export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: HOME_PATH,
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/PlayerTopList/reducer'),
          System.import('containers/PlayerTopList/sagas'),
          System.import('containers/BrandTopList/reducer'),
          System.import('containers/BrandTopList/sagas'),
          System.import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([playerReducer, playerSagas, brandReducer, brandSagas, component]) => {
          injectReducer('playerTopList', playerReducer.default);
          injectSagas(playerSagas.default);
          injectReducer('brandTopList', brandReducer.default);
          injectSagas(brandSagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/leaderboard',
      name: 'leaderboardPage',
      getComponent(location, cb) {
        const importModules = Promise.all([
          System.import('containers/PlayerTopList/reducer'),
          System.import('containers/PlayerTopList/sagas'),
          System.import('containers/LeaderboardPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([playerReducer, playerSagas, component]) => {
          injectReducer('playerTopList', playerReducer.default);
          injectSagas(playerSagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/about',
      name: 'aboutPage',
      getComponent(location, cb) {
        System.import('containers/AboutPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/brands',
      name: 'brandsPage',
      getComponent(location, cb) {
        const importModules = Promise.all([
          System.import('containers/BrandTopList/reducer'),
          System.import('containers/BrandTopList/sagas'),
          System.import('containers/BrandsPage'),
        ]);
        const renderRoute = loadModule(cb);
        importModules.then(([brandReducer, brandSagas, component]) => {
          injectReducer('brandTopList', brandReducer.default);
          injectSagas(brandSagas.default);
          renderRoute(component);
        })
          .catch(errorLoading);
      },
    }, {
      onEnter: checkAuth(store),
      path: LOGIN_PATH,
      name: 'loginPage',
      getComponent(location, cb) {
        const importModules = Promise.all([
          System.import('containers/LoginPage'),
        ]);
        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        })
          .catch(errorLoading);
      },
    }, {
      onEnter: checkAuth(store),
      path: '/signup',
      name: 'signupPage',
      getComponent(location, cb) {
        System.import('containers/SignupPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      onEnter: checkAuth(store),
      path: '/add',
      name: 'addPage',
      getComponent(location, cb) {
        System.import('containers/AddPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
