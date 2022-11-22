import { createPinia } from "pinia";
import { createORM } from "pinia-orm";
import { PiniaColadaPlugin } from "colada-plugin";

export default createPinia().use(createORM()).use(PiniaColadaPlugin);
