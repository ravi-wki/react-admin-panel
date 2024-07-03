// src/components/sidebar/Sidebar.tsx
import * as React from 'react';
import { useAtom } from 'jotai';
import { sidebarAtom } from '../../jotai-atoms/atoms';

export const Sidebar: React.FC = () => {
  const [sidebarOpen] = useAtom(sidebarAtom);

  return (
    <div
      className={`w-64 h-screen bg-gray-800 text-white ${sidebarOpen ? 'block' : 'hidden'}`}
    >
      <nav className="p-4">
        <ul>
          <li className="mb-2">
            <a href="#/dashboard">Dashboard</a>
          </li>
          <li className="mb-2">
            <a href="#/users">Users</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
