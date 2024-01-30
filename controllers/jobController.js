import { StatusCodes } from "http-status-codes";
import { nanoid } from "nanoid";
import Job from "../models/JobModel.js";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "back-end" },
];

// // GET all jobs (hard-coded nanoid json)
// export const getAllJobs = async (req, res) => {
//   res.status(StatusCodes.OK).json({ jobs });
// };
// GET all jobs (mongo)
export const getAllJobs = async (req, res) => {
  console.log(req.user);
  const jobs = await Job.find({ createdBy: req.user.userId }); // only the users jobs
  res.status(StatusCodes.OK).json({ jobs }); // 200
};

// // GET a single job (hard-coded nanoid json)
// export const getJob = async (req, res) => {
//   const { id } = req.params;
//   const job = jobs.find((job) => job.id === id);
//   if (!job) {
//     return res.status(404).json({ msg: `No job with id ${id} found` });
//   }
//   res.status(StatusCodes.OK).json({ job });
// };
// GET a single job (mongo)
export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job }); // 200
};

// // POST a new job (hard-coded nanoid json)
// export const createJob = async (req, res) => {
//   const { company, position } = req.body;
//   if (!company || !position) {
//     return res.status(400).json({ msg: "Please provide company and position" });
//   }
//   const id = nanoid(10);
//   const job = { id, company, position };
//   jobs.push(job);
//   res.status(StatusCodes.CREATED).json({ job });
// };
// POST a new job (mongo)
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job }); // 201
};

// // EDIT a job (hard-coded nanoid json)
// export const editJob = async (req, res) => {
//   const { company, position } = req.body;
//   if (!company || !position) {
//     return res.status(400).json({ msg: "Please provide company and position" });
//   }
//   const { id } = req.params;
//   const job = jobs.find((job) => job.id === id);
//   if (!job) {
//     return res.status(404).json({ msg: `No job with id ${id} found` });
//   }
//   job.company = company;
//   job.position = position;
//   res.status(StatusCodes.OK).json({ msg: "Job modified successfully", job });
// };
// EDIT a job (mongo)
export const editJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res
    .status(StatusCodes.OK) // 200
    .json({ msg: "Job modified successfully", job: updatedJob });
};

// // DELETE a job (hard-coded nanoid json)
// export const deleteJob = async (req, res) => {
//   const { id } = req.params;
//   const job = jobs.find((job) => job.id === id);
//   if (!job) {
//     return res.status(404).json({ msg: `No job with id ${id} found` });
//   }
//   const newJobs = jobs.filter((job) => job.id !== id);
//   jobs = newJobs;
//   res.status(StatusCodes.OK).json({ msg: "Job deleted successfully" });
// };
// DELETE a job (mongo)
export const deleteJob = async (req, res) => {
  const deletedJob = await Job.findByIdAndDelete(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ msg: "Job deleted successfully", job: deletedJob }); // 200
};
