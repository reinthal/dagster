// @generated
/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { JobType, JobStatus, PipelineRunStatus, JobTickStatus } from "./../../types/globalTypes";

// ====================================================
// GraphQL fragment: JobStateFragment
// ====================================================

export interface JobStateFragment_repositoryOrigin_repositoryLocationMetadata {
  __typename: "RepositoryMetadata";
  key: string;
  value: string;
}

export interface JobStateFragment_repositoryOrigin {
  __typename: "RepositoryOrigin";
  repositoryLocationName: string;
  repositoryName: string;
  repositoryLocationMetadata: JobStateFragment_repositoryOrigin_repositoryLocationMetadata[];
}

export interface JobStateFragment_jobSpecificData_SensorJobData {
  __typename: "SensorJobData";
  lastRunKey: string | null;
}

export interface JobStateFragment_jobSpecificData_ScheduleJobData {
  __typename: "ScheduleJobData";
  cronSchedule: string;
}

export type JobStateFragment_jobSpecificData = JobStateFragment_jobSpecificData_SensorJobData | JobStateFragment_jobSpecificData_ScheduleJobData;

export interface JobStateFragment_runs {
  __typename: "PipelineRun";
  id: string;
  runId: string;
  pipelineName: string;
  status: PipelineRunStatus;
}

export interface JobStateFragment_ticks {
  __typename: "JobTick";
  id: string;
  status: JobTickStatus;
  timestamp: number;
}

export interface JobStateFragment {
  __typename: "JobState";
  id: string;
  name: string;
  jobType: JobType;
  status: JobStatus;
  repositoryOrigin: JobStateFragment_repositoryOrigin;
  jobSpecificData: JobStateFragment_jobSpecificData | null;
  runs: JobStateFragment_runs[];
  runsCount: number;
  ticks: JobStateFragment_ticks[];
}
