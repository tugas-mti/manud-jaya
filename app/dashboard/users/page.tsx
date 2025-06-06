import Pagination from "@/app/components/pagination";
import Table from "@/app/components/table";
import { User as UserType } from "@prisma/client";

type UserResponse = {
  data: UserType[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const currentPage = Number((await searchParams).page) || 1;
  const limit = 20;

  async function fetchGalleries(page: number): Promise<UserResponse> {
    const url = new URL("/api/users", process.env.NEXT_PUBLIC_API_URL);
    url.searchParams.append("page", String(page));
    url.searchParams.append("limit", String(limit));

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    return res.json();
  }

  const { data: users, meta } = await fetchGalleries(currentPage);
  const totalPages = Math.ceil(meta.total / limit);

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
      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/dashboard/users"
        />
      </div>
    </div>
  );
}
