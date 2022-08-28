import { Card, Sidebar } from 'flowbite-react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import {
  AdjustmentsVerticalIcon,
  BellIcon,
  BriefcaseIcon,
} from '@heroicons/react/20/solid/'

type RouterSidebarItemProps = {
  to: string
} & React.ComponentProps<typeof Sidebar.Item>

export function RouterSidebarItem(props: RouterSidebarItemProps) {
  const location = useLocation()

  return (
    <Link to={props.to}>
      <Sidebar.Item {...props} active={location.pathname === props.to} />
    </Link>
  )
}

export function Settings() {
  return (
    <Card>
      <h2 className="text-2xl font-bold">Ustawienia</h2>
      <div className="flex flex-col md:flex-row">
        <div>
          <Sidebar>
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <RouterSidebarItem
                  icon={AdjustmentsVerticalIcon}
                  to={'/schedule/settings'}
                >
                  Ogólne
                </RouterSidebarItem>
                <RouterSidebarItem
                  to={'/schedule/settings/notifications'}
                  icon={BellIcon}
                >
                  Powiadomienia
                </RouterSidebarItem>
                <RouterSidebarItem
                  to={'/schedule/settings/scrapers'}
                  icon={BriefcaseIcon}
                >
                  Scrapery
                </RouterSidebarItem>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </Card>
  )
}
