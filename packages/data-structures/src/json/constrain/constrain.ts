import { Operation } from "fast-json-patch";

export const constrainActions = (scope: string, actions: Operation[]) => {
    return actions.map(action => {
        switch (action.op) { 
            case 'add':
            case 'remove':
            case 'replace':
            case 'test':        
                return {...action, path: `${scope}/${action.path}`};
            case 'move':
            case 'copy':
                return {...action, from: `${scope}/${action.from}`, path: `${scope}/${action.path}`};
            default:
                throw new Error('Unauthorized');
        }
    })
}