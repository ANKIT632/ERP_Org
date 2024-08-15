import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowDown,
} from "react-icons/md";
import React, { useEffect, useState } from "react";
import { BiPin } from "react-icons/bi";
import axios from "axios";

export default function AllCharts() {
  const [data, setData] = useState([]);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateRowIndex, setUpdateRowIndex] = useState(null);
  const [updatedSubGroupInput, setUpdatedSubGroupInput] = useState("");

  const handleUpdateModalOpen = (index, subIndex) => {
    setUpdateModalVisible(true);
    setUpdateRowIndex(index);
    setUpdatedSubGroupInput(data[index].subGroup[subIndex].title);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalVisible(false);
    setUpdateRowIndex(null);
    setUpdatedSubGroupInput("");
  };

  const handleUpdateSubGroup = async () => {
    try {
      const updatedSubGroups = updatedSubGroupInput
        .split(", ")
        .map((title) => ({ title }));
      const newData = [...data];
      newData[updateRowIndex].subGroup = updatedSubGroups;
      setData(newData);
      await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/chart/${newData[updateRowIndex]._id}`,
        {
          subGroup: updatedSubGroups,
        }
      );
      handleUpdateModalClose();
    } catch (error) {
      console.error("Failed to update subgroup:", error);
    }
  };

  useEffect(() => {
    (async () => {
      let res = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/chart`);
      // setData(res);
      // console.log(res.data.response, "data");
      setData(res.data.response);
    })();
  }, []);

  const [visiblesubGroups, setVisiblesubGroups] = useState(
    data.map(() => false)
  );
  const [showModal, setShowModal] = useState(false);
  const [currentRowIndex, setCurrentRowIndex] = useState(null);
  const [subGroupInput, setsubGroupInput] = useState("");

  const handleTogglesubGroup = (index) => {
    const newVisiblesubGroups = [...visiblesubGroups];
    newVisiblesubGroups[index] = !newVisiblesubGroups[index];
    setVisiblesubGroups(newVisiblesubGroups);
  };

  const handleAddsubGroup = async () => {
    if (subGroupInput.trim() !== "") {
      try {
        const newData = [...data];
        newData[currentRowIndex].subGroup.push({ title: subGroupInput });
        setData(newData);
        setsubGroupInput("");
        setShowModal(false);

        const res = await axios.patch(
          `${import.meta.env.VITE_APP_BASE_URL}/chart/${newData[currentRowIndex]._id}`,
          {
            subGroup: newData[currentRowIndex].subGroup,
          }
        );
        // console.log(res, "update response");
      } catch (error) {
        console.error("Failed to update subgroup:", error);
      }
    }
  };

  const handleDeleteSubGroup = async (groupIndex, subIndex) => {
    try {
      const newData = [...data];
      const chartId = newData[groupIndex]._id;
      const subgroupId = newData[groupIndex].subGroup[subIndex]._id;
      newData[groupIndex].subGroup.splice(subIndex, 1);
      const res = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/chart/${chartId}/subgroup/${subgroupId}`
      );
      setData(newData);
      location.reload();
      // console.log(res, "resssss delete data");
      // console.log("Subgroup deleted successfully");
    } catch (error) {
      console.error("Failed to delete subgroup:", error);
    }
  };

  return (
    <div className="my-4 w-full border bg-white px-4 py-2 rounded-lg shadow">
      <div className="p-4 text-gray-800">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-xl pb-2">Charts Of Account</h1>
          <BiPin size={20} />
        </div>
        <div className="border border-gray-400  rounded-md shadow ">
          <div className="overflow-y-scroll h-[500px]">
            <table className="min-w-full divide-y divide-gray-200 border">
              <thead className="sticky top-0 bg-blue-200 z-10">
                <tr>
                  <th className="px-2 py-3 text-left text-xs font-medium text-black  tracking-wider border">
                    <MdKeyboardDoubleArrowDown size={17} />
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-black  tracking-wider border">
                    Group Name
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-black  tracking-wider border">
                    Item
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-black  tracking-wider border">
                    Nature Of Group
                  </th>

                  <th></th>
                  <th className=" py-3  text-xs font-medium text-black  tracking-wider border text-end px-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 ">
                {data.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                      <td
                        className="px-2 p-2 whitespace-nowrap text-sm text-gray-500 border cursor-pointer "
                        onClick={() => handleTogglesubGroup(index)}
                      >
                        <MdKeyboardArrowRight size={20} />
                      </td>
                      <td className="py-2 whitespace-nowrap text-sm text-gray-500 border">
                        {item.groupName}
                        {visiblesubGroups[index] &&
                          item.subGroup.length > 0 && (
                            <ul className="">
                              {item.subGroup.map((subGroup, subIndex) => (
                                <li className="border-t border-gray-300" key={subIndex}>{subGroup.title}</li>
                              ))}
                            </ul>
                          )}
                      </td>
                      <td className="py-2 whitespace-nowrap text-sm text-gray-500 ">
                        {item.item}
                        {visiblesubGroups[index] &&
                          item.subGroup.length > 0 && (
                            <ul className=" ">
                              {item.subGroup.map((subGroup, subIndex) => (
                                <li className="border-t border-gray-300 " key={subIndex}>{item.item}</li>
                              ))}
                            </ul>
                          )}
                      </td>
                      <td className="whitespace-nowrap text-sm text-gray-500  ">
                        {item.natureOfGroup}
                        {visiblesubGroups[index] &&
                          item.subGroup.length > 0 && (
                            <ul>
                              {item.subGroup.map((subGroup, subIndex) => (
                                <li className="border-t border-gray-300" key={subIndex}>{item.natureOfGroup}</li>
                              ))}
                            </ul>
                          )}
                      </td>
                      <td className="whitespace-nowrap text-sm text-gray-500 border ">
                        {/* {item.groupName} */}
                        {visiblesubGroups[index] &&
                          item.subGroup.length > 0 && (
                            <ul className="mt-5">
                              {item.subGroup.map((subGroup, subIndex) => (
                                <li
                                
                                  key={subIndex}
                                  className="flex justify-end gap-4  text-blue-400 border-t border-gray-300"
                                >
                                  <button
                                    onClick={() =>
                                      handleUpdateModalOpen(index, subIndex)
                                    }
                                  >
                                    Update
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteSubGroup(index, subIndex)
                                    }
                                  >
                                    Delete
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                      </td>

                      <td className="px-2 p-2 whitespace-nowrap text-sm text-blue-700 border text-end">
                        <button
                          onClick={() => {
                            setShowModal(true);
                            setCurrentRowIndex(index);
                          }}
                        >
                          +Add subGroup
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            {updateModalVisible && (
              <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="relative bg-white rounded-lg px-8 py-6">
                  <label className="block text-sm font-medium text-gray-700 pb-2">
                    Update subGroup Name
                  </label>
                  <input
                    type="text"
                    value={updatedSubGroupInput}
                    onChange={(e) => setUpdatedSubGroupInput(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm form-input"
                    placeholder="Enter updated subGroup name"
                  />
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={handleUpdateModalClose}
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateSubGroup}
                      className="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="relative bg-white rounded-lg px-8 py-6">
            <label className="block text-sm font-medium text-gray-700 pb-2">
              Add subGroup Name
            </label>
            <input
              type="text"
              value={subGroupInput}
              onChange={(e) => setsubGroupInput(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm form-input"
              placeholder="Enter subGroup name"
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddsubGroup}
                className="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
