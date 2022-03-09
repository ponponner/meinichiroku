import * as React from "react"

interface DownloadButtonProps {
  createSaveData: () => any;
  fileName: string;
  children: React.ReactNode;
}

export const DownloadButton: React.VFC<DownloadButtonProps> = (props) => {
  function handleClick() {
    const blob = new Blob(
      [JSON.stringify(props.createSaveData(), null, '  ')],
      { type: 'text/json;charset=utf-8' }
    )
    const blobUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.target = '_blank';
    anchor.download = props.fileName;
    anchor.click();
    URL.revokeObjectURL(blobUrl);
  }

  return (
    <button
      className="button is-info"
      type="button"
      onClick={handleClick}
    >
      {props.children}
    </button>
  )
}

