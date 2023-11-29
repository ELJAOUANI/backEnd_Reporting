import { useEffect, useState } from "react";
import SideBare from "../../Layout/SideBar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { technicienActionThunk } from "../../store/reducers/technicien/TechnicienActionThunk";

//import { Link } from "react-router-dom";

export default function Technicien() {
  const dispatch = useDispatch();
   const [isDeleting, setIsDeleting] = useState(false);

      const { techniciens, error,loading } = useSelector(
        (state) => state.technicien
      );
      
 const [searchTerm, setSearchTerm] = useState("");
 const filteredTechniciens = Object.values(techniciens).filter(
   (technicien) =>
     technicien &&
     technicien.name &&
     technicien.name.toLowerCase().includes(searchTerm.toLowerCase())
 );



      useEffect(() => {
        dispatch(technicienActionThunk.fetchTechniciens());
      }, [dispatch]);


        if (error) {
          return <div>Error fetching techniciens: {error}</div>;
        }
 const handleDelete = (id) => {
    setIsDeleting(true);
    dispatch(technicienActionThunk.deleteTechnicien(id));
    dispatch(technicienActionThunk.fetchTechniciens())
    setIsDeleting(false);
 };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img
          className="block mx-auto my-auto"
          src="src/assets/Loading_2.gif"
          alt="My GIF"
        />
      </div>
    );
  }
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7x1 py-6 px-4 sm:x-6 1g:px-8">
          <div className="flex">
            <div className="w-full md:w-1/4 bg-white-400 p-4 text-center text-white-700">
              <SideBare />
            </div>
            <div className="w-full md:w-3/4 bg-white-500 p-4 text-center text-white-200">
              <div className="flex justify-end p-4">
                <button className="bg-blue-500 text-white py-2 px-4 rounded">
                  <Link to={"/technicien/create"}>Ajouter Un Technicien</Link>
                </button>
              </div>
              <input
                type="text"
                placeholder="Rechercher un technicien..."
                className="p-2 border border-gray-300 rounded w-full mb-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">ID</th>
                      <th className="py-2 px-4 border-b">Name</th>
                      <th className="py-2 px-4 border-b">Email</th>
                      <th className="py-2 px-4 border-b">City</th>
                      <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ?  (
                      <tr>
                        <td colSpan="5" className="py-4 text-start">
                          Loading...
                        </td> 
                      </tr>
                    ) : filteredTechniciens.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-4 text-center">
                          No techniciens found
                        </td>
                      </tr>
                    ) : (
                      filteredTechniciens.map((technicien) => (
                        <tr key={technicien.id}>
                          <td className="py-2 px-4 border-b">
                            {technicien.id}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {technicien.name}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {technicien.email}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {technicien.city?.city_name}
                          </td>
                          <td className="py-2 px-4 border-b">
                            <button className="bg-blue-500 text-white mx-2 px-4 py-2 rounded">
                              <Link to={`/technicien/update/${technicien.id}`}>
                                Update
                              </Link>
                            </button>
                            <button
                              onClick={() => handleDelete(technicien.id)}
                              disabled={isDeleting}
                              className={`bg-red-500 text-white px-4 py-2 rounded ${
                                isDeleting && "opacity-50 cursor-not-allowed"
                              }`}
                            >
                              {isDeleting ? "Deleting..." : "Delete Technicien"}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7x1 py-6 sm:px-6 lg:px-8"></div>
      </main>
    </>
  );
}
