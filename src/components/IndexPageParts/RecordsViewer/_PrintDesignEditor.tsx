import * as React from "react"

interface Config {
    size: string;
    weight: string;
    family: string;
    color: string;
};

interface PrintDesignEditorProps {
    config: Config,
    onConfigChange: (propName: string, propValue: string) => void,
}

export const PrintDesignEditor: React.VFC<PrintDesignEditorProps> = (props) => {
    const selectConfigs = [
        {
            name: "size",
            label: "サイズ",
            options: [
                "3",
                "4",
                "5",
                "6",
                "7",
            ],
            getClassName: (opt: string) => ` is-size-${opt} `,
        },
        {
            name: "weight",
            label: "太さ",
            options: [
                "light",
                "normal",
                "medium",
                "semibold",
                "bold",
            ],
            getClassName: (opt: string) => ` has-text-weight-${opt} `,
        },
        {
            name: "family",
            label: "種類",
            options: [
                "Yu Mincho",
                "MS PMincho",
                "Meiryo",
                "MS PGothic"
            ],
            getStyle: (opt: string) => ({ fontFamily: opt }),
        },
        {
            name: "color",
            label: "文字色",
            options: [
                "black",
                "white",
                "light",
                "dark",
                "primary",
                "link",
                "info",
                "success",
            ],
            getClassName: (opt: string) => ` has-text-${opt} `,
        },
    ];

    function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        props.onConfigChange(event.target.name, event.target.value);
    }

    return (
        <>
            {selectConfigs
                .map(cnf => ({ cnf, crntValue: props.config[cnf.name as keyof Config] }))
                .map(({ cnf, crntValue }) =>
                    <div key={cnf.label} className="column is-narrow">
                        <label className="label">{cnf.label}</label>
                        <div className="select is-large">
                            <select
                                className={cnf.getClassName && cnf.getClassName(crntValue)}
                                style={cnf.getStyle && cnf.getStyle(crntValue)}
                                name={cnf.name}
                                onChange={onSelectChange}
                                value={crntValue}
                            >
                                {cnf.options.map(opt =>
                                    <option
                                        key={opt}
                                        className={cnf.getClassName && cnf.getClassName(opt)}
                                        style={cnf.getStyle && cnf.getStyle(opt)}
                                    >
                                        {opt}
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>
                )}
        </>
    );
}
