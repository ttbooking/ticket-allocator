import { Query as BaseQuery, Repository as BaseRepository, Model } from "pinia-orm";

export class Query<M extends Model = Model> extends BaseQuery<M> {
    increment(record: Record<keyof M, number>) {
        return this.incrementOrDecrement(record, true);
    }

    decrement(record: Record<keyof M, number>) {
        return this.incrementOrDecrement(record, false);
    }

    private incrementOrDecrement(record: Record<keyof M, number>, increment: boolean) {
        const models = this.get(false);
        if (models.length === 0) return [];
        const newModels = models.map((model) => {
            const newRecord = model.$getAttributes();
            for (const key in record) {
                if (Object.prototype.hasOwnProperty.call(newRecord, key) && typeof newRecord[key] === "number") {
                    increment ? (newRecord[key] += record[key]) : (newRecord[key] -= record[key]);
                }
            }
            return this.hydrate(newRecord);
        });
        this.commit("update", this.compile(newModels));
        return newModels;
    }
}

export class Repository<M extends Model = Model> extends BaseRepository<M> {
    query() {
        return new Query(this.database, this.getModel(), this.queryCache, this.hydratedData, this.pinia);
    }
}
