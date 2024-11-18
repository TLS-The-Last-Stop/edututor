const SharedTestItem = ({ test, onViewDetail }) => {
  console.log("Test Item ID:", test.id, "UserTest ID:", test.userTestId);

  return (
      <tr>
        <td>{test.testPaperName}</td>
        <td>
          {test.userTestId ? (
              <button onClick={() => onViewDetail(test.userTestId)}>상세보기</button>
          ) : (
              <button disabled>상세보기</button>
          )}
        </td>
      </tr>
  );
};

export default SharedTestItem;
