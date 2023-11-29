import { useEffect, useState } from "react";

import SideBare from "../../Layout/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { technicienActionThunk } from "../../store/reducers/technicien/TechnicienActionThunk";
import { cityActionThunk } from "../../store/reducers/cities/cityActionThunk";

const AddTechnicien = () => {
  const dispatch = useDispatch();
  const [formSent, setFormSent] = useState(false);
  const [technicienData, setTechnicienData] = useState({
    name: "",
    email: "",
    city_id: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (technicienData.name.trim() === "") {
      newErrors.name = "Prénom est requis";
    }

    if (technicienData.email.trim() === "") {
      newErrors.email = "Email est requis";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  

  // Handle input changes and update technicienData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTechnicienData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setFormSent(false);

  if (validateForm()) {
    try {
      await dispatch(
        technicienActionThunk.addTechnicienthunk(technicienData)
      );
      setFormSent(true);
      setTechnicienData({
        name: "",
        email: "",
        city_id: "",
      });
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  }
};
  useEffect(() => {
    dispatch(cityActionThunk.fetch());
  }, [dispatch]);


  const { city } = useSelector((state) => state.city);
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
                    Ajouter Technicien
                  </h1>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="prenom" className="block text-gray-700">
                        Prénom
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={technicienData.name}
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
                        type="text"
                        id="email"
                        name="email"
                        value={technicienData.email}
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
                        name="city_id"
                        onChange={handleChange}
                        className="w-full px-3 py-2 border"
                      >
                        <option value="" disabled selected>
                          Select a city
                        </option>
                        {city.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.city_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Ajouter
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
};

export default AddTechnicien;
