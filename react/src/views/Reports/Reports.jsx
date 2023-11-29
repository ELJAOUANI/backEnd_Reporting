import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reportActionThunk } from "../../store/reducers/report/reportActionThunk";

export default function Reports() {
  // const [formSent , setFormSent] = useState(false)
  const reports = useSelector((state) => state.report.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reportActionThunk.fetch());
  }, []);
  return (
    <>
      {reports?.map((rep, key) => (
        <div
          key={key}
          className="bg-gray-100 p-6 rounded-md shadow-md max-w-xs text-start"
        >
          <div className="mb-4">
            <p className="text-xl font-semibold">OPERATION</p>
            <p className="text-gray-700">{rep.operation}</p>
          </div>
          <div className="mb-4">
            <p className="text-xl font-semibold">TYPE OPERATION</p>
            <p className="text-gray-700">{rep.date_of_operation}</p>
          </div>
          <div className="mb-4">
            <p className="text-xl font-semibold">Adress</p>
            <p className="text-gray-700">{rep.address}</p>
          </div>
          <div className="mb-4">
            <p className="text-xl font-semibold">TECHNICIEN</p>
            <p className="text-gray-700">John Doe</p>
          </div>
          <div className="mb-4">
            <p className="text-xl font-semibold">DATE</p>
            <p className="text-gray-700">{rep.date_of_operation}</p>
          </div>
          <div className="mb-4">
            <p className="text-xl font-semibold">SECTEUR</p>
            <p className="text-gray-700">{rep.secteur}</p>
          </div>
          <div className="mb-4">
            <p className="text-xl font-semibold">SR</p>
            <p className="text-gray-700">{}</p>
          </div>
          <div>
            <p className="text-xl font-semibold">N° ORDRE</p>
            <p className="text-gray-700">{rep.order_number}</p>
          </div>
        </div>
      ))}
    </>
  );
}
