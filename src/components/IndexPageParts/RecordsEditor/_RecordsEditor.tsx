import * as React from "react"
import { RecordTable } from "./_RecordTable";
import { UploadButton } from "./_UploadButton";
import { DownloadButton } from "./_DownloadButton";
import { Record } from "../../../pages";

interface RecordsEditorProps {
  newRecord: Record;
  onNewRecordPropChange: any;
  records: Record[];
  onRecordsInitialize: any;
  onRecordsClear: any;
  onRecordAdd: any;
  onRecordRemove: any;
  onAppDataUpload: any;
  onRecordPropChange: any;
  createSaveData: any;
  saveFileName: string;
}

export const RecordsEditor: React.VFC<RecordsEditorProps> = (props) => {

  const [filterWord, setFilterWord] = React.useState('');

  function onFilterIptChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFilterWord(event.target.value);
  }

  function filterItems(items: Record[], filterWord: string): Record[] {
    const trimed = filterWord.trim();
    if (trimed === '') {
      return items;
    }
    return items.filter(item => Object.values(item).some(value => value.toString().includes(filterWord)));
  }

  const filteredItems = filterItems(props.records, filterWord);

  const {
    newRecord,
    onNewRecordPropChange: handleNewRecordChange,
    records,
    onRecordsInitialize,
    onRecordsClear,
    onRecordAdd: handleRecordAdd,
    onRecordRemove: handleRecordRemove,
    onRecordPropChange: handleRecordChange,
    onAppDataUpload: handleAppDataUpload,
    createSaveData,
    saveFileName,
  } = props;
  return (
    <>
      <div className="columns">
        <div className="column is-narrow">
          <div className="control has-icons-left">
            <input
              className="input is-round"
              type="text"
              placeholder="絞り込み..."
              value={filterWord}
              onChange={onFilterIptChange}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-magnifying-glass"></i>
            </span>
            <span>{`結果： ${filteredItems.length} / ${records.length} 件`}</span>
          </div>
        </div>
        <div className="column"></div>
        <div className="column is-narrow">
          <UploadButton onUpload={handleAppDataUpload}>
            <strong>命日録を読込む</strong>
          </UploadButton>
        </div>
        <div className="column is-narrow">
          <DownloadButton
            createSaveData={createSaveData}
            fileName={saveFileName}
          >
            <strong>命日録を保存する</strong>
          </DownloadButton>
        </div>
      </div>

      <RecordTable
        newItem={newRecord}
        onNewItemChange={handleNewRecordChange}
        items={filteredItems}
        onItemAdd={handleRecordAdd}
        onItemRemove={handleRecordRemove}
        onItemChange={handleRecordChange}
      />

      <div className="columns">
        <div className="column">
        </div>
        <div className="column is-narrow">
          <button className="button is-danger" onClick={onRecordsInitialize}>
            <strong>テストデータ</strong>
          </button>
        </div>
        <div className="column is-narrow">
          <button className="button is-danger" onClick={onRecordsClear}>
            <strong>全消去</strong>
          </button>
        </div>
      </div>
    </>
  );
}
