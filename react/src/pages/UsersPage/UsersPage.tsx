import { useEffect } from "react";
import BackButton from "../../components/BackButton/BackButton";
import "./UsersPage.css";
import { useUser } from "../../hooks/useUsers";

function UsersPage() {
  const { data, loading, fetchUsers } = useUser();
  useEffect(() => {
    fetchUsers("https://szoftarch.webgravir.hu/api/users");
  }, []);
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
        />
        <button className="search-button km-button">Keresés</button>
      </div>
      {loading
        ? "Betöltés..."
        : data?.map((user) => (
            <div className="user-container" key={user.id}>
              <div className="icon-container">ICON</div>
              <div className="name-container">
                {user.name} - {user.neptun}
              </div>
              <a
                className="icon-container km-icon-button-primary"
                href={`/user-edit/${user.id}`}
              >
                M
              </a>
            </div>
          ))}
    </div>
  );
}

export default UsersPage;
