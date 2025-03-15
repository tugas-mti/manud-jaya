import Table from "@/components/table";
import { prisma } from "@/lib/prisma";

export default async function UsersPage() {
  const users = await prisma.user.findMany();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="overflow-x-auto">
        <Table
          columns={[
            {
              title: "ID",
              dataIndex: "id",
            },
            {
              title: "Name",
              dataIndex: "name",
            },
            {
              title: "Email",
              dataIndex: "email",
            },
            {
              title: "Is Admin",
              dataIndex: "isAdmin",
              render: (value) => (value ? "Yes" : "No"),
            },
          ]}
          dataSource={users}
        />
      </div>
    </div>
  );
}
