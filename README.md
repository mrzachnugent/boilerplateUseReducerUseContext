# Combining useReducer and useContext Boilerplate

## Description

This boilerplate will help save time if you decide to combine useReducer and useContext for your application.

## The Goal

Copy the boilerplate, adjust your inital state, add appReducer cases and you're ready to access state anywhere in your application.

## How to get stated

<i>If you are not using TypeScript, you can remove all the `types`, `interfaces`, `: FC`, and prop types in functions (ex: ` : StoreStateProps` or `<StoreStateProps>`).</i>
<br><br>

1. Add dependency: <br>

   - yarn add lodash <br>
   - For TypeScript : yarn add --dev @types/lodash

2. Copy [reducer.ts](./src/reducer.ts) and [AppContext.tsx](./src/AppContext.tsx) or just the [OnePager.tsx](./src/OnePager.tsx) into your porject.

3. Wrap your app component (or content of your app component) with

```
<AppProvider>
    <App />
</AppProvider>
```

3. Configure your storeState (and StoreStateProps for TypeScript) <br>
   Rename the keys and values of your `storeState`. <br>
   If your `storeState` object has only 1 level of depth skip Number 4

4. For each level/depth (object within an object), you will need to create it's own `appReducer` cases, interface and add instance to storeState.

5. To access the whole storeState, in your components, use the custom hook:

```
const state = useAppState();
```

6. To access nested object in storeState (user for example):

```
const { user } = useAppState();

```

7. To update the storeState:

```
const dispatch = useDispatch();

dispatch({
    type: "updateGlobal",
    fieldName: "count",
    payload: count + 1,
  });
```

8. To add or update the storeState (let's say you don't know if value already exists):

```
const dispatch = useDispatch();

dispatch({
    type: "addOrUpdateGlobal",
    fieldName: "count",
    payload: count + 1,
  });
```

9. Very similar for user state:

```
const dispatch = useDispatch();

dispatch({
    type: "updateUser",
    fieldName: "isLoggedIn",
    payload: true,
  });
```

## Performance

Using useReducer and useContext can impact your app's performance. The senarios below explain how it affects re-renders. If you can't feel your app slowing down, you don't need to optimize the code with `React.memo`.

### Example :

You have 4 components:

- `Parent`
- `Child`
- `InnerChild`
- `InnerInnerChild` or `sibling` (same result)

### <strong>`InnerChild` is using context to access glabal state and dispatch</strong>

## Senario 1

None of the other components are calling global state or dispatch from context.<br>
`InnerChild` and `InnerInnerChild` will be re-rendered when something in global state is changed.

### What can you do?

To avoid the re-rendering of `InnerInnerChild`, wrap it with `React.memo`.

Ex:

```
const InnerInnerChild = React.memo(() => {
    return <p>Inner Inner Child</p>;
  });
```

## Senario 2

`Parent` is using context to access glabal state and dispatch.
When something in global state is changed, it will cause both `Parent` and `InnerChild` to re-render, even if they want to access different values. <br>
It will also cause the `Child`component to re-render. If `InnerInnerChild` is not wrapped with React.memo, it will re-render at the same time.

### What can you do?

You can wrap `Child` and `InnerInnerChild` with `React.memo`. This will prevent them from re-rendering.
If you were to wrap `Parent` and/or `InnerChild`, it will have no effect.
