import { nanoid } from "nanoid";
import { toRecordDate } from "../helpers";
import { Record } from "../pages";

export const APP_TITLE = '命日録';

export const LOCAL_STORAGE_KEY_RECORDS = 'records';
export const LOCAL_STORAGE_KEY_PRINT_DESIGN_CONFIG = 'print-design-config';

export const EXPORT_DATA_FILE_NAME = '命日録';

export const DEBUG_INITIAL_RECORDS: Record[] = Array(100).fill(null).map((_, i) => ({
    id: nanoid(),
    surname: ('0' + (i + 1)).slice(-2).toString(),
    name: "太郎",
    date: toRecordDate(new Date()),
    remarks: "友人",
    enjoyment: 99,
}))
