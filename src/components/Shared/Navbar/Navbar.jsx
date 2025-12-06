import Container from '../Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import logo from '../../../assets/images/logo-flat.png'
const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('theme'))

  useEffect(() => {
    const html = document.querySelector('html');
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme)
  }, [theme])

  const handleTheme = (checked) => {
    setTheme(checked ? 'dark' : 'light')
  }

  return (
    <div className='w-full shadow-sm'>
      <div className='py-4 '>
        <Container>
          <div className='flex flex-row  items-center justify-between gap-3 md:gap-0'>

            {/* Logo */}
            <Link to='/'>
              <img src={logo} alt='logo' width='100' height='100' />
            </Link>

            {/* Dropdown Menu */}
            <div className='relative'>
              <div className='flex flex-row items-center gap-3'>
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className='p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                  <AiOutlineMenu />
                  <div>
                    {/* Avatar */}
                    <img
                      className='rounded-full'
                      referrerPolicy='no-referrer'
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt='profile'
                      height='30'
                      width='30'
                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw]  hover:text-black bg-gray-300 md:w-[10vw] overflow-hidden right-0 top-12 text-sm z-10'>
                  <div className='flex flex-col cursor-pointer'>
                    <Link
                      to='/'
                      className='block px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Home
                    </Link>

                    <Link
                      to='/all-loans'
                      className='block px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      All-Loans
                    </Link>

                    <Link
                      to='/about-us'
                      className='block px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      About Us
                    </Link>

                    <Link
                      to='/contact-us'
                      className='block px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Contact Us
                    </Link>


                    {
                      user
                        ? <>
                          <Link
                            to='/dashboard/user-profile'
                            className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                          >
                            Dashboard
                          </Link>
                          <div
                            onClick={logOut}
                            className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                          >
                            Logout
                          </div>
                        </>
                        : <>
                          <Link
                            to='/login'
                            className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                          >
                            Login
                          </Link>
                          <Link
                            to='/signup'
                            className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                          >
                            Sign Up
                          </Link>

                        </>
                    }
                    <div className='block px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      <input
                        onChange={(e) => handleTheme(e.target.checked)}
                        type="checkbox"
                        defaultChecked={localStorage.getItem('theme') === "dark"}
                        className="toggle" />
                      <p>Dark Mode</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
