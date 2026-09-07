# Slide

[Speaker Deck](https://speakerdeck.com/ken7253)

## Command

The following command will launch an interactive prompt.

- crete new slide `npm run new`
- preview slide `npm run dev`
- build slide `npm run build`
- export pdf file `npm run export`

### Without prompt

Passing `-w` (`--workspace`) skips the interactive prompt, so the commands can be used from CI.

```sh
npm run new -- -w 2024-01-01
npm run dev -- -w 2024-01-01
npm run build -- --workspace 2024-01-01
npm run export -- --workspace 2024-01-01
```

The exit code of the workspace command is passed through as it is.

## Reference

- [slidev](https://ja.sli.dev/)
