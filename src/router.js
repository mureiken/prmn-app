import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import SidebarLayout from 'src/layouts/SidebarLayout';
import WideLayout from 'src/layouts/WideLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import { useAuth } from './contexts/authContext'

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const ProtectedRoute = ({ children }) => {

  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Dashboards
const Displacement = Loader(lazy(() => import('src/content/dashboards/DisplacementAlerts')));
const PartnerDisplacementData = Loader(lazy(() => import('src/content/dashboards/PartnerDisplacementData/index')));
const Protection = Loader(lazy(() => import('src/content/dashboards/Protection')));
const PartnerProtectionData = Loader(lazy(() => import('src/content/dashboards/PartnerProtectionData/index')))

// Pages
const About = Loader(lazy(() => import('src/content/about.js')));
const Contact = Loader(lazy(() => import('src/content/contact.js')));
const SignIn = Loader(lazy(() => import('src/content/applications/Users/SignIn')));

//Publications
const Publications = Loader(lazy(() => import('src/content/publications')));

// Pages with Iframes
const YearlyDisplacement = Loader(lazy(() => import('src/content/dashboards/Externals/YearlyDisplacemement.js')));
const PowerBIProtectionDashboard = Loader(lazy(() => import('src/content/dashboards/Externals/PowerBIProtectionDashboard.js')));


// Applications

// const Messenger = Loader(
//   lazy(() => import('src/content/applications/Messenger'))
// );

const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);


// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const routes = [
  {
    path: '',
    element: <WideLayout />,
    children: [
      {
        path: '/',
        element: <Displacement />
      },
      {
        path: 'home',
        element: <Navigate to="/" replace />
      },
      {
        path: '/login',
        element: <SignIn />
      },
      {
        path: '/dashboard/displacement-report',
        element: <Displacement />
      },
      {
        path: '/dashboard/protection-report',
        element: <Protection />
      },
      {
        path: 'publications',
        element: <Publications />
      },
      {
        path: 'yearly-displacement',
        element: <YearlyDisplacement />
      },
      {
        path: 'bi-protection-dashboard',
        element: <PowerBIProtectionDashboard />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'private',
    element: <SidebarLayout />,
    children: [
      {
        path: 'partner-displacement-data',
        element:  <PartnerDisplacementData />
      },  
      {
        path: 'partner-protection-data',
        element:  <PartnerProtectionData />
      },      
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element:  <ProtectedRoute>
                        <UserSettings />
                      </ProtectedRoute>
          },
        ]
      }
    ]
  },
];

export default routes;
