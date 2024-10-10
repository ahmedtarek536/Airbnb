import React, { useState, useRef, useEffect } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../utils/firebas";
import { Box } from "@mui/material";
import toast from "react-hot-toast";
import { UpdateUserInfo } from "../../services/apiUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit
);

export default function ProfileCardEdit({ user }) {
  const profileImage = user?.profileImage;
  const [files, setFiles] = useState([]);
  const [imageUrl, setImageUrl] = useState(profileImage || null);
  const filePondRef = useRef(null);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: UpdateUserInfo,
    onSuccess: (data) => {
      queryClient.invalidateQueries("user");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleUpdate() {
    mutate({
      profileImage: imageUrl,
    });
  }
  useEffect(
    function () {
      handleUpdate();
    },
    [imageUrl]
  );

  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
        });
      }
    );
  };

  return (
    <Box className="shadow-md border border-bColor rounded-3xl  flex items-center justify-start px-8   py-4 sm:px-16  gap-6 sm:gap-16 w-full mt-8 ">
      <Box className="flex items-center px-6 sm:px-12 py-6 justify-center m-auto w-full">
        <Box className="text-center  m-auto w-full">
          <Box className="flex items-center justify-center w-full">
            <div className="App  w-[150px] sm:w-[170px]">
              <FilePond
                ref={filePondRef}
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={false}
                maxFiles={1}
                name="filepond"
                acceptedFileTypes={["image/png", "image/jpeg", "image/gif"]}
                labelIdle="Drag & Drop your picture or <span class='filepond--label-action'>Browse</span>"
                imagePreviewHeight={170}
                imageCropAspectRatio="1:1"
                imageResizeTargetWidth={200}
                imageResizeTargetHeight={200}
                stylePanelLayout="compact circle"
                styleProgressIndicatorPosition="right bottom"
                styleButtonRemoveItemPosition="left bottom"
                styleButtonProcessItemPosition="right bottom"
                server={{
                  process: (
                    fieldName,
                    file,
                    metadata,
                    load,
                    error,
                    progress,
                    abort
                  ) => {
                    handleFileUpload(file);
                    load(file.name);
                  },
                }}
              />
              <h4 className="font-semibold text-lg mt-3">{user?.fullName}</h4>
              <p className="">Host</p>
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
