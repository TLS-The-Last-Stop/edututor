import AdminUserList from '../../components/admin/AdminUserList.jsx';
import { useEffect, useState } from 'react';
import { getAllUser } from '../../api/user/user.js';

const dummyUsers = [
  {
    id       : 1,
    name     : '김철수',
    email    : 'kim@example.com',
    createdAt: '2024-01-15',
    status   : 'active'
  },
  {
    id       : 2,
    name     : '이영희',
    email    : 'lee@example.com',
    createdAt: '2024-02-01',
    status   : 'inactive'
  },
  {
    id       : 3,
    name     : '박지민',
    email    : 'park@example.com',
    createdAt: '2024-02-15',
    status   : 'active'
  },
  {
    id       : 4,
    name     : '정민수',
    email    : 'jung@example.com',
    createdAt: '2024-03-01',
    status   : 'active'
  },
  {
    id       : 5,
    name     : '홍길동',
    email    : 'hong@example.com',
    createdAt: '2024-03-10',
    status   : 'inactive'
  }
];


const AdminUser = () => {
  const [users, setUsers] = useState(dummyUsers);

  const fetchingAllUser = async () => {
    const result = await getAllUser();
    console.log('가져온다', result);
  };

  useEffect(() => {
    fetchingAllUser();
  }, []);

  return (
    <>
      <AdminUserList users={users} />
    </>
  );
};

export default AdminUser;