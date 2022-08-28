import { Navbar } from 'flowbite-react'
import {
  Link,
  Outlet,
  useLinkClickHandler,
  useLocation,
} from 'react-router-dom'

type NavAppLinkProps = {
  children: React.ReactNode
  to: string
}

function NavAppLink(props: NavAppLinkProps) {
  const location = useLocation()
  const clickHandler = useLinkClickHandler(props.to)

  return (
    <div style={{ cursor: 'pointer' }}>
      <Navbar.Link
        onClick={clickHandler}
        //active={location.pathname === props.to}
      >
        {props.children}
      </Navbar.Link>
    </div>
  )
}

export function ScheduleApp() {
  return (
    <div className="min-h-screen dark:bg-slate-800 bg-slate-100">
      <div className="shadow-lg dark:shadow-red">
        <Navbar fluid={true} rounded={false}>
          <Navbar.Brand>
            <span className="dark:text-white text-slate-900">🐶 Puppy</span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <NavAppLink to="/schedule">Kokpit</NavAppLink>
            <NavAppLink to="/schedule/classes">Plan zajęć</NavAppLink>
            <NavAppLink to="/schedule/tests">Kolokwia</NavAppLink>
            <NavAppLink to="/schedule/settings">Ustawienia</NavAppLink>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className="dark:text-white text-slate-900">
        <div className="mx-auto max-w-5xl py-8 min-h-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
