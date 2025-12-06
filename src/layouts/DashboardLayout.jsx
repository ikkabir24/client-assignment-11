import { Link, NavLink, Outlet } from 'react-router'
import { GrMoney } from "react-icons/gr";
import { MdAddTask, MdManageSearch } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import useRole from '../hooks/useRole';
import { MdOutlinePendingActions } from "react-icons/md";
import { MdHistoryEdu } from "react-icons/md";
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { FaUsersGear } from "react-icons/fa6";
import { SlDocs } from "react-icons/sl";

const DashboardLayout = () => {

  const [role, isRoleLoading] = useRole();

  isRoleLoading && <LoadingSpinner></LoadingSpinner>
  return (
    <div className="mx-auto drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            {/* Sidebar toggle icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
          </label>
          <div className="px-4">LoanLink Dashboard</div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">

            {/* List item */}
            <li>
              <Link to={'/'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                {/* Home icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>


            {/* user profile */}
            <li>
              <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" to={'/dashboard/user-profile'} data-tip="User Profile">
                <CgProfile className='my-1.5 inline-block size-4' />
                <span className="is-drawer-close:hidden">User Profile</span>
              </NavLink>
            </li>


            {/* my loans */}
            {
              role === 'borrower' &&
              <li>
                <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" to={'/dashboard/my-loans'} data-tip="My Loans">
                  <GrMoney className='my-1.5 inline-block size-4' />
                  <span className="is-drawer-close:hidden">My Loans</span>
                </NavLink>
              </li>
            }

            {/* add loans: manager route */}
            {
              role === 'manager' &&
              <li>
                <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" to={'/dashboard/add-loans'} data-tip="Add Loans">
                  <MdAddTask className='my-1.5 inline-block size-4' />
                  <span className="is-drawer-close:hidden">Add Loans</span>
                </NavLink>
              </li>
            }
            {/* manage loans */}
            {
              role === 'manager' &&
              <li>
                <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" to={'/dashboard/manage-loans'} data-tip="Manage Loans">
                  <MdManageSearch className='my-1.5 inline-block size-4' />
                  <span className="is-drawer-close:hidden">Manage Loans</span>
                </NavLink>
              </li>
            }
            {/* manage pending application */}
            {
              role === 'manager' &&
              <li>
                <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" to={'/dashboard/pending-loans'} data-tip="Pending Applications">
                  <MdOutlinePendingActions className='my-1.5 inline-block size-4' />
                  <span className="is-drawer-close:hidden">Pending Applications</span>
                </NavLink>
              </li>
            }
            {/* approved application */}
            {
              role === 'manager' &&
              <li>
                <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" to={'/dashboard/approved-loans'} data-tip="Approved Applications">
                  <MdHistoryEdu className='my-1.5 inline-block size-4' />
                  <span className="is-drawer-close:hidden">Approved Applications</span>
                </NavLink>
              </li>
            }

            {/* <--admin section--> */}

            {/* approved application */}
            {
              role === 'admin' &&
              <li>
                <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" to={'/dashboard/manage-users'} data-tip="Manage Users">
                  <FaUsersGear className='my-1.5 inline-block size-4' />
                  <span className="is-drawer-close:hidden">Manage Users</span>
                </NavLink>
              </li>
            }
            {
              role === 'admin' &&
              <li>
                <NavLink className="is-drawer-close:tooltip is-drawer-close:tooltip-right" to={'/dashboard/all-loan'} data-tip="All Loans">
                  <SlDocs className='my-1.5 inline-block size-4' />
                  <span className="is-drawer-close:hidden">All Loans</span>
                </NavLink>
              </li>
            }

          </ul>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout;
