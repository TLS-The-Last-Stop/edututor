import Swal from 'sweetalert2';

export const showALert = ({
                            icon = 'success',
                            title,
                            text,
                            showCancelButton = false,
                            confirmButtonText = '확인',
                            cancelButtonText = '취소'
                          }) => {
  return Swal.fire({
    icon,
    title,
    text,
    showCancelButton,
    confirmButtonText,
    cancelButtonText
  });
};