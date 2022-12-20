import { VscCalendar, VscDashboard, VscMenu, VscPlug } from 'react-icons/vsc'
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

import 'src/ui/navbar.sass'
import { useBoolean } from 'usehooks-ts'

export function ScheduleApp() {
  const presentModalMenu = useBoolean(false)

  return (
    <div className="bg-slate-800 min-h-screen z-40">
      <div className="sticky top-0 z-40">
        <div className="navbar">
          <span className="navbar-title font-serif">
            <span className="italic">Puppy</span>
          </span>
          <div className="md:flex hidden">
            <Link to="/schedule">
              <button className="navbar-link">
                <div className="button-content">
                  <VscDashboard />
                  Kokpit
                </div>
              </button>
            </Link>
            <Link to="/schedule/classes">
              <button className="navbar-link">
                <div className="button-content">
                  <VscCalendar />
                  Plan zajęć
                </div>
              </button>
            </Link>
            <Link to="/schedule/integrations">
              <button className="navbar-link">
                <div className="button-content">
                  <VscPlug />
                  Integracje
                </div>
              </button>
            </Link>
            <button className="navbar-link">Kolokwia</button>
            <button className="navbar-link">Ustawienia</button>
          </div>
          <div className="navbar-spacer" />
          <div className="md:hidden flex items-center">
            <button onClick={presentModalMenu.toggle}>
              <VscMenu />
            </button>
          </div>
        </div>
        {presentModalMenu.value && (
          <div
            onClick={presentModalMenu.setFalse}
            className="absolute w-full h-screen bg-black bg-opacity-90 px-2 py-4 z-40"
          >
            <div className="navbar-menu flex flex-col text-white gap-4 text-lg">
              <Link to="/schedule">
                <button className="navbar-link">Kokpit</button>
              </Link>
              <Link to="/schedule/classes">
                <button className="navbar-link">Plan zajęć</button>
              </Link>
              <Link to="/schedule/integrations">
                <button className="navbar-link">Integracje</button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="md:w-[800px] md:mx-auto mx-4 py-8">
        <Outlet />
      </div>
    </div>
  )
}
