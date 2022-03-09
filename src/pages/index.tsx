import { nanoid } from "nanoid";
import * as React from "react"
import { RecordsEditor } from "../components/IndexPageParts/RecordsEditor";
import { RecordsViewer } from "../components/IndexPageParts/RecordsViewer";
import { TabBodies, TabBody, TabHead, TabHeads } from "../components/Tabs";
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import "../styles/index.scss"

export interface AppData {
  records: Record[];
}

export interface Record {
  id: string;
  surname: string;
  name: string;
  date: string;
  remarks?: string;
  enjoyment?: number;
}

const APP_TITLE = '命日録';
const LOCAL_STORAGE_KEY_RECORDS = 'records';
const DEBUG_INITIAL_RECORDS: Record[] = [
  // 0 : 9
  { surname: '佐藤', name: '太郎', date: new Date(), remarks: "友人", enjoyment: 99 },
  { surname: '鈴木', name: '花子', date: new Date() },
  { surname: '佐藤', name: '太郎', date: new Date() },
  { surname: '鈴木', name: '花子', date: new Date() },
  { surname: '佐藤', name: '太郎', date: new Date() },
  { surname: '鈴木', name: '花子', date: new Date() },
  { surname: '佐藤', name: '太郎', date: new Date() },
  { surname: '鈴木', name: '花子', date: new Date() },
  { surname: '佐藤', name: '太郎', date: new Date() },
  { surname: '鈴木', name: '花子', date: new Date() },
  // 10 : 19
  { surname: '佐藤', name: '太郎', date: new Date() },
  { surname: '鈴木', name: '花子', date: new Date() },
  { surname: '佐藤', name: '太郎', date: new Date() },
  { surname: '鈴木', name: '花子', date: new Date() },
  { surname: '佐藤', name: '太郎', date: new Date() },
  { surname: '鈴木', name: '花子', date: new Date() },
  { surname: '佐藤', name: '太郎', date: new Date() },
  { surname: '鈴木', name: '花子', date: new Date() },
  { surname: '佐藤', name: '太郎', date: new Date() },
  { surname: '鈴木', name: '花子', date: new Date() },
  // 20 : 29
  { surname: '佐藤', name: '太郎', date: new Date() },
  { surname: '鈴木', name: '花子', date: new Date() },
  { surname: '佐藤', name: '太郎', date: new Date() },
  { surname: '鈴木', name: '花子', date: new Date() },
  { surname: '佐藤', name: '太郎', date: new Date() },
  { surname: '鈴木', name: '花子', date: new Date() },
  { surname: '佐藤', name: '太郎', date: new Date() },
  { surname: '鈴木', name: '花子', date: new Date() },
  { surname: '佐藤', name: '太郎', date: new Date() },
  { surname: '鈴木', name: '花子', date: new Date() },
  // 30 : 39
  { surname: '佐藤', name: '太郎', date: new Date() },
  { surname: '鈴木', name: '花子', date: new Date() },
  { surname: '佐藤', name: '太郎', date: new Date() },
  { surname: '鈴木', name: '花子', date: new Date() },
  { surname: '佐藤', name: '太郎', date: new Date() },
  { surname: '鈴木', name: '花子', date: new Date() },
  { surname: '佐藤', name: '太郎', date: new Date() },
  { surname: '鈴木', name: '花子', date: new Date() },
  { surname: '佐藤', name: '太郎', date: new Date() },
  { surname: '鈴木', name: '花子', date: new Date() },
].map(x => ({
  ...x,
  id: nanoid(),
  date: formatDate(x.date),
}));
const EXPORT_DATA_FILE_NAME = '命日録.json';

const IndexPage: React.VFC<void> = () => {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(1);
  const [newRecord, setNewRecord] = React.useState(createNewRecorde);
  const [records, setRecords] = React.useState(loadDataFromLocalStorage);

  function onTabSelect(tabId: number) {
    setSelectedTabIndex(tabId);
  }

  function onNewRecordPropChange(propName: string, propValue: string | number) {
    setNewRecord(prev => ({
      ...prev,
      [propName]: propValue,
    }));
  }

  function onRecordsInitialize() {
    setRecords([...DEBUG_INITIAL_RECORDS.map(x => ({ ...x }))]);
  }

  function onRecordsClear() {
    setRecords([]);
  }

  function onRecordAdd(newRecord: Record) {
    setRecords(prev => [newRecord, ...prev]);
    setNewRecord(createNewRecorde());
  }

  function onRecordRemove(recordId: string) {
    setRecords(prev => prev.filter(x => x.id !== recordId));
  }

  function onRecordPropChange(recordId: string, propName: string, propValue: string | number) {
    if (!records.find(x => x.id === recordId)) {
      throw new Error(`The record not found. (record.id: ${recordId})`);
    }
    setRecords(prev => prev.map(record => {
      if (record.id !== recordId) {
        return record;
      }
      return {
        ...record,
        [propName]: propValue,
      };
    }));
  }

  function createSaveData(): AppData {
    return {
      records: records
    };
  }

  function onAppDataUpload(appData: AppData) {
    setRecords(appData.records);
  }

  React.useEffect(() => {
    saveDataToLocalStorage(records);
  }, [records]);

  return (
    <>
      <header className="IndexHeader header has-background-light">
        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <h1 className="navbar-item title">{APP_TITLE}</h1>
          </div>
        </nav>
        <TabHeads
          selectedTabIndex={selectedTabIndex}
          onTabSelect={onTabSelect}
        >
          <TabHead>編集する</TabHead>
          <TabHead>印刷する</TabHead>
        </TabHeads>
      </header>
      <main className="container is-fluid is-fullheight">
        <TabBodies selectedTabIndex={selectedTabIndex}>
          <TabBody>
            <div className="mt-3" />
            <RecordsEditor
              {...{
                newRecord,
                onNewRecordPropChange: onNewRecordPropChange,
                records,
                onRecordsInitialize,
                onRecordsClear,
                onRecordAdd,
                onRecordRemove,
                onRecordPropChange: onRecordPropChange,
                onAppDataUpload,
                createSaveData,
                saveFileName: EXPORT_DATA_FILE_NAME,
              }} />
          </TabBody>
          <TabBody>
            <div className="mt-5" />
            <RecordsViewer records={records} />
          </TabBody>
        </TabBodies>
      </main>
    </>
  );
}

function formatDate(date: Date) {
  function leftPadding(value: string | number, chara: string, length: number) {
    let s = '' + value;
    for (let i = s.length; i < length; i++) {
      s = chara + s;
    }
    return s;
  }
  const chara = "0";
  const year = leftPadding(date.getFullYear(), chara, 4);
  const month = leftPadding(date.getMonth() + 1, chara, 2);
  const day = leftPadding(date.getDate(), chara, 2);
  return `${year}-${month}-${day}`;
}

function createNewRecorde(): Record {
  return {
    id: nanoid(),
    surname: '',
    name: '',
    date: formatDate(new Date()),
    remarks: undefined,
    enjoyment: undefined,
  }
}

function loadDataFromLocalStorage(): Record[] {
  const recordsJSON = localStorage.getItem(LOCAL_STORAGE_KEY_RECORDS);
  if (recordsJSON) {
    return JSON.parse(recordsJSON) as Record[];
  }
  return [];
}

function saveDataToLocalStorage(records: Record[]) {
  const recordsJSON = JSON.stringify(records);
  localStorage.setItem('records', recordsJSON);
}

export default IndexPage;
