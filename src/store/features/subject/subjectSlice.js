import axios from "axios";
import { subjects_url, upload_url } from "../../../utils/urls";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define an async thunk
export const readSubjects = createAsyncThunk(
  "subject/readSubjects",
  async () => {
    try {
      const response = await axios.get(subjects_url);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createSubject = createAsyncThunk(
  "subject/createSubject",
  async (problem) => {
    const pdf_file = problem.pdf_file;
    const title = problem.title;
    const content = problem.content;
    console.log("problem", problem);

    if ((pdf_file == "") | (title == "") | (content == "")) return;
    const formData = new FormData();
    formData.append("file", pdf_file);

    try {
      let upload_res = await axios.post(upload_url, formData);

      console.log("upload_res", upload_res);
      if (upload_res.status == false) return;

      let subject_res = await axios.post(subjects_url, {
        title: title,
        content: content,
      });

      console.log(subject_res.data.status);
      return subject_res.data.status;
    } catch (error) {
      console.log(error);
    }
  }
);

export const subjectSlice = createSlice({
  name: "subject",
  initialState: {
    subjects: [],
    status: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(readSubjects.pending, (state) => {
        state.status = "loading";
        console.log("loading");
      })
      .addCase(readSubjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subjects = action.payload;
        console.log("succeeded");
      })
      .addCase(readSubjects.rejected, (state) => {
        state.status = "failed";
      });

    builder
      .addCase(createSubject.pending, (state) => {
        state.status = "loading";
        console.log("loading");
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.status = "Create Subjects successfully.";
        // state.subjects = action.payload;
        console.log(state.status);
      })
      .addCase(createSubject.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default subjectSlice.reducer;
