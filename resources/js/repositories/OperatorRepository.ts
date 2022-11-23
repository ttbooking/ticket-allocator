import { Repository } from "pinia-orm";
import Operator from "@/models/Operator";

export default class OperatorRepository extends Repository {
    use = Operator;
}
