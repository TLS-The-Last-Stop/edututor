import AdminUserList from '../../components/admin/AdminUserList.jsx';
import { useEffect, useState } from 'react';
import { getAllUser } from '../../api/user/user.js';

const AdminUser = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const fetchingAllUser = async () => {
    try {
      const result = await getAllUser();
      if (result.status === 200) {
        const { teachers = [], students = [] } = result.data;
        setTeachers(teachers);
        setStudents(students);
      }
    } catch (error) {
      console.error('Failed to fetch all user:', error);
    }
  };

  useEffect(() => {
    fetchingAllUser();
  }, []);

  return (
    <>
      <AdminUserList
        teachers={teachers}
        students={students}
        fetchingAllUser={fetchingAllUser} />
    </>
  );
};

export default AdminUser;