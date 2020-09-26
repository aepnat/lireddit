import {FieldError} from "../generated/graphql";

export const toErrorMap = (errors: FieldError[]) => {
    const errorMap: Record<string, string> = {};
    errors.forEach(({fields, message}) => {
        errorMap[fields] = message;
    })

    return errorMap;
}