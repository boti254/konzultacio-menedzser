import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton/BackButton";
import "./UsersPage.css";
import { useUsers } from "../../hooks/useUsers";
import UserEditIcon from "../../assets/edit.svg";
import UserDeleteIcon from "../../assets/trash.svg";
import UserIcon from "../../assets/user.svg";
import PlusIcon from "../../assets/plus.svg";

function UsersPage() {
  const { data, loading, fetchUsers, deleteUser } = useUsers();
  useEffect(() => {
    fetchUsers("https://szoftarch.webgravir.hu/api/users");
  }, []);

  const [search, setSearch] = useState("");
  const handleSearchState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const handleSearch = () => {
    if (search) {
      fetchUsers(
        `https://szoftarch.webgravir.hu/api/users${"/search/" + search}`
      );
    } else {
      fetchUsers(`https://szoftarch.webgravir.hu/api/users`);
    }
  };

  const handleDelete = (id: number) => {
    deleteUser(
      `https://szoftarch.webgravir.hu/api/users/delete/${id}`,
      id
    );
  };

  return (
    <div className="users-page-container">
      <BackButton linkTo={"/menu"} />
      <div className="users-input-wrapper">
        <label htmlFor="searchUser" className="km-label">
          Név
        </label>
        <input
          type="text"
          id="searchUser"
          className="km-input"
          placeholder="Ide irj nevet"
          value={search}
          onChange={handleSearchState}
        />
        <button
          className="search-button km-button"
          onClick={() => handleSearch()}
        >
          Keresés
        </button>
      </div>
      {loading
        ? "Betöltés..."
        : data?.map((user) => (
            <div className="user-container" key={user.id}>
              <div className="icon-container">
              <img src={UserIcon} alt="User Icon" />
              </div>
              <div className="name-container">
                {user.name} - {user.neptun}
              </div>
              <a
                className="icon-container km-icon-button-error" onClick={() => handleDelete(user.id)}
              >
                <img src={UserDeleteIcon} alt="User Edit Icon" />
              </a>
              <a className="icon-container km-icon-button-primary" href={`/user-edit/${user.id}`}>
              
                <img src={UserEditIcon} alt="User Edit Icon" />
              </a>
            </div>
          ))}
      <div>
        <a
          className="icon-container km-icon-button-primary"
          href={`/user-edit/0`}
        >
          <img src={PlusIcon} alt="Plus Icon" />
        </a>
      </div>
    </div>
  );
}

export default UsersPage;
