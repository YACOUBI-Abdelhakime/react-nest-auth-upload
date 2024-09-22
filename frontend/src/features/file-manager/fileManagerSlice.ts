import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./types/FileManagerState";
import {
  deleteFile,
  downloadFile,
  getFilesData,
  renameFile,
  uploadFile,
} from "./asyncThunks";

const initialState: UserState = {
  files: [],
  isLoading: false,
};

const userSlice = createSlice({
  name: "fileManagerReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Upload file
      .addCase(uploadFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.files.push(action.payload);
      })
      .addCase(uploadFile.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      }) // Download file
      .addCase(downloadFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(downloadFile.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(downloadFile.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      })
      // Get files data
      .addCase(getFilesData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFilesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.files = action.payload;
      })
      .addCase(getFilesData.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      })
      // Rename file
      .addCase(renameFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(renameFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.files = state.files.map((file) => {
          if (file._id === action.payload._id) {
            return action.payload;
          }
          return file;
        });
      })
      .addCase(renameFile.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      })
      // Delete file
      .addCase(deleteFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.files = state.files.filter((file) => {
          return file._id !== action.payload._id;
        });
      })
      .addCase(deleteFile.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
