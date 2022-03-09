import * as React from "react"
import { getYearth } from "../../../helpers";
import { Record } from "../../../pages";

interface RecordsViewerProps {
    records: Record[];
}

export const RecordsViewer: React.VFC<RecordsViewerProps> = (props) => {
    return (
        <div className="RecordsViewer columns is-fullwidth is-flex-direction-row-reverse is-flex-wrap-wrap is-justify-content-flex-start">
            {props.records.map((item, i) =>
                <ul key={i} className="RecordsViewerItem column is-narrow">
                    <li className="mb-6">
                        <div>
                            <span>{`■ ${formatDate(item.date)}`}</span>
                            <span>&emsp;</span>
                            <span>{`${number2kanji(getYearth(item.date))}年目`}</span>
                        </div>
                        <div className="m-3">
                            <span className="mt-6" />
                            {item.surname}
                            <span className="mt-3" />
                            {item.name}
                            <span className="mt-3" />
                            {item.remarks && `(${item.remarks})`}
                            <span className="mt-3" />
                            {item.enjoyment && `(${number2kanji(item.enjoyment)}歳)`}
                        </div>
                    </li>
                </ul>
            )}
        </div>
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
    const day = number2kanji(date.getDay());
    return `${era}${year}年${month}月${day}日`;
}
