import { OrderEntity } from "src/modules/orders/entities/order.entity";
import { userEntitys } from "../../../../modules/users/entities";

export const models = [
    ...userEntitys,
    OrderEntity
]