import UserTable from "../components/UserTable";
const Customers = ({ users }) => {
  return (
    <div className="bg-white  shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Customers</h1>

      <UserTable users={users} />
    </div>
  );
};

export default Customers;
