"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const videoKey = process.env.VIDEO_KEY;
const userId = process.env.USER_ID;
const outputBucket = process.env.OUTPUT_BUCKET;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Starting video conversion task...");
        // ffmpeg processing here
        console.log("Video conversion finished");
    });
}
main()
    .then(() => {
    console.log("Video conversion task completed successfully");
    console.log(`Video Key: ${videoKey}`);
    console.log(`User ID: ${userId}`);
    console.log(`Output Bucket: ${outputBucket}`);
    process.exit(0);
})
    .catch((err) => {
    console.error("Video conversion failed", err);
    console.log(`ERR Video Key: ${videoKey}`);
    console.log(`ERR User ID: ${userId}`);
    console.log(`ERR Output Bucket: ${outputBucket}`);
    process.exit(1);
});
// - Lambda triggering to ECS Task is working, the code present in ECS tasks is this one here.
// After is done, you should deploy it to ECR in order to be able to run it in ECS.
