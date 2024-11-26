import "reflect-metadata";
import {App} from "./app"

function logMemoryUsage(location: string) {
  const memoryUsage = process.memoryUsage();
  console.log(`[${location}] Memory Usage:`);
  console.log(`  RSS: ${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Heap Total: ${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Heap Used: ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  External: ${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`);
}


async function main(){
  logMemoryUsage("initialize the App - A")
  new App();
  logMemoryUsage("initialize the App - B")
}

main();