interface TableProps {
  columns: string[]; // 컬럼 이름 배열
  data: any[]; // 데이터 배열
  selectable?: boolean; // 체크박스 여부
}

const Table: React.FC<TableProps> = ({ columns, data, selectable = false }) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {selectable && <th className="p-2 border">✔</th>}
            {columns.map((col, index) => (
              <th key={index} className="p-2 border text-left">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              {selectable && (
                <td className="p-2 border">
                  <input type="checkbox" />
                </td>
              )}
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="p-2 border">
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
