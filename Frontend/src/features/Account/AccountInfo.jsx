import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { getUserInfo, UpdateUserInfo } from "../../services/apiUser";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

const AccountInfo = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: UpdateUserInfo,
    onSuccess: (data) => {
      queryClient.invalidateQueries("order");
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [userData, setUserData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    email: "",
  });

  useEffect(() => {
    if (data) {
      setUserData({
        fullName: data?.data?.fullName || "",
        phoneNumber: data?.data?.phoneNumber || "",
        address: data?.data?.address || "",
        email: data?.data?.email || "",
        emerganceContact: data?.data?.emerganceContact || "",
        governmentID: data?.data?.governmentID || "",
      });
    }
  }, [data]);

  const handleEdit = (field, value) => {
    setUserData({ ...userData, [field]: value });
    mutate({ [field]: value });
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="max-w-full mx-auto p-6 w-full">
      <ProfileField
        label="Full Name"
        value={userData.fullName || "Not provided"}
        isEditable={true}
        field="fullName"
        handleEdit={handleEdit}
      />
      <ProfileField
        label="Email"
        value={userData.email}
        isEditable={false}
        field="email"
        handleEdit={handleEdit}
      />

      <ProfileField
        label="Phone Number"
        value={userData.phoneNumber || "Not provided"}
        isEditable={true}
        field="phoneNumber"
        handleEdit={handleEdit}
      />
      <ProfileField
        label="Address"
        value={userData.address || "Not provided"}
        isEditable={true}
        field="address"
        handleEdit={handleEdit}
      />
      <ProfileField
        label="Governement ID"
        value={userData.governmentID || "Not provided"}
        isEditable={true}
        field="governmentID"
        handleEdit={handleEdit}
      />
      <ProfileField
        label="Emergrance Contact"
        value={userData.emerganceContact || "Not provided"}
        isEditable={true}
        field="emerganceContact"
        handleEdit={handleEdit}
      />
    </div>
  );
};

const ProfileField = ({ label, value, isEditable, field, handleEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    handleEdit(field, inputValue);
    setIsEditing(false);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="mb-6 py-3 border-b border-bColor text-sm">
      <div className="font-semibold text-gray-700">{label}</div>
      {isEditing ? (
        <div className="mt-2 flex items-center space-x-4">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="mt-2 flex justify-between items-center">
          <span className="text-gray-600">{value}</span>
          {isEditable && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:underline"
            >
              Edit
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountInfo;
