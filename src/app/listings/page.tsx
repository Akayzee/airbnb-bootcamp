import { getUsers } from "@/db/user";
import React from "react";

type Props = {};

const ListingsPage = async (props: Props) => {
  const users = await getUsers();

  if (!users) {
    return <div>No users Found</div>;
  }
  return (
    <div>
      {users.length}
      {users.map((user) => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  );
};

export default ListingsPage;
