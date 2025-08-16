import React, { useEffect, useState } from "react";
import { assets, blog_data, dashboard_data } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { axios, fetchData } = useAppContext();

  const [dashboardData, setDashboardData] = useState({});

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  // console.log("dashboardData", dashboardData);
  useEffect(() => {
    fetchDashboardData();
  }, []);
  // console.log("dashboardData.recentBlogs data", dashboardData);
  return (
    <div className="flex-1 p-4 md:p-10  bg-blue-50/50">
      <div className="flex flex-wrap gap-4">
        {/* Dashboard Blogs Card  */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer       hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_1} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData?.blogs}
            </p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>

        {/* Dashboard Comments Card  */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_2} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData?.comments}
            </p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>

        {/* Dashboard Drafts Card  */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_3} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData?.drafts?.length}
            </p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <img src={assets.dashboard_icon_4} alt="" />
          <p>Latest Blogs</p>
        </div>

        {/* Blog Table */}
        <div className="relative max-w-4xl shadow rounded-lg bg-white">
          {/* Scroll container */}
          <div className="max-h-76 overflow-y-auto scrollbar-hide">
            <table className="w-full text-sm text-gray-500">
              <thead className="text-xs text-gray-600 text-left uppercase sticky top-0 bg-white z-10">
                <tr>
                  <th scope="col" className="px-2 py-4 xl:px-6">
                    #
                  </th>
                  <th scope="col" className="px-2 py-4">
                    Blog Title
                  </th>
                  <th scope="col" className="px-2 py-4 max-sm:hidden">
                    Date
                  </th>
                  <th scope="col" className="px-2 py-4 max-sm:hidden">
                    Status
                  </th>
                  <th scope="col" className="px-2 py-4">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {dashboardData?.recentBlogs?.map((blog, index) => (
                  <BlogTableItem
                    key={blog?._id}
                    blog={blog}
                    fetchBlogs={fetchDashboardData}
                    index={index + 1}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
