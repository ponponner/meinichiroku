import * as React from "react"
import { getYearth } from "../../../helpers";
import { Record } from "../../../pages";

type OnNewItemChange = (key: string, value: string) => void;
type OnItemChange = (recordId: string, propName: string, propValue: string) => void;
type OnItemsSwap = (itemId: string, diffIdx: number) => void;

interface RecordTableProps {
  newItem: Record,
  onNewItemChange: OnNewItemChange;
  items: Record[],
  onItemAdd: (newItem: Record) => void;
  onItemRemove: (itemId: string) => void;
  onItemChange: OnItemChange;
  onItemsSwap: OnItemsSwap;
}

export const RecordTable: React.VFC<RecordTableProps> = (props) => {

  const [selectedItemId, setSelectedItemId] = React.useState<string | null>(null);

  function onRowSelect(itemId: string) {
    setSelectedItemId(itemId);
  }

  return (
    <div className="RecordTable table-container">
      <table className="RecordTable table is-fullwidth is-narrow is-striped is-hoverable has-sticky-header has-sticky-footer">
        <thead>
          <RecordTableHeadRow />
        </thead>
        <tfoot>
          <RecordTableHeadRow />
        </tfoot>
        <tbody>
          <RecordTableInputRow
            newItem={props.newItem}
            onNewItemPropChange={props.onNewItemChange}
            isSelected={props.newItem.id === selectedItemId}
            onSelect={onRowSelect}
            onItemAdd={props.onItemAdd}
          />
          {[...props.items].reverse().map((item, i) =>
            <RecordTableItemRow
              key={item.id}
              no={props.items.length - i}
              sortUpIsDisabled={i === 0}
              sortDownIsDisabled={i === props.items.length - 1}
              isSelected={item.id === selectedItemId}
              {...item}
              onSelect={onRowSelect}
              onItemRemove={props.onItemRemove}
              onItemPropChange={props.onItemChange}
              onItemsSwap={props.onItemsSwap}
            />
          )}
        </tbody>
      </table>
    </div>
  )
}

const RecordTableHeadRow: React.VFC<{}> = () => {
  return (
    <tr>
      <th></th>
      <th>番号</th>
      <th>姓</th>
      <th>名</th>
      <th>命日</th>
      <th>年目</th>
      <th>備考</th>
      <th>享年</th>
      <th>ID</th>
      <th>追加/削除</th>
    </tr>
  )
}

interface RecordTableInputRowProps {
  newItem: Record;
  onNewItemPropChange: OnNewItemChange;
  isSelected: boolean;
  onSelect: any;
  onItemAdd: (newItem: Record) => void;
}

const RecordTableInputRow: React.VFC<RecordTableInputRowProps> = (props) => {

  function onRowClick() {
    props.onSelect(props.newItem.id)
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.onNewItemPropChange(event.target.name, event.target.value);
  }

  function onClick() {
    props.onItemAdd({ ...props.newItem });
    props.onSelect(props.newItem.id);
  }

  return (
    <tr className={props.isSelected ? 'is-selected' : ''} onClick={onRowClick}>
      <td></td>
      <td></td>
      <td>
        <input
          className="input"
          style={{ width: '6em' }}
          name="surname"
          type="text"
          value={props.newItem.surname}
          onChange={onChange} />
      </td>
      <td>
        <input
          className="input"
          style={{ width: '6em' }}
          name="name"
          type="text"
          value={props.newItem.name}
          onChange={onChange} />
      </td>
      <td>
        <input
          className="input"
          name="date"
          type="date"
          value={props.newItem.date}
          onChange={onChange} />
      </td>
      <td></td>
      <td>
        <input
          className="input"
          style={{ width: '6em' }}
          type="text"
          name="remarks"
          value={props.newItem.remarks}
          onChange={onChange}
        />
      </td>
      <td>
        <input
          className="input"
          style={{ width: '6em' }}
          type="text"
          name="enjoyment"
          value={props.newItem.enjoyment}
          onChange={onChange}
        />
      </td>
      <td>
        {omitRecordId(props.newItem.id)}
      </td>
      <td>
        <button
          className="button is-success"
          type="button"
          onClick={onClick}>
          ＋
        </button>
      </td>
    </tr>
  )
}

interface RecordTableItemRowProps extends Record {
  no: number;
  sortUpIsDisabled: boolean;
  sortDownIsDisabled: boolean;
  isSelected: boolean;
  onSelect: any;
  onItemRemove: (recordId: string) => void;
  onItemPropChange: OnItemChange;
  onItemsSwap: OnItemsSwap;
}

const RecordTableItemRow: React.VFC<RecordTableItemRowProps> = (props) => {

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.onItemPropChange(props.id, event.target.name, event.target.value);
  }

  return (
    <tr
      className={props.isSelected ? 'is-selected' : ''}
      onClick={() => props.onSelect(props.id)}
    >
      <td>
        <button
          className="button is-small"
          type="button"
          disabled={props.sortUpIsDisabled}
          onClick={() => props.onItemsSwap(props.id, 1)}
        >
          <i className="fa-solid fa-sort-up"></i>
        </button>
        <button
          className="button is-small"
          type="button"
          disabled={props.sortDownIsDisabled}
          onClick={() => props.onItemsSwap(props.id, -1)}
        >
          <i className="fa-solid fa-sort-down"></i>
        </button>
      </td>
      <td>{props.no}</td>
      <td>
        {
          props.isSelected ?
            <input
              className="input"
              style={{ width: '6em' }}
              type="text"
              name="surname"
              value={props.surname}
              onChange={onChange}
            /> :
            <span>{props.surname}</span>
        }
      </td>
      <td>
        {
          props.isSelected ?
            <input
              className="input"
              style={{ width: '6em' }}
              type="text"
              name="name"
              value={props.name}
              onChange={onChange}
            /> :
            <span>{props.name}</span>
        }
      </td>
      <td>
        {
          props.isSelected ?
            <input
              className="input"
              type="date"
              name="date"
              value={props.date}
              onChange={onChange}
            /> :
            <span>{props.date}</span>
        }
      </td>
      <td>{getYearth(props.date)}</td>
      <td>{
        props.isSelected ?
          <input
            className="input"
            style={{ width: '6em' }}
            type="text"
            name="remarks"
            value={props.remarks}
            onChange={onChange}
          /> :
          <span>{props.remarks}</span>
      }</td>
      <td>
        {
          props.isSelected ?
            <input
              className="input"
              style={{ width: '6em' }}
              type="text"
              name="enjoyment"
              value={props.enjoyment}
              onChange={onChange}
            /> :
            <span>{props.enjoyment}</span>
        }
      </td>
      <td>{omitRecordId(props.id)}</td>
      <td>
        <button
          className="button is-warning"
          type="button"
          onClick={() => props.onItemRemove(props.id)}
        >
          <span>－</span>
        </button>
      </td>
    </tr>
  )
}

function omitRecordId(recordId: string) {
  return recordId; //.slice(0, 10) + '...';
}
