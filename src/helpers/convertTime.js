import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function convertTime(date) {
    return dayjs(date).fromNow();
}

export function formatDate(date) {
    return dayjs(date).format('hh:mm A')
}