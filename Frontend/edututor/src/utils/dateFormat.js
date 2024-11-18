import { format } from 'date-fns';

const formatData = (dateString) => {
  if (!dateString) return '';
  return format(new Date(dateString), 'yyyy-MM-dd HH:mm:ss');
};

export default formatData;