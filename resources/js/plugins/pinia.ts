import { createPinia } from "pinia";
import { createORM } from "pinia-orm";

export default createPinia().use(createORM());
