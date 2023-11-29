import { useEffect, useState } from "react";
import SideBare from "../../Layout/SideBar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { technicienActionThunk, updateTechnicien } from "../../store/reducers/technicien/TechnicienActionThunk";
import { cityActionThunk } from "../../store/reducers/cities/cityActionThunk";

export default function EditTechnicien() {
  const { id } = useParams(); // Extract the id from the URL params
  const dispatch = useDispatch();
  const [loading, setState] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
   id: id,
   name: "",
   email: "",
   city_id :""
 });





 const fetchData = async () => {
   try {
     const technicienData = await dispatch(
       technicienActionThunk.getTechnicienThunk(id)
     );
     setFormData((prevFormData) => ({
       ...prevFormData,
       ...technicienData,
     }));
   } catch (error) {
     console.error("Error fetching technicien:", error);
   }
 };

  useEffect(() => {
   
    fetchData();
  }, [dispatch]);





  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  



  
  const handleUpdateTechnicien = async (e) => {
    e.preventDefault();
    setFormSent(false);
    setState(true)
    if (validateForm()) {
      try {
        const updatedTechnicien = await dispatch(
          updateTechnicien(id, formData)
        );
        setFormData({
          name: "",
          email: "",
          city_id: "",
        });
         setState(false);
        setFormSent(true);
        console.log("Technicien updated:", updatedTechnicien);
      } catch (error) {
        console.error("Erreur lors de la mise à jour des données:", error);
      }
    }
  };
  //const [city, setCity] = useState([]);
   const validateForm = () => {
    const newErrors = {};

    if (formData.name.trim() === "") {
      newErrors.name = "Prénom est requis";
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Nom est requis";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
    
    useEffect(() => {
      dispatch(cityActionThunk.fetch());
    }, [dispatch]);


 const { city} = useSelector((state) => state.city);
  if(loading == true){
      return (
        <div className="flex justify-center items-center h-screen">
          <img
            className="block mx-auto my-auto"
            src="/src/assets/Loading_2.gif"
            alt="My GIF"
          />
        </div>
      );
  }
return (
    <>
      <header className="bg-white shadow"></header>
      <main>
        <div className="mx-auto max-w-7x1 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7x1 py-6 px-4 sm:x-6 1g:px-8">
            <div className="flex">
              <div className="w-full md:w-1/4 bg-white-400 p-4 text-center text-white-700">
                <SideBare />
              </div>
              <div className="w-full md:w-3/4 bg-white-500 p-4 text-white-200">
                <div className="max-w-xl mx-auto my-4 p-4 bg-white shadow-md rounded">
                  {formSent ? (
                    <div className="bg-green-500 text-white px-4 py-2 rounded">
                      <strong>Success</strong> Form sent Successfully
                    </div>
                  ) : (
                    ""
                  )}

                  <h1 className="text-2xl font-bold mb-4">
                    Modifier Technicien
                  </h1>
                  <form onSubmit={handleUpdateTechnicien}>
                    <div className="mb-4">
                      <label htmlFor="prenom" className="block text-gray-700">
                        Prénom
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${
                          errors.prenom ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:outline-none focus:border-blue-500`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="nom" className="block text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:outline-none focus:border-blue-500`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="city_id">Choose an option:</label>
                      <select
                        id="city_id"
                        value={formData.city?.id}
                        name="city_id"
                        onChange={handleChange}
                        className="w-full px-3 py-2 border"
                      >
                        {city.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.city_name}
                          </option>
                        ))}
                      </select>

                      {/* <p>You selected: {selectedOption}</p> */}
                    </div>

                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Modifier
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
