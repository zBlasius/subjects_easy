import { Router } from "express";

async function main() {
  console.log("Starting video conversion task...");

  // ffmpeg processing here

  console.log("Video conversion finished");
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("Video conversion failed", err);
    process.exit(1);
  });

  // - Lambda triggering to ECS Task is working, the code present in ECS tasks is this one here.
  // After is done, you should deploy it to ECR in order to be able to run it in ECS.