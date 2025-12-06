import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import { createBrowserRouter } from 'react-router'
import MainLayout from '../layouts/MainLayout'
import AllLoans from '../pages/AllLoans/AllLoans'
import AboutUs from '../pages/AboutUs/AboutUs'
import ContactUs from '../pages/ContactUs/ContactUs'
import MyLoans from '../pages/Dashboard/MyLoans/MyLoans'
import AddLoans from '../pages/Dashboard/AddLoans/AddLoans'
import LoanDetails from '../pages/AllLoans/LoanDetails'
import ApplyForLoan from '../pages/ApplyForLoan/ApplyForLoan'
import UserProfile from '../pages/Dashboard/UserProfile/UserProfile'
import ManageLoans from '../pages/Dashboard/ManageLoans/ManageLoans'
import UpdateLoan from '../pages/Dashboard/ManageLoans/UpdateLoan'
import PendingApplications from '../pages/Dashboard/PendingApplications/PendingApplications'
import ApprovedLoans from '../pages/Dashboard/ApprovedLoans/ApprovedLoans'
import ApplicationDetails from '../pages/Dashboard/ApplicationDetails/ApplicationDetails'
import ManageUsers from '../pages/Dashboard/ManageUsers/ManageUsers'
import AllLoansForAdmin from '../pages/Dashboard/AllLoansForAdmin/AllLoansForAdmin'
import AllLoanApplicationAdmin from '../pages/Dashboard/AllLoanApplicationAdmin/AllLoanApplicationAdmin'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/all-loans',
        Component: AllLoans
      },
      {
        path: '/loan/:id',
        element: <PrivateRoute>
          <LoanDetails></LoanDetails>
        </PrivateRoute>
      },
      {
        path: '/apply/:id',
        element: <PrivateRoute>
          <ApplyForLoan></ApplyForLoan>
        </PrivateRoute>
      },
      {
        path: '/about-us',
        Component: AboutUs
      },
      {
        path: '/contact-us',
        Component: ContactUs
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
    ,
    children: [
      {
        path: '/dashboard/user-profile',
        Component: UserProfile
      },
      {
        path: '/dashboard/my-loans',
        Component: MyLoans
      },
      {
        path: '/dashboard/add-loans',
        Component: AddLoans
      },
      {
        path: '/dashboard/manage-loans',
        Component: ManageLoans
      },
      {
        path: '/dashboard/update-loan/:id',
        Component: UpdateLoan
      },
      {
        path: '/dashboard/pending-loans',
        Component: PendingApplications
      },
      {
        path: '/dashboard/application/:id',
        Component: ApplicationDetails
      },
      {
        path: '/dashboard/approved-loans',
        Component: ApprovedLoans
      },
      // admin routes
      {
        path: '/dashboard/manage-users',
        Component: ManageUsers
      },
      {
        path: '/dashboard/all-loan',
        Component: AllLoansForAdmin
      },
      {
        path: '/dashboard/loan-applications',
        Component: AllLoanApplicationAdmin
      },
      
    ],
  },
])
