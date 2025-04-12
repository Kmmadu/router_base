import UserTable from "../components/UserTable";
const Customers = ({ users }) => {
  return (
    <div className="bg-[var(--background)] h-screen p-4 md:p-6 flex flex-col">
      <h1 className="text-2xl font-bold  mb-6">Customers</h1>

      <UserTable users={users} />
    </div>
  );
};

export default Customers;
