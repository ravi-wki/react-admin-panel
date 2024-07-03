import * as React from 'react';
import { User } from 'lucide-react';
import { useAtom } from 'jotai';
import { sidebarAtom } from '../../jotai-atoms/atoms';

const DOCUMENT_CLICK_EVENT = 'mousedown';

export function Header() {
  const companyName = 'React Admin Panel';
  const [, setSidebarOpen] = useAtom(sidebarAtom);
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const profileButtonRef = React.createRef<HTMLButtonElement>();
  const profileMenuRef = React.createRef<HTMLDivElement>();

  const onToggleSidebar = () => setSidebarOpen((open) => !open);

  const handleDocumentClick = (event: MouseEvent) => {
    if (
      profileMenuOpen &&
      profileButtonRef.current &&
      !profileButtonRef.current.contains(event.target as Node) &&
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target as Node)
    ) {
      setProfileMenuOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener(DOCUMENT_CLICK_EVENT, handleDocumentClick);
    return () =>
      document.removeEventListener(DOCUMENT_CLICK_EVENT, handleDocumentClick);
  }, [profileMenuOpen]);

  return (
    <div className="bg-gray-800 text-white shadow-md py-4 px-6 flex justify-between items-center">
      <button onClick={onToggleSidebar} className="text-xl focus:outline-none">
        ☰
      </button>
      <div className="text-xl">{companyName}</div>
      <div className="relative">
        <button
          ref={profileButtonRef}
          onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <User />
          <span className="hidden md:inline">Profile</span>
        </button>
        {profileMenuOpen && (
          <div
            ref={profileMenuRef}
            className="absolute bg-blue-100 right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg profile-menu z-50"
          >
            <ul className="py-1">
              <li className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white cursor-pointer">
                <a href="#/profile">My Profile</a>
              </li>
              <li className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white cursor-pointer">
                <a href="#/login">Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
