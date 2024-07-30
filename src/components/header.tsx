'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation'


export default function Header() {
    const pathname = usePathname()
  return (
    <div className="flex justify-evenly items-center bg-[#f03e3e] p-2">

        <Link href="/admin/user" className={`menuitm text-white hover:text-slate-300 ${pathname === '/admin/user' ? 'active' : ''}`}>
            ग्राहक
        </Link>
        <Link href="/admin/entry" className={`menuitm text-white hover:text-slate-300 ${pathname === '/admin/entry' ? 'active' : ''}`}>
        एंट्री
        </Link>
    {/* <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/admin/user" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            ग्राहक
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/admin/entry" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            एंट्री
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu> */}
    </div>
  );
}
