import { categories } from "../../constants/categories";

export const getJobImage = (jobType) => {
  for (const category of categories) {
    const job = category.jobs.find((job) => job.title === jobType);
    if (job) {
      return job.img;
    }
  }
  return "";
};
