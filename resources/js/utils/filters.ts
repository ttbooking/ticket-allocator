import dayjs from "dayjs";

export default {
    timestamp: (date: Date) => {
        const dt = dayjs(date);

        return dt.isBefore(Date.now(), "day")
            ? `${dt.format("L LT")} (${dt.fromNow()})`
            : `${dt.format("LT")} (${dt.fromNow()})`;
    },
};
