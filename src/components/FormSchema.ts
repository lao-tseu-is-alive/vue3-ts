type PositiveNumbers<T extends number> =
    number extends T
        ? never
        : `${T}` extends `-${string}` | `${string}.${string}`
            ? never
            : T;


export enum basicSchemaTypes {
    boolean = "boolean",
    integer = "integer",
    number = "number",
    string = "string"
}

//https://swagger.io/docs/specification/data-models/data-types/#numbers
export enum numberValidFormatValues {
    float = "float",
    double = "double",
}

export enum integerValidFormatValues {
    int32 = "int32",
    int64 = "int64",
}

// https://swagger.io/docs/specification/data-models/data-types/#string
export enum stringValidFormatValues {
    date = "date",
    datetime = "datetime",
    time = "time",
    email = "email",
    text = "text"
}

function isPositiveInterval(val: number): boolean {
    return val >= 0;
}

type numberConstraints = {
    minimum?: number;
    maximum?: number;
}

export type fieldInfoBoolean = {
    title: string;
    type: basicSchemaTypes.boolean;
}
export type fieldInfoInteger = numberConstraints & {
    title: string;
    type: basicSchemaTypes.integer;
    format?: integerValidFormatValues;
}
export type fieldInfoNumber = numberConstraints & {
    title: string;
    type: basicSchemaTypes.number;
    format: numberValidFormatValues;
}
export type fieldInfoString = {
    title: string;
    type: basicSchemaTypes.string;
    format?: stringValidFormatValues;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
}

export type fieldInfo = fieldInfoBoolean | fieldInfoInteger | fieldInfoNumber | fieldInfoString;


/*
<input type="date">
<input type="datetime-local">
<input type="time">
<input type="email">
<input type="text">

<input type="button">
<input type="checkbox">
<input type="color">
<input type="file">
<input type="hidden">
<input type="image">
<input type="month">
<input type="number">
<input type="password">
<input type="radio">
<input type="range">
<input type="reset">
<input type="search">
<input type="submit">
<input type="tel">
<input type="url">
<input type="week">

 */
type GetValidFormatExtractFieldType<T> = T extends { type: infer U } ? T["type"] : never
