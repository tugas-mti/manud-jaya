interface TableColumn<T> {
  title: string;
  dataIndex: keyof T;
  key?: string;
  render?: (value: any, record: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  dataSource: T[];
  loading?: boolean;
}

const Table = <T extends object>({
  columns,
  dataSource,
  loading,
}: TableProps<T>) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column) => (
              <th key={column.key} className="p-2 text-left border">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((record, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={`${index}-${column.key || String(column.dataIndex)}`}
                  className="p-2 border"
                >
                  {column.render
                    ? column.render(record[column.dataIndex], record)
                    : String(record[column.dataIndex])}
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
