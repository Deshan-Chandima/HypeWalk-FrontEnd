import { useEffect, useState } from "react";
import { BiTrash, BiEditAlt, BiSave, BiX } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast";

const statusOptions = ["pending", "processing", "shipped", "completed", "cancelled"];

export default function OrderViewAdminPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editRow, setEditRow] = useState(null);
  const [statusDraft, setStatusDraft] = useState("");
  const [notesDraft, setNotesDraft] = useState("");

  function fetchOrders() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    setIsLoading(true);

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(Array.isArray(res.data) ? res.data : []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load orders");
        setIsLoading(false);
      });
  }

  useEffect(fetchOrders, []);

  function handleDelete(orderId) {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    if (!window.confirm(`Delete order ${orderId}? This can't be undone.`)) return;
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("Order deleted");
        fetchOrders();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete order");
      });
  }

  function handleEdit(order) {
    setEditRow(order._id);
    setStatusDraft(order.status || "");
    setNotesDraft(order.notes || "");
  }

  function handleCancelEdit() {
    setEditRow(null);
    setStatusDraft("");
    setNotesDraft("");
  }

  function handleSave(order) {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${order._id}`,
        { status: statusDraft, notes: notesDraft },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        toast.success("Order status updated");
        setEditRow(null);
        fetchOrders();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update order");
      });
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#FAFAFA] to-[#F0F0F0] p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-bold">Orders</h2>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B894]"></div>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-xl rounded-2xl bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#2D3436] text-white text-sm uppercase">
                <th className="p-4 font-semibold">Order ID</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Phone</th>
                <th className="p-4 font-semibold">Address</th>
                <th className="p-4 font-semibold">Total</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Notes</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId} className="border-b border-[#DFE6E9] hover:bg-[#FAFAFA] transition-colors">
                  <td className="p-4">{order.orderId}</td>
                  <td className="p-4">{order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}</td>
                  <td className="p-4">{order.customerName}</td>
                  <td className="p-4">{order.customerEmail}</td>
                  <td className="p-4">{order.phone}</td>
                  <td className="p-4">{order.address}</td>
                  <td className="p-4 font-bold text-[#00B894]">Rs {Number(order.total || 0)}</td>
                  {/* STATUS */}
                  <td className="p-4">
                    {editRow === order._id ? (
                      <select
                        value={statusDraft}
                        onChange={(e) => setStatusDraft(e.target.value)}
                        className="px-2 py-1 border rounded"
                      >
                        {statusOptions.map((s) => (
                          <option value={s} key={s}>{s}</option>
                        ))}
                      </select>
                    ) : (
                      <span className={
                        order.status === "pending"
                          ? "px-3 py-1 rounded bg-yellow-200 text-yellow-700"
                          : order.status === "completed"
                          ? "px-3 py-1 rounded bg-green-100 text-green-700"
                          : "px-3 py-1 rounded bg-blue-100 text-blue-700"
                      }>
                        {order.status}
                      </span>
                    )}
                  </td>
                  {/* NOTES */}
                  <td className="p-4">
                    {editRow === order._id ? (
                      <input
                        className="border px-2 py-1 rounded"
                        value={notesDraft}
                        onChange={e => setNotesDraft(e.target.value)}
                      />
                    ) : (
                      <span>{order.notes}</span>
                    )}
                  </td>
                  {/* ACTIONS */}
                  <td className="p-4">
                    <div className="flex gap-2">
                      {editRow === order._id ? (
                        <>
                          <button
                            className="bg-[#00B894] text-white px-2 py-2 rounded-full shadow hover:bg-[#00A383]"
                            title="Save"
                            onClick={() => handleSave(order)}
                          >
                            <BiSave />
                          </button>
                          <button
                            className="bg-gray-400 text-white px-2 py-2 rounded-full shadow hover:bg-gray-600"
                            title="Cancel"
                            onClick={handleCancelEdit}
                          >
                            <BiX />
                          </button>
                        </>
                      ) : (
                        <button
                          className="bg-[#00B894] text-white px-2 py-2 rounded-full shadow hover:bg-[#00A383]"
                          title="Edit Status"
                          onClick={() => handleEdit(order)}
                        >
                          <BiEditAlt />
                        </button>
                      )}
                      <button
                        className="bg-red-500 text-white px-2 py-2 rounded-full shadow hover:bg-red-600"
                        title="Delete Order"
                        onClick={() => handleDelete(order.orderId)}
                      >
                        <BiTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={10} className="p-12 text-center text-[#B2BEC3] text-base">No orders to show.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
