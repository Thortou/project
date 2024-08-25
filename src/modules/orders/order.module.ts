import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { PartitionService } from "./partition/partition.service";

@Module({
    controllers: [OrderController],
    providers: [OrderService, PartitionService]
})
export class OrderModule {}