"use client";

import { Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import UserDetailsModal from "@/components/user-details-modal";
// import {
//   useGetAllUsersQuery,
//   useGetUserByIdQuery,
// } from "@/redux/feature/userAPI";
import DetailRow from "@/components/DetailRow";
import { useGetUserListQuery } from "@/redux/feature/userlist/userAPI";

interface User {
  id: number;
  email: string;
  full_name: string;
  profile_pic: string | null;
  mobile_no: string | null;
  location: string | null;
  date_joined: string;
}

export default function DashboardContent() {
  return (
    <main className='bg-background2 w-full p-4 md:p-6'>
      <section>
        <TransactionTable />
      </section>
    </main>
  );
}

function TransactionTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const { data: users, isLoading } = useGetUserListQuery({});

  console.log("users", users?.results);

  const transactions = [
    {
      id: 447,
      name: "Marvin McKinney",
      subscription: "Basic",
      date: "1 Feb, 2020",
      amount: "$45",
    },
    {
      id: 426,
      name: "Jane Cooper",
      subscription: "Premium",
      date: "21 Sep, 2020",
      amount: "$75",
    },
    {
      id: 922,
      name: "Esther Howard",
      subscription: "Basic",
      date: "24 May, 2020",
      amount: "$45",
    },
    {
      id: 816,
      name: "Darlene Robertson",
      subscription: "Premium",
      date: "24 May, 2020",
      amount: "$75",
    },
    {
      id: 185,
      name: "Cameron Williamson",
      subscription: "Basic",
      date: "17 Oct, 2020",
      amount: "$45",
    },
    {
      id: 738,
      name: "Ronald Richards",
      subscription: "Basic",
      date: "1 Feb, 2020",
      amount: "$45",
    },
    {
      id: 600,
      name: "Jerome Bell",
      subscription: "Premium",
      date: "21 Sep, 2020",
      amount: "$75",
    },
    {
      id: 583,
      name: "Dianne Russell",
      subscription: "Basic",
      date: "8 Sep, 2020",
      amount: "$45",
    },
    {
      id: 177,
      name: "Bessie Cooper",
      subscription: "Basic",
      date: "21 Sep, 2020",
      amount: "$45",
    },
    {
      id: 826,
      name: "Robert Fox",
      subscription: "Premium",
      date: "22 Oct, 2020",
      amount: "$75",
    },
    {
      id: 540,
      name: "Kathryn Murphy",
      subscription: "Basic",
      date: "17 Oct, 2020",
      amount: "$45",
    },
    {
      id: 274,
      name: "Leslie Alexander",
      subscription: "Premium",
      date: "17 Oct, 2020",
      amount: "$75",
    },
  ];

  // Calculate pagination
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const openUserModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  console.log(selectedUser);

  return (
    <>
      <div className='overflow-hidden bg-[#FFF] rounded-md'>
        <h2 className='text-[32px] font-medium text-primary py-6 px-3'>
          User List
        </h2>
        <div className='overflow-x-auto'>
          <Table>
            <TableHeader className='bg-[#0249E1] hover:!bg-[#5ce1e6d5] text-[#FFF] py-8'>
              <TableRow className='py-8'>
                <TableHead className='text-[#FFF] text-lg text-center'>
                  #Tr.ID
                </TableHead>
                <TableHead className='text-[#FFF] text-lg text-center'>
                  User Name
                </TableHead>
                <TableHead className='text-[#FFF] text-lg text-center'>
                  Subscription
                </TableHead>
                <TableHead className='text-[#FFF] text-lg text-center'>
                  Join Date
                </TableHead>
                <TableHead className='text-[#FFF] text-lg text-center'>
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users?.results?.map((user: User) => (
                <TableRow key={user?.id}>
                  <TableCell className='font-medium text-lg text-[#141414] text-center'>
                    {user?.id}
                  </TableCell>
                  <TableCell className='text-lg text-[#141414] text-center'>
                    {user?.full_name}
                  </TableCell>
                  <TableCell className='text-lg text-[#141414] text-center'>
                    {user?.email}
                  </TableCell>
                  <TableCell className='text-lg text-[#141414] text-center'>
                    {user?.date_joined.split("T")[0]}
                  </TableCell>
                  <TableCell className='text-lg text-[#141414] text-center'>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-8 w-8 p-0'
                      onClick={() => openUserModal(user)}
                    >
                      <Info className='h-6 w-6' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* <div className='max-w-sm mx-auto flex items-center justify-between border-t border-gray-200 rounded-lg bg-[#0249E1] px-4 py-3 mp-6'>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              className='h-8 w-8 p-0'
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <span className='sr-only'>Previous</span>
              <svg
                className='h-4 w-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </Button>
            <span className='text-sm text-[#E6E6E6]'>Previous</span>
          </div>

          <div className='flex items-center gap-1'>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size='sm'
                  className={`h-8 w-8 p-0 ${
                    page === currentPage ? "bg-teal-800 text-white" : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              )
            )}
          </div>

          <div className='flex items-center gap-2'>
            <span className='text-sm text-[#E6E6E6]'>Next</span>
            <Button
              variant='outline'
              size='sm'
              className='h-8 w-8 p-0'
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <span className='sr-only'>Next</span>
              <svg
                className='h-4 w-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </Button>
          </div>
        </div> */}
      </div>

      {isModalOpen && selectedUser && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-[#03030344]'>
          <div className='relative w-full max-w-md rounded-md bg-[#f5f5f5] px-6 py-6 shadow-lg'>
            <button
              onClick={() => setIsModalOpen(false)}
              className='absolute right-4 top-4 text-gray-500 hover:text-gray-700'
            >
              <X className='h-5 w-5' />
              <span className='sr-only'>Close</span>
            </button>

            <h2 className='mb-6 py-2.5 text-center text-[30px] font-semibold text-[#000000]'>
              User Details
            </h2>

            <div className='space-y-6'>
              <DetailRow label='User ID:' value={selectedUser?.id} />
              <DetailRow label='Email' value={selectedUser?.email} />
              <DetailRow label='User Name' value={selectedUser?.full_name} />
              <DetailRow label='Transaction Amount' value={"amount"} />
              <DetailRow
                label='Subscription Status'
                value={selectedUser?.subscription_status}
              />
              <DetailRow
                label='Package Name'
                value={selectedUser?.package_name}
              />
            </div>

            <Button
              onClick={() => setIsModalOpen(false)}
              className='mt-6 w-full bg-[#3a49d3] hover:bg-[#4456fd]'
            >
              Okay
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
