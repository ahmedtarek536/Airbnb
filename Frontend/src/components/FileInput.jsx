import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../utils/firebas";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function FileInput({ onImages }) {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (onImages) onImages(images);
  }, [images]);

  const handleUpload = async () => {
    setIsLoading(true);
    const storage = getStorage(app);
    let imageUrls = [];

    for (const fileItem of files) {
      const file = fileItem.file;
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      try {
        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (err) => {
              reject(err);
              console.error("Error uploading file:", err);
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref
                );
                imageUrls.unshift(downloadURL);
                resolve();
              } catch (err) {
                reject(err);
                console.error("Error getting download URL:", err);
              }
            }
          );
        });
      } catch (error) {
        console.error("Error in the upload process:", error);
      }
    }

    setImages(imageUrls);
    setIsLoading(false);
  };

  return (
    <div className="App mt-8">
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={true}
        maxFiles={10}
        name="file"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
      <button
        disabled={isLoading}
        className="button w-fit"
        onClick={handleUpload}
      >
        {isLoading ? "Uploading..." : "Save Files"}
      </button>
    </div>
  );
}

ReactDOM.render(<FileInput />, document.getElementById("root"));
