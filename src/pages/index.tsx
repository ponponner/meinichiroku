import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import "../styles/index.scss"

import { APP_TITLE, DEBUG_INITIAL_RECORDS, EXPORT_DATA_FILE_NAME, LOCAL_STORAGE_KEY_RECORDS } from "../consts";
import { appVersion, getDateAsISOLocalString, toRecordDate } from "../helpers";

import { nanoid } from "nanoid";
import * as React from "react"
import { RecordsEditor } from "../components/IndexPageParts/RecordsEditor";
import { RecordsViewer } from "../components/IndexPageParts/RecordsViewer";
import { TabBodies, TabBody, TabHead, TabHeads } from "../components/Tabs";
import { ErrorBoundary } from "../components/ErrorBoundary";

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

const IndexPage: React.VFC<void> = () => {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
  const [newRecord, setNewRecord] = React.useState(createNewRecorde);
  const [records, setRecords] = React.useState<Record[]>([]);

  function onTabSelect(tabId: number) {
    setSelectedTabIndex(tabId);
  }

  function onNewRecordPropChange(propName: string, propValue: string | number) {
    setNewRecord(prev => ({
      ...prev,
      [propName]: propValue,
    }));
  }

  function onRecordsStoreDebugData() {
    setRecords([...DEBUG_INITIAL_RECORDS.map(x => ({ ...x }))]);
  }

  function onRecordsClear() {
    setRecords([]);
  }

  function onRecordAdd(newRecord: Record) {
    setRecords(prev => [...prev, newRecord]);
    let ph: Record;
    do {
      ph = createNewRecorde();
    } while (records.some(x => x.id === ph.id));
    setNewRecord(ph);
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

  function onRecordsSwap(recordId: string, diffIdx: number) {
    setRecords(prev => {
      let idxA = prev.findIndex(x => x.id === recordId);
      let idxB = idxA + diffIdx;
      [idxA, idxB] = [idxA, idxB].sort((a, b) => a - b);
      if ([idxA, idxB].some(idx => (idx < 0 || prev.length <= idx))) {
        return prev;
      }
      return [
        ...prev.slice(0, idxA),
        prev[idxB],
        ...prev.slice(idxA + 1, idxB),
        prev[idxA],
        ...prev.slice(idxB + 1),
      ];
    });
  }

  function createSaveData(): AppData {
    return {
      records: records
    };
  }

  function createSaveFileName(): string {
    return `${EXPORT_DATA_FILE_NAME}_${getDateAsISOLocalString()}.json`
  }

  function onAppDataUpload(appData: AppData) {
    setRecords(appData.records);
  }

  React.useEffect(() => {
    const recordsJSON = localStorage.getItem(LOCAL_STORAGE_KEY_RECORDS);
    if (!recordsJSON) {
      return;
    }
    setRecords(JSON.parse(recordsJSON) as Record[]);
  }, []);

  React.useEffect(() => {
    const recordsJSON = JSON.stringify(records);
    localStorage.setItem('records', recordsJSON);
  }, [records]);

  return (
    <>
      <ErrorBoundary>
        <header className="IndexHeader header has-background-light">
          <nav className="navbar is-transparent">
            <div className='is-flex-direction-row'>
              <div className="navbar-brand">
                <h1 className="navbar-item title pr-2">{APP_TITLE}</h1>
                <span className='navbar-item mb-4 pl-0 pb-0'>{`ver.${appVersion}`}</span>
              </div>
            </div>
          </nav>
          <TabHeads
            selectedTabIndex={selectedTabIndex}
            onTabSelect={onTabSelect}
          >
            <TabHead>編集する</TabHead>
            <TabHead>印刷する</TabHead>
          </TabHeads>
          <div className="mt-5" />
        </header>
        <main className="container is-fluid is-fullheight">
          <TabBodies selectedTabIndex={selectedTabIndex}>
            <TabBody>
              <RecordsEditor
                {...{
                  newRecord,
                  onNewRecordPropChange,
                  records,
                  onRecordsStoreDebugData,
                  onRecordsClear,
                  onRecordAdd,
                  onRecordRemove,
                  onRecordPropChange,
                  onRecordsSwap,
                  onAppDataUpload,
                  createSaveData,
                  createSaveFileName,
                }} />
            </TabBody>
            <TabBody>
              <RecordsViewer records={records} />
            </TabBody>
          </TabBodies>
        </main>
      </ErrorBoundary>
    </>
  );
}

function createNewRecorde(): Record {
  return {
    id: nanoid(),
    surname: '',
    name: '',
    date: toRecordDate(new Date()),
    remarks: undefined,
    enjoyment: undefined,
  }
}

export default IndexPage;
