import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import logger from "./logger";
import { AppModule } from "./app.module";
import overrideBigNumberToJson from "./utils/overrideBigNumberToJson";

overrideBigNumberToJson();

async function bootstrap() {
  process.on("uncaughtException", function (error) {
    logger.error(error.message, error.stack, "UnhandledExceptions");
    process.exit(1);
  });

  const app = await NestFactory.create(AppModule, {
    logger,
  });

  const configService = app.get(ConfigService);
  app.enableShutdownHooks();
  await app.listen(configService.get("port"));

  logger.log("Server is listening on " + configService.get("port"));
}

bootstrap();
