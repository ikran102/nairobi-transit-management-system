import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import "../styles/ViewRoutes.css";

function ViewFares() {
  const [fares, setFares] = useState([]);

  useEffect(() => {
    fetchFares();
  }, []);

  const fetchFares = async () => {
    const response = await fetch("http://127.0.0.1:5000/api/fares");
    const data = await response.json();
    setFares(data);
  };

  const deleteFare = async (id) => {
    if (!window.confirm("Delete this fare?")) return;

    await fetch(`http://127.0.0.1:5000/api/fares/${id}`, {
      method: "DELETE",
    });

    fetchFares();
  };

  return (
    <AdminLayout>
      <div className="table-container">
        <h1>Fare Management</h1>

        <table>
          <thead>
            <tr>
              <th>Route</th>
              <th>Minimum Fare</th>
              <th>Maximum Fare</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {fares.map((fare) => (
              <tr key={fare.id}>
                <td>{fare.route_name}</td>
                <td>KSh {fare.min_fare}</td>
                <td>KSh {fare.max_fare}</td>
                <td>{fare.time_of_day}</td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteFare(fare.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </AdminLayout>
  );
}

export default ViewFares;