import { useSelector } from "react-redux";
import "./ProfileComponent.css";
import { useEffect, useRef, useState } from "react";
import { app } from "../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useDispatch } from "react-redux";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutSuccess,
  updateFailure,
  updatePasswordFailure,
  updatePasswordStart,
  updatePasswordSuccess,
  updateStart,
  updateSuccess,
} from "../../redux/userSlice";
import Collapsible from "../CollapsibleComponent/Collapsible.jsx";
import DeleteConfirmationModal from "../DeleteConfirmation/DeleteConfirmation.jsx";

export default function ProfileComponent() {
  const dispatch = useDispatch();
  const { currentUser, error, errorPassUpdate } = useSelector(
    (state) => state.user
  );
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploadLoadingStatus, setImageFileUploadLoadingStatus] =
    useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateProfileSuccess, setUpdateProfileSuccess] = useState(null);
  const [formData, setFormData] = useState({});
  const [passwordFormData, setPasswordFormData] = useState({});
  const [showDeleteFunction, setShowDeleteFunction] = useState(false);
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(null);
  const filePickerRef = useRef();

  const handlePasswordChange = (e) => {
    setPasswordFormData({ ...passwordFormData, [e.target.id]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updatePasswordStart());
      setPasswordUpdateSuccess(null);
      const res = await fetch(`/api/user/updatepassword/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordFormData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(
          updatePasswordFailure(data.message || "Password update failed.")
        );
        setPasswordUpdateSuccess(null);
      } else {
        dispatch(updatePasswordSuccess(data));
        setPasswordUpdateSuccess(
          "Password Updated Successfully, You'll be logged out in next 5s"
        );
        setPasswordFormData({});
      }
    } catch (error) {
      dispatch(
        updatePasswordFailure(error.message || "Password update failed.")
      );
      setPasswordUpdateSuccess(null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxSizeMB = 2;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (file) {
      setImageFileUploadError(null);
      setImageFileUploadLoadingStatus(null);
      if (file.size > maxSizeBytes) {
        setImageFileUploadError(
          `Error: File size exceeds the limit of ${maxSizeMB} MB`
        );
        return;
      }

      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    setImageFileUploadLoadingStatus(null);
    setImageFileUploadingProgress(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Error: Failed to upload the image. Please try again later."
        );
        setImageFileUploadingProgress(null);
        setImageFileUploadLoadingStatus(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        setImageFileUploadingProgress(null);
        setImageFileUploadLoadingStatus("Image loaded successfully");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilepicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleProfilePictureSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      return;
    }
    if (imageFileUploading) {
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(
        `/api/user/updateprofilepicture/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setImageFileUploadLoadingStatus(null);
        if (res.status === 400) {
          dispatch(
            updateFailure(
              "Error: Bad request. Please check your data and try again."
            )
          );
        } else if (res.status === 401) {
          dispatch(updateFailure("Error: Unauthorized. Please login again."));
        } else if (res.status === 403) {
          dispatch(
            updateFailure(
              "Error: Forbidden. You don't have permission to perform this action."
            )
          );
        } else if (res.status === 404) {
          dispatch(
            updateFailure(
              "Error: Not found. The resource you are trying to update does not exist."
            )
          );
        } else {
          dispatch(
            updateFailure(
              "Error: Failed to update profile picture. Please try again later."
            )
          );
        }
      } else {
        dispatch(updateSuccess(data));
        setImageFileUploadLoadingStatus(null);
        setUpdateProfileSuccess("Profile picture updated successfully.");
      }
    } catch (error) {
      setImageFileUploadLoadingStatus(null);
      dispatch(updateFailure(error.message));
    }
  };

  useEffect(() => {
    let timer;
    if (updateProfileSuccess) {
      timer = setTimeout(() => {
        setUpdateProfileSuccess(null);
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [updateProfileSuccess]);

  useEffect(() => {
    let timer;
    if (passwordUpdateSuccess) {
      timer = setTimeout(() => {
        setPasswordUpdateSuccess(null);
        dispatch(signoutSuccess());
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [passwordUpdateSuccess, dispatch]);

  const handleCancelDeletion = () => {
    setShowDeleteFunction(false);
  };

  const handleConfirmDeletion = async () => {
    setShowDeleteFunction(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div>
      <div className="profile-section-main-container">
        <div className="profile-section-child-container">
          <div className="profile-section-left-container">
            <div className="profile-setting-image-container">
              <h1>Profile</h1>
              <div className="profile-picture-update-container">
                <form
                  className="profile-picture-edit-form"
                  onSubmit={handleProfilePictureSubmit}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={filePickerRef}
                    hidden
                  />
                  {imageFileUploadingProgress && (
                    <div className="image-uploading-indicator">
                      <p>{imageFileUploadingProgress} %</p>
                    </div>
                  )}
                  <img
                    src={imageFileUrl || currentUser.profilepicture}
                    alt=""
                    onClick={() => filePickerRef.current.click()}
                  />
                  <div
                    id="image-edit-icon"
                    onClick={() => filePickerRef.current.click()}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </div>
                  {imageFileUploadError && (
                    <div className="profile-image-failure-alert-section">
                      {imageFileUploadError}
                    </div>
                  )}
                  {imageFileUploadLoadingStatus && (
                    <div className="profile-image-success-alert-section">
                      {imageFileUploadLoadingStatus}
                      <button id="profile-picture-update-button" type="submit">
                        Update
                      </button>
                    </div>
                  )}
                </form>
                <h3>
                  {currentUser.firstname} {currentUser.lastname}
                </h3>
                <h4>{currentUser.email}</h4>
              </div>
            </div>
            <div className="profile-setting-menu-container">
              <Collapsible title="Reset Password">
                <div className="reset-password-form">
                  <div className="collapsible-content-divider"></div>
                  <p>
                    <i className="fa-solid fa-circle-info"></i> Once you reset
                    your password, you will be logged out and will need to log
                    in again.
                  </p>
                  <form
                    className="reset-pass-form"
                    onSubmit={handlePasswordSubmit}
                  >
                    <input
                      type="password"
                      id="currentPassword"
                      placeholder="Current Password"
                      onChange={handlePasswordChange}
                    />
                    <input
                      type="password"
                      id="newPassword"
                      placeholder="New Password"
                      onChange={handlePasswordChange}
                    />
                    <input
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={handlePasswordChange}
                    />
                    <button id="password-reset-button" type="submit">
                      Update
                    </button>
                  </form>
                  {errorPassUpdate && (
                    <div className="password-failure-alert-section">
                      {errorPassUpdate}
                    </div>
                  )}
                </div>
              </Collapsible>

              <Collapsible title="Deactivate Account">
                <div className="account-deactivation-container">
                  <div className="collapsible-content-divider"></div>
                  <p>
                    <i className="fa-solid fa-circle-info"></i> Once your
                    account is deactivated, you will no longer be able to access
                    any data associated with it. Data retrieval will not be
                    possible after deactivation.
                  </p>
                  <p>
                    Warning : Please download your transaction history before
                    deactivating your account.
                  </p>
                  <button onClick={() => setShowDeleteFunction(true)}>
                    Yes, Deactivate
                  </button>
                </div>
              </Collapsible>
            </div>
          </div>

          <div className="profile-section-right-container"></div>
          {updateProfileSuccess && (
            <div className="profile-update-success-popup">
              <i className="fa-solid fa-circle-check"></i>
              <p>{updateProfileSuccess}</p>
            </div>
          )}
          {passwordUpdateSuccess && (
            <div className="profile-update-success-popup">
              <i className="fa-solid fa-circle-check"></i>
              <p>{passwordUpdateSuccess}</p>
            </div>
          )}

          {error && (
            <div className="profile-update-failure-popup">
              <i className="fa-solid fa-circle-xmark"></i>
              <p>{error}</p>
            </div>
          )}

          {showDeleteFunction && (
            <div className="overlay-delete-function">
              <DeleteConfirmationModal
                onCancel={handleCancelDeletion}
                onConfirm={handleConfirmDeletion}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
