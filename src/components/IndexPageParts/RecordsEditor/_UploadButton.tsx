import * as React from "react"

interface UploadButtonProps {
  onUpload: (data: any) => void;
  children: React.ReactNode;
}

export const UploadButton: React.VFC<UploadButtonProps> = (props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleClick() {
    inputRef.current?.click();
  }
  async function handleChange() {
    const file = inputRef.current?.files?.item(0);
    if (!file) {
      return;
    }
    const json = await file.text();
    const data = JSON.parse(json);
    props.onUpload(data);
  }

  return (
    <span>
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        hidden
      />
      <button
        className="button is-info"
        type="button"
        onClick={handleClick}
      >
        {props.children}
      </button>
    </span>
  )
}

