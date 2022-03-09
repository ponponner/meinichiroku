import * as React from "react";
import { getDateAsISOLocalString } from "../helpers";

interface ErrorBoundaryProps {
}

interface ErrorBoundaryState {
    error: Error | null;
    errorInfo?: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        const log = {
            error,
            errorInfo,
        };
        const blob = new Blob(
            [JSON.stringify(log, null, '  ')],
            { type: 'text/json;charset=utf-8' }
        )
        const blobUrl = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = blobUrl;
        anchor.target = '_blank';
        anchor.download = `命日録_log_error_${getDateAsISOLocalString()}.json`;
        anchor.click();
        URL.revokeObjectURL(blobUrl);
    }

    render() {
        return (
            <>
                {this.state.error
                    ? (
                        <div>
                            <h1 className="box is-warning">エラーが発生しました、作業を中断してください.</h1>
                        </div>
                    )
                    : (
                        this.props.children
                    )
                }
            </>
        );
    }
}
