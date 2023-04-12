import { useState, useEffect } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Profile() {
  const { setNotification, user, setUser } = useStateContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/users/${user.id}`)
      .then(({ data }) => {
        setUser(data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onSaveClick = () => {
    axiosClient
      .put(`/users/${user.id}`, user)
      .then(() => {
        setNotification("User was successfully updated");
      })
      .catch((e) => {
        setNotification("Failed to update user");
        console.log(e);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && !user && <p>User not found</p>}
      {!loading && user && (
        <div>
          <h1>Profile</h1>
          <form>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Passport
              <input
                type="text"
                name="passport"
                value={user.passport}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Create Date:
              <input
                type="text"
                name="created_at"
                value={user.created_at}
                readOnly
              />
            </label>
            <div>
              <button type="button" onClick={onSaveClick} className="btn">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
