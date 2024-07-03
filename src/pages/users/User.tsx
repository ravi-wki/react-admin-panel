import React from 'react';
import { Pencil, CirclePlus, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { TablePagination } from '../../components/common/TablePagination';
import { users } from './dummydata';
import { useAtom } from 'jotai';
import { userModalAtom, currentPageAtom, userIdAtom } from './atoms';
import { User } from './types';
import { UserDialog } from './UserDialog';

export function Users() {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [userModal, setUserModal] = useAtom<boolean>(userModalAtom);
  const [, setUserId] = useAtom(userIdAtom);

  return (
    <React.Fragment>
      <div className="container mx-auto mt-4">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Users</h2>
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-gray-800"
            onClick={() => setUserModal(true)}
          >
            <CirclePlus className="inline mr-2" /> Add User
          </button>
        </div>
        <Table className="min-w-full divide-y divide-gray-200 border border-gray-200 shadow-sm">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                S.No.
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </TableHead>
              <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {users.map((user: User, index: number) => (
              <TableRow key={user.id} className="hover:bg-gray-50">
                <TableCell className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {index + 1}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {user.name}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {user.email}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {user.phone}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {user.role}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-right text-gray-700">
                  <Pencil
                    onClick={() => {
                      setUserId(user.id);
                      setUserModal(true);
                    }}
                    className="inline cursor-pointer mr-2 text-indigo-500"
                  />
                  <Trash2 className="inline cursor-pointer text-red-500" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end mt-4">
          <TablePagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalRecords={users.length}
            TABLE_DEFAULT_LIMIT={2}
          />
        </div>
      </div>
      {userModal && <UserDialog />}
    </React.Fragment>
  );
}
