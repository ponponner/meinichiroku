import * as React from "react"
import { getYearth } from "../../../helpers";
import { Record } from "../../../pages";

interface RecordsViewerProps {
    records: Record[];
}

export const RecordsViewer: React.VFC<RecordsViewerProps> = (props) => {
    return (
        <ul
            className={[
                "RecordsViewer",
                "mr-6",
                "mb-6",
            ].join(" ")}
        >
            {props.records.map((item, i) =>
                <RecordsViewerItem key={i} {...{ item }} />
            )}
        </ul>
    );
}

interface RecordsViewerItemProps {
    item: Record;
}

const RecordsViewerItem: React.VFC<RecordsViewerItemProps> = ({ item }) => {
    return (
        <li className={[
            "RecordsViewerItem",
            "mt-6",
            "ml-5",
        ].join(' ')}>
            <div>
                <span>{`■ ${formatDate(item.date)}`}</span>
                <span>&emsp;</span>
                <span>{`${number2kanji(getYearth(item.date))}年目`}</span>
            </div>
            <div className="ml-1"></div>
            <div>
                <span>&emsp;&emsp;&emsp;</span>
                {item.surname}
                <span className="mt-3" />
                {item.name}
                <span className="mt-3" />
                {item.remarks && `(${item.remarks})`}
                <span className="mt-3" />
                {item.enjoyment && `(${number2kanji(item.enjoyment)}歳)`}
            </div>
        </li>
    );
}

const nkMap = [
    "〇",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
];

function number2kanji(value: number | string): string {
    return ('' + value).split('').map(x => nkMap[Number(x)]).join("");
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const ey = date.toLocaleDateString('ja-JP-u-ca-japanese', { era: "long", year: "2-digit" });
    const era = ey.slice(0, 2);
    const year = number2kanji(ey.slice(2, 4));
    const month = number2kanji(date.getMonth() + 1);
    const day = number2kanji(date.getDate());
    return `${era}${year}年${month}月${day}日`;
}
