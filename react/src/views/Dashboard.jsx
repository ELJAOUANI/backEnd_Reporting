
import SideBar from "../Layout/SideBar";
import Table from "../Layout/Table";

export default function Dashboard() {
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7x1 py-6 px-4 sm:x-6 1g:px-8">
       
            <div className="flex">
              <div className="w-full md:w-1/4 bg-white-400 p-4 text-center text-white-700">
                <SideBar />
              </div>
              <div className="w-full md:w-3/4 bg-white-500 p-4 text-center text-white-200">
                <Table />
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
